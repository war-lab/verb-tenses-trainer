import { Token } from "../lib/types";

export type PolitePastPhrase = {
  id: string;
  titleJa: string;
  tokens: Token[];
  situationJa: string;
};

export const politePastPhrases: PolitePastPhrase[] = [
  {
    id: "wanted-to-ask",
    titleJa: "ちょっとお聞きしたかったのですが",
    tokens: [
      { text: "I", kind: "subject" },
      { text: " ", kind: "normal" },
      { text: "wanted", kind: "verb", highlight: true },
      { text: " ", kind: "normal" },
      { text: "to", kind: "normal" },
      { text: " ", kind: "normal" },
      { text: "ask", kind: "verb" },
      { text: " ", kind: "normal" },
      { text: "you", kind: "normal" },
      { text: " ", kind: "normal" },
      { text: "something", kind: "normal" },
      { text: ".", kind: "punct" },
    ],
    situationJa: "今の意向をあえて過去形で言うことで、控えめで丁寧な印象を与えます（距離感の過去）。",
  },
  {
    id: "was-hoping",
    titleJa: "〜だといいなと思っていたのですが",
    tokens: [
      { text: "I", kind: "subject" },
      { text: " ", kind: "normal" },
      { text: "was", kind: "be", highlight: true },
      { text: " ", kind: "normal" },
      { text: "hoping", kind: "verb", highlight: true },
      { text: " ", kind: "normal" },
      { text: "you", kind: "normal" },
      { text: " ", kind: "normal" },
      { text: "could", kind: "aux" },
      { text: " ", kind: "normal" },
      { text: "help", kind: "verb" },
      { text: " ", kind: "normal" },
      { text: "me", kind: "normal" },
      { text: ".", kind: "punct" },
    ],
    situationJa: "過去進行形を使うことで、より婉曲的で丁寧な響きになります。",
  },
  {
    id: "wondered-if",
    titleJa: "〜かなと思いまして",
    tokens: [
      { text: "I", kind: "subject" },
      { text: " ", kind: "normal" },
      { text: "wondered", kind: "verb", highlight: true },
      { text: " ", kind: "normal" },
      { text: "if", kind: "normal" },
      { text: " ", kind: "normal" },
      { text: "you", kind: "normal" },
      { text: " ", kind: "normal" },
      { text: "had", kind: "have" },
      { text: " ", kind: "normal" },
      { text: "some", kind: "normal" },
      { text: " ", kind: "normal" },
      { text: "time", kind: "normal" },
      { text: ".", kind: "punct" },
    ],
    situationJa: "相手の都合を伺う際の定番表現です。",
  },
  {
    id: "was-wondering",
    titleJa: "〜かなあと思っていまして（現在）",
    tokens: [
      { text: "I", kind: "subject" },
      { text: " ", kind: "normal" },
      { text: "was", kind: "be", highlight: true },
      { text: " ", kind: "normal" },
      { text: "wondering", kind: "verb", highlight: true },
      { text: " ", kind: "normal" },
      { text: "if", kind: "normal" },
      { text: " ", kind: "normal" },
      { text: "you", kind: "normal" },
      { text: " ", kind: "normal" },
      { text: "were", kind: "be" },
      { text: " ", kind: "normal" },
      { text: "free", kind: "normal" },
      { text: ".", kind: "punct" },
    ],
    situationJa: "過去進行形は、現在の打診において最も丁寧な部類の表現になります。",
  },
];
