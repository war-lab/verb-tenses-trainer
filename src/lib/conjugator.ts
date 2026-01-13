import {
  Tense,
  Aspect,
  FutureMode,
  FutureNuance,
  Person,
  VerbForms,
  Token,
  ConjugationResult,
  SentenceTemplate,
} from "./types";
import { getThirdSingular, getPresentParticiple } from "./morphology";
import { getWarning } from "./rules";

export function conjugate(args: {
  template: SentenceTemplate;
  verb: VerbForms;
  tense: Tense;
  aspect: Aspect;
  futureMode: FutureMode;
  futureNuance?: FutureNuance;
}): ConjugationResult {
  const { subject, tail } = args.template;
  const { verb, tense, aspect, futureMode } = args;

  const tokens: Token[] = [
    { text: subject, kind: "subject" },
    { text: " ", kind: "normal" },
  ];

  let mainVerbToken: Token | null = null;
  const auxTokens: Token[] = [];

  // 1. Determine the path: Future vs Present/Past
  if (tense === "Future") {
    handleFuture(subject, verb, aspect, futureMode, auxTokens, (t) => (mainVerbToken = t));
  } else if (tense === "Present") {
    handlePresent(subject, verb, aspect, auxTokens, (t) => (mainVerbToken = t));
  } else {
    handlePast(subject, verb, aspect, auxTokens, (t) => (mainVerbToken = t));
  }

  // 2. Combine all tokens
  tokens.push(...auxTokens);
  if (mainVerbToken) {
    tokens.push(mainVerbToken);
  }
  tokens.push({ text: " ", kind: "normal" });
  tokens.push({ text: tail, kind: "normal" });
  tokens.push({ text: ".", kind: "punct" });

  const warning = getWarning(verb, aspect, futureMode);

  return {
    tokens,
    warning,
    breakdown: auxTokens.map((t) => t.text.trim()).filter(Boolean),
  };
}

function handlePresent(
  subject: Person,
  verb: VerbForms,
  aspect: Aspect,
  aux: Token[],
  setMain: (t: Token) => void
) {
  const is3rdSingular = ["He", "She", "It"].includes(subject);

  if (!aspect.perfect && !aspect.progressive) {
    // Simple Present
    setMain({
      text: is3rdSingular ? getThirdSingular(verb) : verb.base,
      kind: "verb",
      highlight: true,
    });
    return;
  }

  if (aspect.perfect && !aspect.progressive) {
    // Present Perfect
    aux.push({ text: is3rdSingular ? "has" : "have", kind: "have", highlight: true });
    aux.push({ text: " ", kind: "normal" });
    setMain({ text: verb.pastParticiple, kind: "verb", highlight: true });
    return;
  }

  if (!aspect.perfect && aspect.progressive) {
    // Present Progressive
    aux.push({ text: getBe(subject, "Present"), kind: "be", highlight: true });
    aux.push({ text: " ", kind: "normal" });
    setMain({ text: getPresentParticiple(verb), kind: "verb", highlight: true });
    return;
  }

  if (aspect.perfect && aspect.progressive) {
    // Present Perfect Progressive
    aux.push({ text: is3rdSingular ? "has" : "have", kind: "have", highlight: true });
    aux.push({ text: " ", kind: "normal" });
    aux.push({ text: "been", kind: "be", highlight: true });
    aux.push({ text: " ", kind: "normal" });
    setMain({ text: getPresentParticiple(verb), kind: "verb", highlight: true });
  }
}

function handlePast(
  subject: Person,
  verb: VerbForms,
  aspect: Aspect,
  aux: Token[],
  setMain: (t: Token) => void
) {
  if (!aspect.perfect && !aspect.progressive) {
    // Simple Past
    setMain({ text: verb.past, kind: "verb", highlight: true });
    return;
  }

  if (aspect.perfect && !aspect.progressive) {
    // Past Perfect
    aux.push({ text: "had", kind: "have", highlight: true });
    aux.push({ text: " ", kind: "normal" });
    setMain({ text: verb.pastParticiple, kind: "verb", highlight: true });
    return;
  }

  if (!aspect.perfect && aspect.progressive) {
    // Past Progressive
    aux.push({ text: getBe(subject, "Past"), kind: "be", highlight: true });
    aux.push({ text: " ", kind: "normal" });
    setMain({ text: getPresentParticiple(verb), kind: "verb", highlight: true });
    return;
  }

  if (aspect.perfect && aspect.progressive) {
    // Past Perfect Progressive
    aux.push({ text: "had", kind: "have", highlight: true });
    aux.push({ text: " ", kind: "normal" });
    aux.push({ text: "been", kind: "be", highlight: true });
    aux.push({ text: " ", kind: "normal" });
    setMain({ text: getPresentParticiple(verb), kind: "verb", highlight: true });
  }
}

