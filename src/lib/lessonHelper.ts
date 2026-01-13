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

  // 1. Tense-level base lookup
  const tenseOverride = template.tenseOverrides?.[tense];
  if (tenseOverride) {
    const { aspectOverrides: _, ...meta } = tenseOverride;
    overrides = { ...overrides, ...meta };
  }

  // 2. Future specifics (Mode / Nuance) - Applied as a refined base for Future
  if (tense === "Future") {
    if (template.modeOverrides?.[futureMode]) {
      overrides = { ...overrides, ...template.modeOverrides[futureMode] };
    }
    if (futureMode === "will" && futureNuance && template.willNuances?.[futureNuance]) {
      overrides = { ...overrides, ...template.willNuances[futureNuance] };
    }
  }

  // 3. Aspect lookup (Nested within Tense OR Global fallback)
  const nestedAspects = tenseOverride?.aspectOverrides;
  const globalAspects = template.aspectOverrides;

  const applyAspect = (aspectData?: Partial<LessonMeta>) => {
    if (aspectData) {
      overrides = { ...overrides, ...aspectData };
    }
  };

  if (aspect.perfect && aspect.progressive) {
    applyAspect(nestedAspects?.perfectProgressive || globalAspects?.perfectProgressive);
  } else {
    if (aspect.perfect) {
      applyAspect(nestedAspects?.perfect || globalAspects?.perfect);
    }
    if (aspect.progressive) {
      applyAspect(nestedAspects?.progressive || globalAspects?.progressive);
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
