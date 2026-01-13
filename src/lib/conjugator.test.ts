import { describe, it, expect } from "vitest";
import { conjugate } from "./conjugator";
import { SentenceTemplate, VerbForms } from "./types";

const mockVerb: VerbForms = {
  id: "go",
  base: "go",
  past: "went",
  pastParticiple: "gone",
  thirdSingular: "goes",
  presentParticiple: "going",
  progressiveAllowed: true,
};

const mockTemplate: SentenceTemplate = {
  id: "test",
  titleJa: "テスト",
  subject: "I",
  verbId: "go",
  tail: "to school",
  lesson: {
    situationJa: "",
    jpLiteral: "",
    jpNatural: "",
    whyJa: [],
  },
};

describe("conjugate", () => {
  it("handles Simple Present (I)", () => {
    const result = conjugate({
      template: mockTemplate,
      verb: mockVerb,
      tense: "Present",
      aspect: { perfect: false, progressive: false },
      futureMode: "will",
    });
    const text = result.tokens.map((t) => t.text).join("");
    expect(text).toBe("I go to school.");
  });

  it("handles Simple Past (I)", () => {
    const result = conjugate({
      template: mockTemplate,
      verb: mockVerb,
      tense: "Past",
      aspect: { perfect: false, progressive: false },
      futureMode: "will",
    });
    const text = result.tokens.map((t) => t.text).join("");
    expect(text).toBe("I went to school.");
  });

  it("handles Present Perfect (He)", () => {
    const result = conjugate({
      template: { ...mockTemplate, subject: "He" },
      verb: mockVerb,
      tense: "Present",
      aspect: { perfect: true, progressive: false },
      futureMode: "will",
    });
    const text = result.tokens.map((t) => t.text).join("");
    expect(text).toBe("He has gone to school.");
  });

  it("handles Present Perfect Progressive (They)", () => {
    const result = conjugate({
      template: { ...mockTemplate, subject: "They" },
      verb: mockVerb,
      tense: "Present",
      aspect: { perfect: true, progressive: true },
      futureMode: "will",
    });
    const text = result.tokens.map((t) => t.text).join("");
    expect(text).toBe("They have been going to school.");
  });

  it("handles Future (will) with nuance", () => {
    const result = conjugate({
      template: mockTemplate,
      verb: mockVerb,
      tense: "Future",
      aspect: { perfect: false, progressive: false },
      futureMode: "will",
      futureNuance: "decision",
    });
    const text = result.tokens.map((t) => t.text).join("");
    expect(text).toBe("I will go to school.");
  });

  it("handles Future Perfect (will have gone)", () => {
    const result = conjugate({
      template: mockTemplate,
      verb: mockVerb,
      tense: "Future",
      aspect: { perfect: true, progressive: false },
      futureMode: "will",
    });
    const text = result.tokens.map((t) => t.text).join("");
    expect(text).toBe("I will have gone to school.");
  });

  it("handles be going to", () => {
    const result = conjugate({
      template: mockTemplate,
      verb: mockVerb,
      tense: "Future",
      aspect: { perfect: false, progressive: false },
      futureMode: "goingTo",
    });
    const text = result.tokens.map((t) => t.text).join("");
    expect(text).toBe("I am going to go to school.");
  });

  it("handles be about to", () => {
    const result = conjugate({
      template: mockTemplate,
      verb: mockVerb,
      tense: "Future",
      aspect: { perfect: false, progressive: false },
      futureMode: "aboutTo",
    });
    const text = result.tokens.map((t) => t.text).join("");
    expect(text).toBe("I am about to go to school.");
  });
});
