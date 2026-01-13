import { LessonMeta, SentenceTemplate, FutureNuance, FutureMode } from "../lib/types";

export function getEffectiveLessonMeta(
  template: SentenceTemplate,
  tense: string,
  futureMode: FutureMode,
  futureNuance?: FutureNuance
): LessonMeta {
  const base = template.lesson;
  let overrides: Partial<LessonMeta> = {};

  if (tense === "Future") {
    // 1. Check mode overrides (goingTo, aboutTo, progFuture)
    if (template.modeOverrides?.[futureMode]) {
      overrides = { ...overrides, ...template.modeOverrides[futureMode] };
    }
    // 2. Check will nuances (only if mode is will)
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
