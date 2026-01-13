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

  // 1. Base Tense Overrides (e.g., specific notes for "Past" vs default "Present")
  if (template.tenseOverrides?.[tense]) {
    overrides = { ...overrides, ...template.tenseOverrides[tense] };
  }

  // 2. Aspect Overrides (Perfect / Progressive / Both)
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

  // 3. Future specifics (Now allowed for "Past" too for Future-in-the-Past)
  if (tense === "Future" || tense === "Past") {
    // Check mode overrides (goingTo, aboutTo, progFuture)
    if (template.modeOverrides?.[futureMode]) {
      overrides = { ...overrides, ...template.modeOverrides[futureMode] };
    }
    // Check will nuances (only if mode is will)
    if (futureMode === "will" && futureNuance) {
      if (tense === "Past" && template.pastWillNuances?.[futureNuance]) {
        overrides = { ...overrides, ...template.pastWillNuances[futureNuance] };
      } else if (template.willNuances?.[futureNuance]) {
        overrides = { ...overrides, ...template.willNuances[futureNuance] };
      }
    }
  }

  return {
    ...base,
    ...overrides,
    whyJa: overrides.whyJa ? [...base.whyJa, ...overrides.whyJa] : base.whyJa,
  };
}
