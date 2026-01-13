import { LessonMeta, SentenceTemplate, FutureNuance, FutureMode, Aspect } from "../lib/types";

export function getEffectiveLessonMeta(
  template: SentenceTemplate,
  tense: string,
  aspect: Aspect,
  futureMode: FutureMode,
  futureNuance?: FutureNuance
): LessonMeta {
  const base = template.lesson;
  let overrides: Partial<LessonMeta> = {};

  // 1. Check Aspect overrides (Perfect / Progressive / Both)
  if (aspect.perfect && aspect.progressive && template.aspectOverrides?.perfectProgressive) {
    overrides = { ...overrides, ...template.aspectOverrides.perfectProgressive };
  } else {
    if (aspect.perfect && template.aspectOverrides?.perfect) {
      overrides = { ...overrides, ...template.aspectOverrides.perfect };
    }
    if (aspect.progressive && template.aspectOverrides?.progressive) {
      overrides = { ...overrides, ...template.aspectOverrides.progressive };
    }
  }

  // 2. Tense / Future specifics
  if (tense === "Future") {
    // Check mode overrides (goingTo, aboutTo, progFuture)
    if (template.modeOverrides?.[futureMode]) {
      overrides = { ...overrides, ...template.modeOverrides[futureMode] };
    }
    // Check will nuances (only if mode is will)
    if (futureMode === "will" && futureNuance && template.willNuances?.[futureNuance]) {
      overrides = { ...overrides, ...template.willNuances[futureNuance] };
    }
  }

  return {
    ...base,
    ...overrides,
    whyJa: overrides.whyJa ? [...base.whyJa, ...overrides.whyJa] : base.whyJa,
  };
}