function handleFuture(
  subject: Person,
  verb: VerbForms,
  aspect: Aspect,
  mode: FutureMode,
  aux: Token[],
  setMain: (t: Token) => void
) {
  // Common Future modes: will, goingTo, progFuture, aboutTo

  if (mode === "will") {
    aux.push({ text: "will", kind: "aux", highlight: true });
    aux.push({ text: " ", kind: "normal" });

    if (aspect.perfect && aspect.progressive) {
      aux.push({ text: "have", kind: "have", highlight: true });
      aux.push({ text: " ", kind: "normal" });
      aux.push({ text: "been", kind: "be", highlight: true });
      aux.push({ text: " ", kind: "normal" });
      setMain({ text: getPresentParticiple(verb), kind: "verb", highlight: true });
    } else if (aspect.perfect) {
      aux.push({ text: "have", kind: "have", highlight: true });
      aux.push({ text: " ", kind: "normal" });
      setMain({ text: verb.pastParticiple, kind: "verb", highlight: true });
    } else if (aspect.progressive) {
      aux.push({ text: "be", kind: "be", highlight: true });
      aux.push({ text: " ", kind: "normal" });
      setMain({ text: getPresentParticiple(verb), kind: "verb", highlight: true });
    } else {
      setMain({ text: verb.base, kind: "verb" }); // Highlight usually not needed for plain base verb after will
    }
    return;
  }

  if (mode === "goingTo") {
    aux.push({ text: getBe(subject, "Present"), kind: "be", highlight: true });
    aux.push({ text: " ", kind: "normal" });
    aux.push({ text: "going", kind: "aux", highlight: true });
    aux.push({ text: " ", kind: "normal" });
    aux.push({ text: "to", kind: "aux", highlight: true });
    aux.push({ text: " ", kind: "normal" });

    // be going to + [Aspect]
    if (aspect.perfect && aspect.progressive) {
      aux.push({ text: "have", kind: "have", highlight: true });
      aux.push({ text: " ", kind: "normal" });
      aux.push({ text: "been", kind: "be", highlight: true });
      aux.push({ text: " ", kind: "normal" });
      setMain({ text: getPresentParticiple(verb), kind: "verb", highlight: true });
    } else if (aspect.perfect) {
      aux.push({ text: "have", kind: "have", highlight: true });
      aux.push({ text: " ", kind: "normal" });
      setMain({ text: verb.pastParticiple, kind: "verb", highlight: true });
    } else if (aspect.progressive) {
      aux.push({ text: "be", kind: "be", highlight: true });
      aux.push({ text: " ", kind: "normal" });
      setMain({ text: getPresentParticiple(verb), kind: "verb", highlight: true });
    } else {
      setMain({ text: verb.base, kind: "verb" });
    }
    return;
  }

  if (mode === "progFuture") {
    // Simply Present Progressive
    handlePresent(subject, verb, { perfect: false, progressive: true }, aux, setMain);
    return;
  }

  if (mode === "aboutTo") {
    aux.push({ text: getBe(subject, "Present"), kind: "be", highlight: true });
    aux.push({ text: " ", kind: "normal" });
    aux.push({ text: "about", kind: "aux", highlight: true });
    aux.push({ text: " ", kind: "normal" });
    aux.push({ text: "to", kind: "aux", highlight: true });
    aux.push({ text: " ", kind: "normal" });
    setMain({ text: verb.base, kind: "verb" });
  }
}

function getBe(person: Person, tense: "Present" | "Past"): string {
  if (tense === "Present") {
    switch (person) {
      case "I": return "am";
      case "He":
      case "She":
      case "It": return "is";
      default: return "are";
    }
  } else {
    switch (person) {
      case "I":
      case "He":
      case "She":
      case "It": return "was";
      default: return "were";
    }
  }
}
