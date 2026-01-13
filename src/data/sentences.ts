import { SentenceTemplate } from "../lib/types";

export const sentences: SentenceTemplate[] = [
  {
    id: "eat-apple",
    titleJa: "りんごを食べる",
    subject: "I",
    verbId: "eat",
    tail: "an apple",
    allowedFutureModes: ["will", "goingTo"],
    allowedWillNuances: ["decision", "prediction"],
    willNuances: {
      decision: {
        situationJa: "その場でおいしそうなりんごを見つけたとき",
        jpNatural: "りんご、いただきます（これにしよう）",
        usageLabel: "Future:Will:Decision",
        whyJa: ["willはその場で決めた意志を表します"],
      },
      prediction: {
        situationJa: "いつも決まった時間にりんごを食べる習慣を予測するとき",
        jpNatural: "（たぶん）りんごを食べるでしょうね",
        usageLabel: "Future:Will:Prediction",
        whyJa: ["客観的な予測や推測としてwillを使います"],
      }
    },
    lesson: {
      situationJa: "食事の習慣や、目の前にあるりんごについて話すとき",
      jpLiteral: "私はりんごを食べる",
      jpNatural: "りんごを食べます",
      usageLabel: "Present:Habit",
      whyJa: ["習慣なら現在形", "今食べているなら進行形"],
      pitfallJa: "現在進行形と現在形は混同しやすいので注意",
      contrast: {
        titleJa: "現在形 vs 進行形",
        tokens: [
          { text: "I", kind: "subject" },
          { text: " ", kind: "normal" },
          { text: "am", kind: "be" },
          { text: " ", kind: "normal" },
          { text: "eating", kind: "verb", highlight: true },
          { text: " ", kind: "normal" },
          { text: "an", kind: "normal" },
          { text: " ", kind: "normal" },
          { text: "apple", kind: "normal" },
        ],
        noteJa: "今の動作なら進行形、普段の習慣なら現在形です。",
      },
    },
  },
  {
    id: "rain-today",
    titleJa: "雨が降る",
    subject: "It",
    verbId: "rain",
    tail: "today",
    allowedFutureModes: ["will", "goingTo"],
    allowedWillNuances: ["prediction"],
    willNuances: {
      prediction: {
        situationJa: "空の様子を見て予測するとき",
        jpNatural: "今日は雨が降りそうです",
        usageLabel: "Future:Will:Prediction",
      }
    },
    modeOverrides: {
      goingTo: {
        situationJa: "すでに黒い雲が出てきていて、確実性を感じるとき",
        jpNatural: "雨が降りそうです（予兆がある）",
        whyJa: ["be going to は目に見える根拠がある時に使います"],
      }
    },
    lesson: {
      situationJa: "天候について話すとき",
      jpLiteral: "それは今日雨が降る",
      jpNatural: "今日は雨が降ります",
      usageLabel: "Present:Fact",
      whyJa: ["天候の主語はIt"],
      pitfallJa: "Japanese uses 'Ame ga furu', but English uses 'It rains'.",
    },
  },
  {
    id: "go-school",
    titleJa: "学校に行く",
    subject: "They",
    verbId: "go",
    tail: "to school",
    allowedFutureModes: ["will", "goingTo", "progFuture"],
    allowedWillNuances: ["promise", "prediction"],
    willNuances: {
      promise: {
        situationJa: "「明日からちゃんと学校行くよ」と約束するとき",
        jpNatural: "彼らは（きっと）登校しますよ",
        usageLabel: "Future:Will:Promise",
        whyJa: ["willは強い意志や約束も表せます"],
      },
      prediction: {
        situationJa: "彼らの習慣から登校を予測するとき",
        jpNatural: "彼らは学校に行くでしょう",
        usageLabel: "Future:Will:Prediction",
      }
    },
    modeOverrides: {
      progFuture: {
        situationJa: "すでに予定として決まっているとき",
        jpNatural: "彼らは（予定では）学校に行くことになっています",
        whyJa: ["現在進行形は確定した未来の予定を表します"],
      }
    },
    lesson: {
      situationJa: "通学の習慣や明日の予定について",
      jpLiteral: "彼らは学校に行く",
      jpNatural: "彼らは学校に行きます",
      usageLabel: "Present:Habit",
      whyJa: ["不規則動詞goの変化に注意"],
      contrast: {
        titleJa: "確定した未来",
        tokens: [
          { text: "They", kind: "subject" },
          { text: " ", kind: "normal" },
          { text: "are", kind: "be" },
          { text: " ", kind: "normal" },
          { text: "going", kind: "verb", highlight: true },
          { text: " ", kind: "normal" },
          { text: "to", kind: "normal" },
          { text: " ", kind: "normal" },
          { text: "school", kind: "normal" },
          { text: " ", kind: "normal" },
          { text: "tomorrow", kind: "normal" },
        ],
        noteJa: "確定した予定なら現在進行形で未来を表せます",
      },
    },
  },
  {
    id: "take-photo",
    titleJa: "写真を撮る",
    subject: "I",
    verbId: "take",
    tail: "a photo",
    allowedFutureModes: ["will", "goingTo", "aboutTo"],
    allowedWillNuances: ["offer", "decision"],
    willNuances: {
      offer: {
        situationJa: "「私が撮ってあげましょうか？」と申し出るとき",
        jpNatural: "私が写真をお撮りしますよ",
        usageLabel: "Future:Will:Offer",
        whyJa: ["その場での親切な申し出にはwillが最適です"],
      },
      decision: {
        situationJa: "「よし、写真を撮ろう」とその場で決めたとき",
        jpNatural: "写真を撮ることにします",
        usageLabel: "Future:Will:Decision",
      }
    },
    modeOverrides: {
      aboutTo: {
        situationJa: "まさにシャッターを切ろうとしている瞬間",
        jpNatural: "今まさに写真を撮るところです",
        whyJa: ["be about to は直後の未来（秒読み）を表します"],
      }
    },
    lesson: {
      situationJa: "その場の意思や直前の行動",
      jpLiteral: "私は写真を撮る",
      jpNatural: "写真を撮ります",
      usageLabel: "Present:Fact",
      whyJa: ["直前なら be about to"],
    },
  },
];
