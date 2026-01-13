import { LessonMeta, SentenceTemplate, FutureNuance, FutureMode, Aspect, Tense } from "../lib/types";

export function getEffectiveLessonMeta(
  template: SentenceTemplate,
  tense: Tense,
  aspect: Aspect,
  futureMode: FutureMode,
  futureNuance?: FutureNuance
): LessonMeta {
  const base = template.lesson;
  let overrides: Partial<LessonMeta> = {};

  // 1. Tense-level lookup
  const tenseOverride = template.tenseOverrides?.[tense];
  if (tenseOverride) {
    const { aspectOverrides: _, ...meta } = tenseOverride;
    overrides = { ...overrides, ...meta };

    // 2. Nested Aspect lookup within Tense
    if (aspect.perfect && aspect.progressive && tenseOverride.aspectOverrides?.perfectProgressive) {
      overrides = { ...overrides, ...tenseOverride.aspectOverrides.perfectProgressive };
    } else {
      if (aspect.perfect && tenseOverride.aspectOverrides?.perfect) {
        overrides = { ...overrides, ...tenseOverride.aspectOverrides.perfect };
      }
      if (aspect.progressive && tenseOverride.aspectOverrides?.progressive) {
        overrides = { ...overrides, ...tenseOverride.aspectOverrides.progressive };
      }
    }
  }

  // 3. Fallback to Global Aspect or Future Mode if no specialized tense-aspect override was found for those props
  // (We use a simple merge here, but priority is given to the sequence)
  if (!overrides.situationJa || !overrides.jpNatural) {
    if (aspect.perfect && aspect.progressive && template.aspectOverrides?.perfectProgressive) {
      overrides = { ...template.aspectOverrides.perfectProgressive, ...overrides };
    } else {
      if (aspect.perfect && template.aspectOverrides?.perfect) {
        overrides = { ...template.aspectOverrides.perfect, ...overrides };
      }
      if (aspect.progressive && template.aspectOverrides?.progressive) {
        overrides = { ...template.aspectOverrides.progressive, ...overrides };
      }
    }
  }

  // 4. Future specifics
  if (tense === "Future") {
    // Check mode overrides (goingTo, aboutTo, progFuture)
    if (template.modeOverrides?.[futureMode]) {
      overrides = { ...overrides, ...template.modeOverrides[futureMode] };
    }
    // Check will nuances
    if (futureMode === "will" && futureNuance && template.willNuances?.[futureNuance]) {
      overrides = { ...overrides, ...template.willNuances[futureNuance] };
    }
  }

  // FINAL MERGE: REPLACE behavior for pedagogical notes (avoid accidental "Habit" notes in Past)
  return {
    ...base,
    ...overrides,
    // If overrides provide whyJa, we REPLACE the base whyJa to ensure focus
    whyJa: overrides.whyJa ? overrides.whyJa : base.whyJa,
  };
}
