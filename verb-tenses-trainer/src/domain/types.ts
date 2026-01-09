export type Tense = 'Past' | 'Present' | 'Future';

export type Aspect = {
  perfect: boolean;
  progressive: boolean;
};

export type FutureMode = 'will' | 'goingTo' | 'progFuture' | 'aboutTo';

export type VerbForms = {
  base: string;       // go
  past: string;       // went
  pp: string;         // gone
  ing: string;        // going
  third: string;      // goes
  progressiveAllowed?: boolean; // default true
  notes?: string;     // 状態動詞など
};

export type Person = "I" | "You" | "He" | "She" | "We" | "They" | "It";

export type SentenceTemplate = {
  id: string;
  titleJa: string;
  subject: Person;
  verbKey: string; // verbs辞書のキー
  object?: string; // "a car" etc.
  complement?: string; // "happy" etc.
  prepPhrase?: string; // "to the office" etc.
  time?: {
    present?: string; // "every day" 等（習慣）
    past?: string;    // "yesterday" 等
    future?: string;  // "tomorrow" 等
  };
  tags: Array<"state"|"action"|"achievement"|"activity"|"weather">;
  nuance: {
    simplePresent: string;
    simplePast: string;
    simpleFuture: string;
    progressive: string;
    perfect: string;
    perfectProgressive: string;
  };
  restrictions?: {
    progressiveBad?: boolean; // 状態動詞など
    note?: string;
  };
  allowedFutureModes?: FutureMode[];
};

export type TokenKind = 'normal' | 'aux' | 'verb' | 'have' | 'be';

export type Token = {
  text: string;
  kind: TokenKind;
  highlight?: boolean;
};

export type ConjugatedResult = {
  tokens: Token[];
  warning?: {
    code: "PROGRESSIVE_UNNATURAL";
    message: string;
  };
};
