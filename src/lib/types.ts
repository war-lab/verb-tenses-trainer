export type Tense = "Past" | "Present" | "Future";

export type Aspect = {
  perfect: boolean;
  progressive: boolean;
};

export type FutureMode = "will" | "goingTo" | "progFuture" | "aboutTo";

export type FutureNuance =
  | "decision"
  | "offer"
  | "promise"
  | "prediction";

export type PastUse = "timePast" | "politeDistance";

export type Person = "I" | "You" | "We" | "They" | "He" | "She" | "It";

export type VerbForms = {
  id: string;
  base: string;
  past: string;
  pastParticiple: string;
  thirdSingular?: string;
  presentParticiple?: string;
  progressiveAllowed?: boolean; // false for state verbs
};

export type TokenKind =
  | "normal"
  | "subject"
  | "aux"
  | "have"
  | "be"
  | "verb"
  | "neg"
  | "punct";

export type Token = {
  text: string;
  kind: TokenKind;
  highlight?: boolean;
};

export type WarningCode =
  | "PROGRESSIVE_UNNATURAL"
  | "MODE_NOT_SUITABLE"
  | "ASPECT_RARE"
  | "MODE_ASPECT_INCOMPATIBLE"
  | "MODE_ASPECT_NOT_RECOMMENDED";

export type Warning = {
  code: WarningCode;
  messageJa: string;
};

export type ConjugationResult = {
  tokens: Token[];
  warning?: Warning;
  breakdown?: string[];
};

export type MiniContrast = {
  titleJa: string;
  tokens: Token[];
  noteJa: string;
};

export type UsageLabel =
  | "Perfect:Result"
  | "Perfect:Experience"
  | "Perfect:Continuation"
  | "Progressive:InProgress"
  | "Progressive:Temporary"
  | "Future:Will:Decision"
  | "Future:Will:Offer"
  | "Future:Will:Promise"
  | "Future:Will:Prediction"
  | "Polite:Distance"
  | "Present:Habit"
  | "Present:Fact"
  | "Past:Fact"
  | "Past:TimePoint";

export type LessonMeta = {
  situationJa: string;
  jpLiteral: string;
  jpNatural: string;
  usageLabel?: UsageLabel;
  whyJa: string[];
  pitfallJa?: string;
  contrast?: MiniContrast;
};

export type SentenceTemplate = {
  id: string;
  titleJa: string;
  subject: Person;
  verbId: string;
  tail: string;
  allowedFutureModes?: FutureMode[];
  allowedWillNuances?: FutureNuance[];
  willNuances?: Partial<Record<FutureNuance, Partial<LessonMeta>>>;
  pastWillNuances?: Partial<Record<FutureNuance, Partial<LessonMeta>>>;
  modeOverrides?: Partial<Record<FutureMode, Partial<LessonMeta>>>; // Diff-based overrides
  aspectOverrides?: Partial<{
    perfect: Partial<LessonMeta>;
    progressive: Partial<LessonMeta>;
    perfectProgressive: Partial<LessonMeta>;
  }>;
  tenseOverrides?: Partial<Record<Tense, Partial<LessonMeta>>>;
  restrictions?: {
    progressiveBad?: boolean;
    noteJa?: string;
  };
  lesson: LessonMeta;
};
