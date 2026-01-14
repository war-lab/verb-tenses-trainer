import { TrainingQuestion, TrainingAnswer, TrainingResult, Grade, Cell } from "./types";
import { sentences } from "../data/sentences";
import { getEffectiveLessonMeta } from "../lib/lessonHelper";


export function gradeAnswer(
  question: TrainingQuestion,
  answer: TrainingAnswer
): TrainingResult {
  const template = sentences.find((s) => s.id === question.templateId);
  if (!template) throw new Error(`Template not found: ${question.templateId}`);

  // 1. Determine Grade
  let grade: Grade = "wrong";
  let acceptableHitItem: { cell: Cell; noteJa: string } | undefined;

  const isTarget = isSameCell(question.target, answer);
  if (isTarget) {
    grade = "correct";
  } else if (question.acceptable) {
    acceptableHitItem = question.acceptable.find((item) =>
      isSameCell(item.cell, answer)
    );
    if (acceptableHitItem) {
      grade = "acceptable";
    }
  }

  // 2. Calculate Diffs
  const diffBadges = calculateDiffs(question.target, answer);

  // 3. Fetch Metadata for Feedback
  const targetMeta = getEffectiveLessonMeta(
    template,
    question.target.tense,
    question.target.aspect,
    question.target.futureMode!,
    question.target.willNuance
  );

  const chosenMeta = getEffectiveLessonMeta(
    template,
    answer.tense,
    answer.aspect,
    answer.futureMode!,
    answer.willNuance
  );

  // 4. Construct Feedback Strings
  let headline = "";
  if (grade === "correct") {
    headline = "正解！その通りです。";
  } else if (grade === "acceptable") {
    headline = "惜しい！それでも通じますが…";
  } else {
    headline = "残念、違います。";
  }

  // Rule of Thumb: meta.ruleOfThumbJa > First line of whyJa > UsageLabel
  const ruleOfThumbJa = targetMeta.ruleOfThumbJa || targetMeta.whyJa?.[0] || targetMeta.usageLabel || "定義を確認しましょう";

  return {
    grade,
    target: question.target,
    chosen: { ...answer }, // copy
    acceptableHit: !!acceptableHitItem,
    diffBadges,
    headline,
    ruleOfThumbJa,
    why: targetMeta.whyJa,
    pitfall: targetMeta.pitfallJa,
    whyAcceptableJa: acceptableHitItem?.noteJa,
    whyNotBestJa: grade === "acceptable"
      ? (chosenMeta.usageLabel ? `(あなたの選択: ${chosenMeta.usageLabel}) ` : "") + "より自然なニュアンスや、状況に適した選択があります。"
      : undefined,
  };
}

function isSameCell(a: Cell, b: TrainingAnswer): boolean {
  if (a.tense !== b.tense) return false;

  if (a.aspect.perfect !== b.aspect.perfect) return false;
  if (a.aspect.progressive !== b.aspect.progressive) return false;

  if (a.tense === "Future") {
    if (a.futureMode !== b.futureMode) return false;
    if (a.futureMode === "will") {
      if (a.willNuance !== b.willNuance) return false;
    }
  }

  return true;
}

function calculateDiffs(
  expected: Cell,
  got: TrainingAnswer
): Array<{ key: string; expected: string; got: string }> {
  const diffs: Array<{ key: string; expected: string; got: string }> = [];

  if (expected.tense !== got.tense) {
    diffs.push({ key: "Tense", expected: expected.tense, got: got.tense });
  }

  const expAsp = formatAspect(expected.aspect);
  const gotAsp = formatAspect(got.aspect);
  if (expAsp !== gotAsp) {
    diffs.push({ key: "Aspect", expected: expAsp, got: gotAsp });
  }

  if (expected.tense === "Future" && got.tense === "Future") {
    if (expected.futureMode !== got.futureMode) {
      diffs.push({
        key: "Mode",
        expected: expected.futureMode || "-",
        got: got.futureMode || "-",
      });
    }

    if (expected.futureMode === "will" && got.futureMode === "will") {
      if (expected.willNuance !== got.willNuance) {
        diffs.push({
          key: "Nuance",
          expected: expected.willNuance || "-",
          got: got.willNuance || "-",
        });
      }
    }
  }

  return diffs;
}

function formatAspect(a: { perfect: boolean; progressive: boolean }): string {
  if (a.perfect && a.progressive) return "Perf+Prog";
  if (a.perfect) return "Perfect";
  if (a.progressive) return "Progressive";
  return "Simple";
}
