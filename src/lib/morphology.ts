import { VerbForms } from "./types";

/**
 * Basic English morphology rules for verb transformations.
 * Note: For irregular stems, we rely on the dictionary data.
 */

export function getThirdSingular(verb: VerbForms): string {
  if (verb.thirdSingular) return verb.thirdSingular;

  const { base } = verb;
  if (base.endsWith("ss") || base.endsWith("sh") || base.endsWith("ch") || base.endsWith("x") || base.endsWith("o")) {
    return base + "es";
  }
  if (base.endsWith("y") && !isVowel(base[base.length - 2])) {
    return base.slice(0, -1) + "ies";
  }
  return base + "s";
}

export function getPresentParticiple(verb: VerbForms): string {
  if (verb.presentParticiple) return verb.presentParticiple;

  const { base } = verb;
  // Basic rules:
  // 1. -e -> -ing (make -> making)
  if (base.endsWith("e") && !base.endsWith("ee") && base !== "be") {
    return base.slice(0, -1) + "ing";
  }
  // 2. -ie -> -ying (die -> dying)
  if (base.endsWith("ie")) {
    return base.slice(0, -2) + "ying";
  }
  // 3. CVC -> double (run -> running) - simplified
  if (isShortCvc(base)) {
    return base + base[base.length - 1] + "ing";
  }

  return base + "ing";
}

function isVowel(c: string): boolean {
  return ["a", "e", "i", "o", "u"].includes(c.toLowerCase());
}

function isShortCvc(word: string): boolean {
  const vowels = "aeiou";
  if (word.length < 3) return false;
  const last = word[word.length - 1];
  const mid = word[word.length - 2];
  const first = word[word.length - 3];

  // Simplified CVC check
  return !vowels.includes(last) &&
    vowels.includes(mid) &&
    !vowels.includes(first) &&
    !["w", "x", "y"].includes(last);
}
