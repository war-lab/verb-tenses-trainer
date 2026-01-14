import { sentences } from "../data/sentences";
import { getEffectiveLessonMeta } from "../lib/lessonHelper";
import { SentenceTemplate, Tense, Aspect, FutureMode, FutureNuance } from "../lib/types";
import { Cell, TrainingQuestion } from "./types";

export function generateQuestions(): TrainingQuestion[] {
  const questions: TrainingQuestion[] = [];

  for (const template of sentences) {
    // 1. Present & Past (Simple, Perfect, Progressive, PerfProg)
    (["Present", "Past"] as Tense[]).forEach((tense) => {
      generateAspectVariants(template, tense, undefined, undefined, questions);
    });

    // 2. Future (Modes & Nuances)
    if (template.allowedFutureModes) {
      template.allowedFutureModes.forEach((mode) => {
        if (mode === "will" && template.allowedWillNuances) {
          template.allowedWillNuances.forEach((nuance) => {
            generateAspectVariants(template, "Future", mode, nuance, questions);
          });
        } else {
          generateAspectVariants(template, "Future", mode, undefined, questions);
        }
      });
    }
  }

  return questions;
}

function generateAspectVariants(
  template: SentenceTemplate,
  tense: Tense,
  futureMode: FutureMode | undefined,
  willNuance: FutureNuance | undefined,
  out: TrainingQuestion[]
) {
  // We only check 4 combos: Simple, Progressive, Perfect, PerfectProgressive
  const combinations: Aspect[] = [
    { perfect: false, progressive: false }, // Simple
    { perfect: false, progressive: true },  // Progressive
    { perfect: true, progressive: false },  // Perfect
    { perfect: true, progressive: true },   // PerfectProgressive
  ];

  for (const aspect of combinations) {
    const meta = getEffectiveLessonMeta(template, tense, aspect, futureMode!, willNuance);

    // QUALITY GATE: STRICT
    // Must have specific pedagogical content to be a "Training Question"
    if (
      !meta.situationJa ||
      !meta.jpNatural ||
      !meta.usageLabel ||
      !meta.whyJa ||
      meta.whyJa.length === 0
    ) {
      continue;
    }

    // Construct ID
    const variantKey = buildVariantKey(tense, aspect, futureMode, willNuance);
    const id = `${template.id}::${variantKey}`;

    const cell: Cell = { tense, aspect, futureMode, willNuance };

    // Generate Acceptable Answers
    const acceptable = generateAcceptable(template, cell);

    out.push({
      id,
      templateId: template.id,
      variantKey,
      prompt: {
        situationJa: meta.situationJa,
        jpNatural: meta.jpNatural,
        jpLiteral: meta.jpLiteral, // Collapsible
      },
      target: cell,
      acceptable,
      constraints: {
        allowedFutureModes: template.allowedFutureModes,
        allowedWillNuances: template.allowedWillNuances,
      },
    });
  } // End for loop
} // End function generateAspectVariants

function generateAcceptable(
  template: SentenceTemplate,
  target: Cell
): Array<{ cell: Cell; noteJa: string }> | undefined {
  const acc: Array<{ cell: Cell; noteJa: string }> = [];

  // Logic 1: Future "goingTo" target -> often "will prediction" is acceptable
  if (target.tense === "Future" && target.futureMode === "goingTo") {
    // If "will" is allowed and "prediction" is allowed
    const willAllowed = template.allowedFutureModes?.includes("will");
    const predAllowed = template.allowedWillNuances?.includes("prediction");

    if (willAllowed && predAllowed) {
      acc.push({
        cell: {
          tense: "Future",
          aspect: target.aspect,
          futureMode: "will",
          willNuance: "prediction",
        },
        noteJa: "予測という意味では通じますが、be going to のような「根拠・確実性」のニュアンスが弱くなります。"
      });
    }
  }

  // Logic 2: Future "progFuture" (Arrangement) -> "goingTo" (Plan) is often acceptable
  if (target.tense === "Future" && target.futureMode === "progFuture") {
    const goingToAllowed = template.allowedFutureModes?.includes("goingTo");
    if (goingToAllowed) {
      acc.push({
        cell: {
          tense: "Future",
          aspect: { perfect: false, progressive: false }, // goingTo is usually Simple aspect compatible
          futureMode: "goingTo",
        },
        noteJa: "「予定」としては同じですが、現在進行形の方が「手配済み・確定度が高い」ニュアンスを持ちます。"
      });
    }
  }

  // Logic 3: Future "will decision" (Instant) vs "goingTo" (Intention)
  // Usually distinct, but sometimes context allows override.
  // Ideally, if usageLabel is Decision, goingTo is WRONG (premeditated).
  // So we don't add acceptable here automatically.

  return acc.length > 0 ? acc : undefined;
}

function buildVariantKey(
  tense: Tense,
  aspect: Aspect,
  futureMode?: FutureMode,
  willNuance?: FutureNuance
): string {
  const parts: string[] = [tense];

  if (tense === "Future" && futureMode) {
    parts.push(futureMode);
    if (futureMode === "will" && willNuance) {
      parts.push(nuanceShort(willNuance));
    }
  }

  if (aspect.perfect) parts.push("Perf");
  if (aspect.progressive) parts.push("Prog");
  if (!aspect.perfect && !aspect.progressive) parts.push("Simple");

  return parts.join("-");
}

function nuanceShort(n: FutureNuance): string {
  switch (n) {
    case "decision": return "Dec";
    case "offer": return "Off";
    case "promise": return "Prom";
    case "prediction": return "Pred";
  }
}
