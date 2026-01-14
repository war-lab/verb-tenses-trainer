import { Tense, Aspect, FutureMode, FutureNuance } from "../lib/types";

export type Cell = {
  tense: Tense;
  aspect: Aspect; // { perfect, progressive }
  futureMode?: FutureMode; // only when tense=Future
  willNuance?: FutureNuance; // only when futureMode=will
};

export type TrainingQuestion = {
  id: string;              // stable id: `${templateId}::${variantKey}`
  templateId: string;      // SentenceTemplate.id
  variantKey: string;      // e.g. "Present-Simple", "Future-will-prediction", etc.
  prompt: {
    situationJa: string;   // shown
    jpNatural: string;     // shown (primary)
    jpLiteral?: string;    // collapsible
    hintJa?: string;       // optional
  };
  target: Cell;            // best answer
  acceptable?: Array<{
    cell: Cell;
    noteJa: string;        // why acceptable but not best
  }>;
  constraints?: {
    allowedFutureModes?: FutureMode[];
    allowedWillNuances?: FutureNuance[];
  };
};

export type TrainingAnswer = {
  tense: Tense;
  aspect: Aspect;
  futureMode?: FutureMode;
  willNuance?: FutureNuance;
};

export type Grade = "correct" | "acceptable" | "wrong";

export type TrainingResult = {
  grade: Grade;
  target: Cell;
  chosen: Cell;
  acceptableHit?: boolean;
  diffBadges: Array<{ key: string; expected: string; got: string }>;

  // Feedback
  headline: string;
  ruleOfThumbJa: string; // "Just 1 line rule" for next time.

  why: string[];    // bullets from LessonMeta
  pitfall?: string; // from LessonMeta

  // Acceptable logic
  whyAcceptableJa?: string;
  whyNotBestJa?: string;
};

// Scheduler / Persistence
export type QuestionState = {
  id: string;
  streak: number;
  lastResult: Grade | null;
  lastPlayedAt: number; // timestamp
  dueAt: number;        // timestamp
};

export type TrainingProgress = {
  version: number;
  states: Record<string, QuestionState>;
};
