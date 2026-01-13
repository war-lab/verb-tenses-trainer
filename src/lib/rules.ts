import { VerbForms, FutureMode, Aspect, WarningCode } from "./types";

export function getWarning(
  verb: VerbForms,
  aspect: Aspect,
  futureMode: FutureMode
): { code: WarningCode; messageJa: string } | undefined {
  // 1. State verbs in progressive
  if (aspect.progressive && verb.progressiveAllowed === false) {
    return {
      code: "PROGRESSIVE_UNNATURAL",
      messageJa: `${verb.base}は状態を表す動詞なので、進行形にするのは不自然です。`,
    };
  }

  // 2. FutureMode: progFuture restrictions
  if (futureMode === "progFuture") {
    if (aspect.perfect) {
      return {
        code: "MODE_ASPECT_INCOMPATIBLE",
        messageJa: "「予定」を表す現在進行形では、通常は完了形(Perfect)を組み合わせません。",
      };
    }
  }

  // 3. FutureMode: aboutTo restrictions
  if (futureMode === "aboutTo") {
    if (aspect.perfect || aspect.progressive) {
      return {
        code: "MODE_ASPECT_NOT_RECOMMENDED",
        messageJa: "be about to は通常、単純な形(Simple)で「直後の未来」を表すのに使われます。",
      };
    }
  }

  return undefined;
}
