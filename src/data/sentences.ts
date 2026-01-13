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
    aspectOverrides: {
      progressive: {
        situationJa: "今、まさにりんごを食べている最中のとき",
        jpNatural: "りんごを食べています",
        usageLabel: "Progressive:InProgress",
        whyJa: ["be動詞 + ing で『今〜している』という進行を表します"],
      },
      perfect: {
        situationJa: "「さっき食べちゃった」という結果や「食べたことがある」という経験を言うとき",
        jpNatural: "りんごを食べてしまいました（もうないです）",
        usageLabel: "Perfect:Result",
        whyJa: ["have + 過去分詞で『すでに〜した』という完了・結果を表します"],
      },
      perfectProgressive: {
        situationJa: "（さっきからずっと）りんごを食べ続けている状態を強調するとき",
        jpNatural: "ずっとりんごを食べ続けています",
        usageLabel: "Perfect:Continuation",
        whyJa: ["have been + ing で『（過去から今まで）ずっと〜し続けている』という継続を表します"],
      }
    },
    tenseOverrides: {
      Past: {
        situationJa: "過去の特定の時点で、りんごを食べたという事実を言うとき",
        jpNatural: "りんごを食べました",
        usageLabel: "Past:Fact",
        whyJa: ["過去の出来事は過去形を使います"],
        aspectOverrides: {
          progressive: {
            situationJa: "過去のその瞬間、まさにりんごを食べている最中だったとき",
            jpNatural: "（その時）りんごを食べていました",
            usageLabel: "Progressive:InProgress",
            whyJa: ["was/were + ing で過去の進行を表します"],
          },
          perfect: {
            situationJa: "別の過去の出来事よりも前に「すでに食べ終えていた」とき",
            jpNatural: "（その時には）りんごを食べてしまっていました",
            usageLabel: "Perfect:Result",
            whyJa: ["had + 過去分詞で過去のある時点までの完了を表します（過去完了）"],
          },
          perfectProgressive: {
            situationJa: "過去のある時点まで、ずっとりんごを食べ続けていた状態を強調するとき",
            jpNatural: "（その時まで）ずっとりんごを食べ続けていました",
            usageLabel: "Perfect:Continuation",
            whyJa: ["had been + ing で過去のある時点までの継続を表します"],
          }
        }
      },
      Future: {
        situationJa: "将来、りんごを食べるという予定や意志を述べるとき",
        jpNatural: "りんごを食べるつもりです / 食べるでしょう",
        usageLabel: "Future:Will:Prediction",
        whyJa: ["will や be going to を使って未来を表します"],
        aspectOverrides: {
          progressive: {
            situationJa: "未来のある時点で、ちょうどりんごを食べている最中であろうと予測するとき",
            jpNatural: "（その時）りんごを食べているところでしょう",
            usageLabel: "Future:Progressive",
            whyJa: ["will be eating で未来の特定の瞬間に進行中の動作を表します"],
          },
          perfect: {
            situationJa: "未来のある時点までに、すでにりんごを食べ終えているだろうと述べるとき",
            jpNatural: "（その時までには）りんごを食べてしまっているでしょう",
            usageLabel: "Future:Perfect",
            whyJa: ["will have eaten で未来のある時点までの完了を表します"],
          },
          perfectProgressive: {
            situationJa: "未来のある時点まで、ずっとりんごを食べ続けている状況が続いているだろうと言いたいとき",
            jpNatural: "（その時まで）ずっとりんごを食べ続けていることになります",
            usageLabel: "Future:PerfectProgressive",
            whyJa: ["will have been eating で未来のある時点までの継続を強調します"],
          }
        }
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
    aspectOverrides: {
      progressive: {
        situationJa: "まさに今、雨が降っている最中のとき",
        jpNatural: "（今）雨が降っています",
        usageLabel: "Progressive:InProgress",
        whyJa: ["It is raining. で今の天候を表します"],
      },
      perfect: {
        situationJa: "「雨が降った（ばかり）」という最近の出来事や、「（今まで）ずっと降っていた」という状態を指すとき",
        jpNatural: "（さっきまで）雨が降っていました / 雨が降ったことがあります",
        usageLabel: "Perfect:Result",
        whyJa: ["It has rained. は完了や継続を表します"],
      },
      perfectProgressive: {
        situationJa: "「さっきからずっと（休みなく）降り続けている」ことを強調するとき",
        jpNatural: "ずっと雨が降り続けています",
        usageLabel: "Perfect:Continuation",
        whyJa: ["It has been raining. で、動作の継続を強調します"],
      }
    },
    tenseOverrides: {
      Past: {
        situationJa: "過去のある日に雨が降ったという事実を言うとき",
        jpNatural: "（その日は）雨が降りました",
        usageLabel: "Past:Fact",
        aspectOverrides: {
          progressive: {
            situationJa: "昨日などの過去のある瞬間、ちょうど外で雨が降っていたとき",
            jpNatural: "（その時）雨が降っていました",
            usageLabel: "Progressive:InProgress",
            whyJa: ["was/were raining で過去の特定の瞬間に雨が降っていたことを表します"],
          },
          perfect: {
            situationJa: "過去のある時点までに、すでに雨が降り終えていたとき",
            jpNatural: "（その時には）もう雨は降り止んでいました",
            usageLabel: "Perfect:Result",
            whyJa: ["had rained で過去のある時点までの完了を表します"],
          },
          perfectProgressive: {
            situationJa: "過去のある時点まで、それまでずっと雨が降り続けていたとき",
            jpNatural: "（その時まで）ずっと雨が降り続けていました",
            usageLabel: "Perfect:Continuation",
            whyJa: ["It had been raining. で過去までの継続を強調します"],
          }
        }
      },
      Future: {
        situationJa: "明日などの将来、雨が降るだろうと予測するとき",
        jpNatural: "雨が降るでしょう / 降りそうです",
        usageLabel: "Future:Will:Prediction",
        whyJa: ["予測の will や be going to を使います"],
        aspectOverrides: {
          progressive: {
            situationJa: "将来のある時点で、ちょうど雨が降っている最中だろうと予測するとき",
            jpNatural: "（その時間は）雨が降っているでしょう",
            usageLabel: "Future:Progressive",
            whyJa: ["will be raining で未来の進行中を予測します"],
          },
          perfect: {
            situationJa: "将来のある時点までに、雨が降り止んでいるだろうと予測するとき",
            jpNatural: "（その時までには）雨は降り止んでいるでしょう",
            usageLabel: "Future:Perfect",
            whyJa: ["will have rained で未来の完了を表します"],
          },
          perfectProgressive: {
            situationJa: "将来のある時点まで、それまでずっと雨が降り続けているだろうと予測するとき",
            jpNatural: "（その時まで）ずっと雨が降り続けていることでしょう",
            usageLabel: "Future:PerfectProgressive",
            whyJa: ["will have been raining で未来のある時点までの継続を強調します"],
          }
        }
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
    aspectOverrides: {
      progressive: {
        situationJa: "今、学校に向かっている最中（通学中）のとき",
        jpNatural: "彼らは（今）学校に向かっています",
        usageLabel: "Progressive:InProgress",
        whyJa: ["今現在、移動中であることを表します"],
      },
      perfect: {
        situationJa: "「もう学校に行ってしまったよ（ここにはいないよ）」という結果を言うとき",
        jpNatural: "彼らは（もう）学校に行ってしまいました",
        usageLabel: "Perfect:Result",
        whyJa: ["have gone to は『〜へ行ってしまった（結果、今はここにいない）』を表します"],
      },
      perfectProgressive: {
        situationJa: "休みなく学校に通い続けている状態や、その日の朝からずっと移動し続けているとき",
        jpNatural: "（ずっと）学校に行き続けています",
        usageLabel: "Perfect:Continuation",
        whyJa: ["（朝から）ずっと学校に向かっている状態、などを表します"],
      }
    },
    tenseOverrides: {
      Past: {
        situationJa: "過去のある時、学校へ行ったという記録や事実",
        jpNatural: "学校へ行きました",
        usageLabel: "Past:Fact",
        aspectOverrides: {
          progressive: {
            situationJa: "過去のその瞬間、ちょうど学校に向かって歩いている最中だったとき",
            jpNatural: "（その時）学校へ行っているところでした",
            usageLabel: "Progressive:InProgress",
            whyJa: ["was/were going で過去の進行を表します"],
          },
          perfect: {
            situationJa: "過去のある時点までに、すでに学校に到着していたとき",
            jpNatural: "（その時には）もう学校に着いていました",
            usageLabel: "Perfect:Result",
            whyJa: ["had gone to で過去のある時点までの完了（不在）を表します"],
          },
          perfectProgressive: {
            situationJa: "過去のある時点まで、それまでずっと学校に通い続けていた状況",
            jpNatural: "（その時まで）ずっと学校に通っていました",
            usageLabel: "Perfect:Continuation",
            whyJa: ["had been going で過去までの動作の継続を表します"],
          }
        }
      },
      Future: {
        situationJa: "将来、学校へ行く予定や意志があるとき",
        jpNatural: "学校へ行きます / 行くつもりです",
        usageLabel: "Future:Will:Decision",
        whyJa: ["will や be going to を使って未来を表します"],
        aspectOverrides: {
          progressive: {
            situationJa: "将来のある時間に、ちょうど通学している最中であろうと言うとき",
            jpNatural: "（その時間は）学校へ向かっているでしょう",
            usageLabel: "Future:Progressive",
            whyJa: ["will be going で未来の進行中の動作を表します"],
          },
          perfect: {
            situationJa: "将来のある時点までに、学校へ到着しているはずだと言うとき",
            jpNatural: "（その時までには）学校に着いているでしょう",
            usageLabel: "Future:Perfect",
            whyJa: ["will have gone で未来の完了を表します"],
          },
          perfectProgressive: {
            situationJa: "将来の卒業式などの時点で、何年間も通い続けてきたことになる、と言いたいとき",
            jpNatural: "（その時で）ずっとこの学校に通い続けていることになります",
            usageLabel: "Future:PerfectProgressive",
            whyJa: ["will have been going で未来までの継続を表します"],
          }
        }
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
    aspectOverrides: {
      progressive: {
        situationJa: "まさに今、シャッターを切ろうとしているところ、あるいは撮影中のとき",
        jpNatural: "（今）写真を撮っています",
        usageLabel: "Progressive:InProgress",
        whyJa: ["動作の最中を表します"],
      },
      perfect: {
        situationJa: "「もう撮ったよ」という完了や、「撮ったことがある」という経験を言うとき",
        jpNatural: "写真を撮り終えました / 撮ったことがあります",
        usageLabel: "Perfect:Result",
        whyJa: ["完了や経験を表します"],
      }
    },
    tenseOverrides: {
      Past: {
        situationJa: "過去に写真を撮ったという行為の事実を述べるとき",
        jpNatural: "写真を撮りました",
        usageLabel: "Past:Fact",
        whyJa: ["過去の事実は過去形を使用します"],
        aspectOverrides: {
          progressive: {
            situationJa: "過去のその瞬間、まさに写真を撮ろうとしていた瞬間",
            jpNatural: "（その時）写真を撮っていました",
            usageLabel: "Progressive:InProgress",
            whyJa: ["過去のその時点での動作中を表します"],
          },
          perfect: {
            situationJa: "過去の別の出来事の前に、写真を撮り終えていたとき",
            jpNatural: "（その時までに）写真を撮り終えていました",
            usageLabel: "Perfect:Result",
            whyJa: ["had taken で過去の完了を表します"],
          }
        }
      },
      Future: {
        situationJa: "将来、写真を撮る意思や予定を言うとき",
        jpNatural: "写真を撮ります / 撮るつもりです",
        usageLabel: "Future:Will:Decision",
        aspectOverrides: {
          progressive: {
            situationJa: "将来のある瞬間に、ちょうどシャッターを切っているところであろうと言うとき",
            jpNatural: "（その時）写真を撮っているところでしょう",
            usageLabel: "Future:Progressive",
            whyJa: ["will be taking で未来の進行を表します"],
          },
          perfect: {
            situationJa: "将来のあるイベントの時までに、すでに撮影を済ませているはずだと言うとき",
            jpNatural: "（その時までには）写真を撮り終えているでしょう",
            usageLabel: "Future:Perfect",
            whyJa: ["will have taken で未来の完了を表します"],
          }
        }
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
  {
    id: "read-book",
    titleJa: "本を読む",
    subject: "She",
    verbId: "read",
    tail: "a book in the park",
    allowedFutureModes: ["will", "goingTo"],
    allowedWillNuances: ["prediction"],
    willNuances: {
      prediction: {
        situationJa: "彼女が公園にいるのを見て、「きっと本を読んでいるだろうな」と推測するとき",
        jpNatural: "彼女は公園で本を読んでいるでしょう",
        usageLabel: "Future:Will:Prediction",
      },
    },
    aspectOverrides: {
      progressive: {
        situationJa: "今、まさに公園で本を広げて読んでいる最中のとき",
        jpNatural: "彼女は本を読んでいます",
        usageLabel: "Progressive:InProgress",
        whyJa: ["be動詞 + ing で『今〜している』を表します"],
      },
      perfect: {
        situationJa: "「さっき読み終わった（読破した）」という完了や、「読んだことがある」という経験を言うとき",
        jpNatural: "彼女はその本を読み終えました / 読んだことがあります",
        usageLabel: "Perfect:Result",
        whyJa: ["have + read で完了や経験を表します。read の発音（レッド）に注意。"],
      },
      perfectProgressive: {
        situationJa: "数時間前からずっと、今もなお本を読み続けているとき",
        jpNatural: "彼女はずっと本を読み続けています",
        usageLabel: "Perfect:Continuation",
        whyJa: ["have been reading で、それまでずっと読み続けている状態を表します"],
      }
    },
    tenseOverrides: {
      Past: {
        situationJa: "過去のある時、本を読んだという事実を述べるとき",
        jpNatural: "彼女は本を読みました",
        usageLabel: "Past:Fact",
        whyJa: ["過去の事実は過去形を使います。read（過去形）の発音はレッドです。"],
        aspectOverrides: {
          progressive: {
            situationJa: "過去のその時、まさに本を読んでいる最中だったとき",
            jpNatural: "（その時）彼女は本を読んでいました",
            usageLabel: "Progressive:InProgress",
            whyJa: ["was/were reading で過去の進行を表します"],
          },
          perfect: {
            situationJa: "過去のある時点までに、すでにその本を読み終えていたとき",
            jpNatural: "（その時までに）彼女は本を読み終えていました",
            usageLabel: "Perfect:Result",
            whyJa: ["had read で過去のある時点までの完了を表します"],
          },
          perfectProgressive: {
            situationJa: "過去のある時点まで、それまで長い間ずっと本を読み続けていたとき",
            jpNatural: "（その時まで）彼女はずっと本を読み続けていました",
            usageLabel: "Perfect:Continuation",
            whyJa: ["had been reading で過去までの動作の継続を強調します"],
          }
        }
      },
      Future: {
        situationJa: "将来、本を読む予定や予測を言うとき",
        jpNatural: "彼女は本を読むでしょう",
        usageLabel: "Future:Will:Prediction",
        aspectOverrides: {
          progressive: {
            situationJa: "将来のある時間に、彼女が読書に耽っているであろうと予測するとき",
            jpNatural: "（その時間は）彼女は本を読んでいる最中でしょう",
            usageLabel: "Future:Progressive",
            whyJa: ["will be reading で未来の進行中の動作を予測します"],
          },
          perfect: {
            situationJa: "将来の期限（週末など）までに、彼女が本を読み終えているだろうと言うとき",
            jpNatural: "（週末までには）彼女は本を読み終えているでしょう",
            usageLabel: "Future:Perfect",
            whyJa: ["will have read で未来のある時点までの完了を表します"],
          },
          perfectProgressive: {
            situationJa: "将来の特定の時点（再会した時など）に、彼女がずっと読書を続けてきたことになる、と言いたいとき",
            jpNatural: "（その時で）彼女は数時間ずっと読み続けていることになります",
            usageLabel: "Future:PerfectProgressive",
            whyJa: ["will have been reading で未来までの継続を表します"],
          }
        }
      }
    },
    lesson: {
      situationJa: "日常の習慣や、現在進行中の動作について",
      jpLiteral: "彼女は公園で本を読む",
      jpNatural: "彼女は公園で本を読みます",
      usageLabel: "Present:Habit",
      whyJa: ["三人称単数現在(3sg)のsに注意"],
      contrast: {
        titleJa: "現在形 vs 進行形",
        tokens: [
          { text: "She", kind: "subject" },
          { text: " ", kind: "normal" },
          { text: "is", kind: "be" },
          { text: " ", kind: "normal" },
          { text: "reading", kind: "verb", highlight: true },
          { text: " ", kind: "normal" },
          { text: "a", kind: "normal" },
          { text: " ", kind: "normal" },
          { text: "book", kind: "normal" },
        ],
        noteJa: "習慣としての読書は現在形、今読んでいるなら進行形です。",
      },
    },
  },
  {
    id: "cook-dinner",
    titleJa: "夕食を作る",
    subject: "She",
    verbId: "cook",
    tail: "dinner for us",
    allowedFutureModes: ["will", "goingTo", "progFuture"],
    allowedWillNuances: ["prediction", "promise"],
    willNuances: {
      promise: {
        situationJa: "彼女が「今日は豪華な夕食を作るわね」と約束したとき",
        jpNatural: "彼女が夕食を作ってくれます（約束）",
        usageLabel: "Future:Will:Promise",
      },
    },
    aspectOverrides: {
      progressive: {
        situationJa: "今、まさにキッチンで料理をしている最中のとき",
        jpNatural: "彼女は夕食を作っています",
        usageLabel: "Progressive:InProgress",
        whyJa: ["be動詞 + ing で『今〜している』を表します"],
      },
      perfect: {
        situationJa: "「もう作り終えたよ」という完了や、「何度も作ったことがある」という経験を言うとき",
        jpNatural: "彼女は夕食を作り終えました / 作ったことがあります",
        usageLabel: "Perfect:Result",
        whyJa: ["have + cooked で完了や結果を表します"],
      },
      perfectProgressive: {
        situationJa: "夕方からずっとキッチンに立ち、今もまだ作り続けているとき",
        jpNatural: "彼女は（ずっと）夕食を作り続けています",
        usageLabel: "Perfect:Continuation",
        whyJa: ["have been cooking で動作の継続を強調します"],
      }
    },
    tenseOverrides: {
      Past: {
        situationJa: "過去に夕食を作ったという事実を言うとき",
        jpNatural: "彼女は夕食を作りました",
        usageLabel: "Past:Fact",
        whyJa: ["過去の行為は過去形です"],
        aspectOverrides: {
          progressive: {
            situationJa: "過去のその瞬間、まさに料理をしていた最中だったとき",
            jpNatural: "（その時）彼女は夕食を作っていました",
            usageLabel: "Progressive:InProgress",
            whyJa: ["was/were cooking で過去の動作中を表します"],
          },
          perfect: {
            situationJa: "誰かが訪ねてきた過去の時点までに、すでに料理が完成していたとき",
            jpNatural: "（その時には）彼女は夕食を作り終えていました",
            usageLabel: "Perfect:Result",
            whyJa: ["had cooked で過去の完了を表します"],
          },
          perfectProgressive: {
            situationJa: "過去のある時点まで、それまでずっと料理をし続けていた状況",
            jpNatural: "（その時まで）彼女は夕食を作り続けていました",
            usageLabel: "Perfect:Continuation",
            whyJa: ["had been cooking で過去までの継続を表します"],
          }
        }
      },
      Future: {
        situationJa: "将来、夕食を作るという意志や予定を言うとき",
        jpNatural: "夕飯を作るつもりです",
        usageLabel: "Future:Will:Decision",
        aspectOverrides: {
          progressive: {
            situationJa: "将来のある時間に、ちょうどキッチンで料理しているだろうと言うとき",
            jpNatural: "（その時間は）夕飯を作っている最中でしょう",
            usageLabel: "Future:Progressive",
            whyJa: ["will be cooking で未来の特定の瞬間に進行中の動作を表します"],
          },
          perfect: {
            situationJa: "家族が帰ってくる未来の時点までに、料理を完成させているだろうと言うとき",
            jpNatural: "（みんなが帰るまでには）夕飯を作り終えているでしょう",
            usageLabel: "Future:Perfect",
            whyJa: ["will have cooked で未来のある時点までの完了を表します"],
          },
          perfectProgressive: {
            situationJa: "将来のある時点まで、それまでずっと料理をし続けているだろうと言うとき",
            jpNatural: "（その時まで）ずっと夕飯を作り続けていることでしょう",
            usageLabel: "Future:PerfectProgressive",
            whyJa: ["will have been cooking で未来のある時点までの継続を強調します"],
          }
        }
      }
    },
    lesson: {
      situationJa: "彼女の毎日の仕事や将来の予定",
      jpLiteral: "彼女は私たちのために夕食を作る",
      jpNatural: "彼女は私たちのために夕食を作ります",
      usageLabel: "Present:Habit",
      whyJa: ["三人称単数扱い(3sg)のsに注意"],
    },
  },
  {
    id: "run-fast",
    titleJa: "速く走る",
    subject: "He",
    verbId: "run",
    tail: "very fast",
    allowedFutureModes: ["will", "goingTo"],
    allowedWillNuances: ["prediction"],
    aspectOverrides: {
      progressive: {
        situationJa: "今、猛スピードで走っている最中のとき",
        jpNatural: "彼はとても速く走っています",
        usageLabel: "Progressive:InProgress",
        whyJa: ["今現在の動作を表します"],
      },
      perfect: {
        situationJa: "「さっきまで走っていた」という継続や、「あんなに速く走ったことがある」という経験を言うとき",
        jpNatural: "彼は（今まで）とても速く走っていました / 走ったことがあります",
        usageLabel: "Perfect:Continuation",
        whyJa: ["動作の継続や経験を表します"],
      },
      perfectProgressive: {
        situationJa: "一時間前からずっと、休みなく走り続けていることを強調するとき",
        jpNatural: "彼は（ずっと）とても速く走り続けています",
        usageLabel: "Perfect:Continuation",
        whyJa: ["have been running で継続を強調します"],
      }
    },
    tenseOverrides: {
      Past: {
        situationJa: "過去のある時、彼がとても速く走ったことを述べるとき",
        jpNatural: "彼はとても速く走りました",
        usageLabel: "Past:Fact",
        whyJa: ["run の過去形 ran に注意"],
        aspectOverrides: {
          progressive: {
            situationJa: "過去のその瞬間、まさに走っている最中だったとき",
            jpNatural: "（その時）彼はとても速く走っていました",
            usageLabel: "Progressive:InProgress",
            whyJa: ["was/were running で過去の動作中を表します"],
          },
          perfect: {
            situationJa: "別の過去の出来事の前に、すでに走り終えていたとき",
            jpNatural: "（その時までに）彼はとても速く走り終えていました",
            usageLabel: "Perfect:Result",
            whyJa: ["had run で過去までの完了を表します"],
          },
          perfectProgressive: {
            situationJa: "過去のある時点まで、ずっと走り続けていた状況を強調するとき",
            jpNatural: "（その時まで）彼はとても速く走り続けていました",
            usageLabel: "Perfect:Continuation",
            whyJa: ["had been running で過去までの継続を強調します"],
          }
        }
      },
      Future: {
        situationJa: "将来、速く走るだろうという予測や意志があるとき",
        jpNatural: "彼は速く走るでしょう",
        usageLabel: "Future:Will:Prediction",
        aspectOverrides: {
          progressive: {
            situationJa: "将来のレース中に、ちょうど全速力で走っているだろうと予測するとき",
            jpNatural: "（その時）彼は速く走っている最中でしょう",
            usageLabel: "Future:Progressive",
            whyJa: ["will be running で未来の進行中を予測します"],
          },
          perfect: {
            situationJa: "将来のある目標時刻までに、すでに走り終えているだろうと言うとき",
            jpNatural: "（その時間までには）彼は走り終えているでしょう",
            usageLabel: "Future:Perfect",
            whyJa: ["will have run で未来の完了を表します"],
          }
        }
      }
    },
    lesson: {
      situationJa: "彼の能力や習慣",
      jpLiteral: "彼はとても早く走る",
      jpNatural: "彼はとても速く走ります",
      usageLabel: "Present:Fact",
      whyJa: ["能力や習慣は現在形", "3sgのsに注意"],
    },
  },
  {
    id: "study-english",
    titleJa: "英語を勉強する",
    subject: "We",
    verbId: "study",
    tail: "English every day",
    allowedFutureModes: ["will", "goingTo"],
    allowedWillNuances: ["decision", "promise"],
    willNuances: {
      decision: {
        situationJa: "「よし、今日から毎日やろう」と決めた瞬間",
        jpNatural: "これから毎日英語を勉強します",
        usageLabel: "Future:Will:Decision",
      },
    },
    aspectOverrides: {
      progressive: {
        situationJa: "今この瞬間、まさに机に向かって勉強しているとき",
        jpNatural: "私たちは英語を勉強しています",
        usageLabel: "Progressive:InProgress",
        whyJa: ["be動詞 + ing で今現在の動作を表します"],
      },
      perfect: {
        situationJa: "「もう今日の分は終わったよ」という完了や、「ずっと勉強してきた」という継続を言うとき",
        jpNatural: "私たちは英語を勉強し終えました / （ずっと）勉強してきました",
        usageLabel: "Perfect:Continuation",
        whyJa: ["have studied で完了や継続を表します"],
      },
      perfectProgressive: {
        situationJa: "数時間前からずっと、休みなく英語を勉強し続けているとき",
        jpNatural: "私たちは（ずっと）英語を勉強し続けています",
        usageLabel: "Perfect:Continuation",
        whyJa: ["have been studying で動作の継続を強調します"],
      }
    },
    tenseOverrides: {
      Past: {
        situationJa: "過去に英語を勉強したという事実を述べるとき",
        jpNatural: "私たちは英語を勉強しました",
        usageLabel: "Past:Fact",
        whyJa: ["過去の行為は過去形を使います"],
        aspectOverrides: {
          progressive: {
            situationJa: "過去のその瞬間、まさに英語を勉強している最中だったとき",
            jpNatural: "（その時）私たちは英語を勉強していました",
            usageLabel: "Progressive:InProgress",
            whyJa: ["was/were studying で過去の動作中を表します"],
          },
          perfect: {
            situationJa: "過去のある時点までに、すでに勉強を終えていたとき",
            jpNatural: "（その時までに）私たちは英語の勉強を終えていました",
            usageLabel: "Perfect:Result",
            whyJa: ["had studied で過去までの完了を表します"],
          },
          perfectProgressive: {
            situationJa: "過去のある時点まで、それまでずっと英語を勉強し続けていたとき",
            jpNatural: "（その時まで）私たちは英語を勉強し続けていました",
            usageLabel: "Perfect:Continuation",
            whyJa: ["had been studying で過去までの継続を強調します"],
          }
        }
      },
      Future: {
        situationJa: "将来、英語を勉強する予定や決意を言うとき",
        jpNatural: "英語を勉強するつもりです",
        usageLabel: "Future:Will:Decision",
        aspectOverrides: {
          progressive: {
            situationJa: "将来のある時間に、ちょうど英語の授業中などで勉強しているだろうと言うとき",
            jpNatural: "（その時間は）英語を勉強している最中でしょう",
            usageLabel: "Future:Progressive",
            whyJa: ["will be studying で未来の進行中の動作を表します"],
          },
          perfect: {
            situationJa: "来年の今頃までに、すでに勉強を一通り終えているだろうと言うとき",
            jpNatural: "（来年までには）一通り勉強し終えているでしょう",
            usageLabel: "Future:Perfect",
            whyJa: ["will have studied で未来の完了を表します"],
          },
          perfectProgressive: {
            situationJa: "将来のある時点（卒業など）で、合計何年間も勉強してきたことになる、と言いたいとき",
            jpNatural: "（来年で）10年間ずっと英語を勉強し続けていることになります",
            usageLabel: "Future:PerfectProgressive",
            whyJa: ["will have been studying で未来までの継続を表します"],
          }
        }
      }
    },
    lesson: {
      situationJa: "私たちの学習習慣",
      jpLiteral: "私たちは毎日英語を勉強する",
      jpNatural: "私たちは毎日英語を勉強します",
      usageLabel: "Present:Habit",
      whyJa: ["習慣を表すevery dayがある場合は現在形"],
    },
  },
  {
    id: "play-tennis",
    titleJa: "テニスをする",
    subject: "You",
    verbId: "play",
    tail: "tennis on Sundays",
    allowedFutureModes: ["will", "goingTo", "progFuture"],
    modeOverrides: {
      progFuture: {
        situationJa: "今度の日曜日にテニスをする約束が既にあるとき",
        jpNatural: "（今度の日曜は）テニスをすることになっています",
      },
    },
    aspectOverrides: {
      progressive: {
        situationJa: "今、まさにコートでラリーをしている真っ最中のとき",
        jpNatural: "あなたはテニスをしています",
        usageLabel: "Progressive:InProgress",
        whyJa: ["今現在の動作（テニス中）を表します"],
      },
      perfect: {
        situationJa: "「さっきまでやっていた」という継続や、「テニスをしたことがある」という経験を言うとき",
        jpNatural: "あなたは（さっきまで）テニスをしていました / したことがあります",
        usageLabel: "Perfect:Experience",
        whyJa: ["have played で経験や完了を表わします"],
      },
      perfectProgressive: {
        situationJa: "午前中からずっと、休みなくテニスをし続けているとき",
        jpNatural: "あなたは（ずっと）テニスをし続けています",
        usageLabel: "Perfect:Continuation",
        whyJa: ["have been playing で動作の継続を強調します"],
      }
    },
    tenseOverrides: {
      Past: {
        situationJa: "過去の特定の日にテニスをしたことを述べるとき",
        jpNatural: "あなたはテニスをしました",
        usageLabel: "Past:Fact",
        whyJa: ["過去の出来事は過去形です"],
        aspectOverrides: {
          progressive: {
            situationJa: "過去のその瞬間、まさにテニスをしていた最中だったとき",
            jpNatural: "（その時）あなたはテニスをしていました",
            usageLabel: "Progressive:InProgress",
            whyJa: ["was/were playing で過去の動作中を表します"],
          },
          perfect: {
            situationJa: "過去のある時点までに、すでにテニスをひと段落終えていたとき",
            jpNatural: "（その時までに）あなたはテニスを終えていました",
            usageLabel: "Perfect:Result",
            whyJa: ["had played で過去までの完了を表します"],
          },
          perfectProgressive: {
            situationJa: "過去のある時点まで、それまでずっとテニスをし続けていたとき",
            jpNatural: "（その時まで）あなたはずっとテニスをし続けていました",
            usageLabel: "Perfect:Continuation",
            whyJa: ["had been playing で過去までの継続を強調します"],
          }
        }
      },
      Future: {
        situationJa: "将来、テニスをする予定や意志を述べるとき",
        jpNatural: "あなたはテニスをするつもりですね",
        usageLabel: "Future:Will:Prediction",
        aspectOverrides: {
          progressive: {
            situationJa: "将来のある時間に、ちょうどテニスコートでプレーしている最中だろうと言うとき",
            jpNatural: "（その時間は）あなたはテニスをしている最中でしょう",
            usageLabel: "Future:Progressive",
            whyJa: ["will be playing で未来の進行中の動作を表します"],
          },
          perfect: {
            situationJa: "将来の日没などの時点までに、すでにテニスをひと通り終えているだろうと言うとき",
            jpNatural: "（日没までには）テニスを終えているでしょう",
            usageLabel: "Future:Perfect",
            whyJa: ["will have played で未来のある時点までの完了を表します"],
          },
          perfectProgressive: {
            situationJa: "将来の特定の時点（休憩の合図など）で、合計何時間もテニスをし続けてきたことになる、と言いたいとき",
            jpNatural: "（その時で）あなたは3時間ずっとテニスをし続けていることになります",
            usageLabel: "Future:PerfectProgressive",
            whyJa: ["will have been playing で未来までの継続を強調します"],
          }
        }
      }
    },
    lesson: {
      situationJa: "日曜日ごとの習慣",
      jpLiteral: "あなたは日曜日にテニスをする",
      jpNatural: "あなたは日曜日にテニスをします",
      usageLabel: "Present:Habit",
      whyJa: ["習慣的な動作は現在形"],
    },
  },
  {
    id: "wash-car",
    titleJa: "車を洗う",
    subject: "He",
    verbId: "wash",
    tail: "his car",
    allowedFutureModes: ["will", "goingTo", "progFuture"],
    willNuances: {
      offer: {
        situationJa: "「パパ、僕が洗ってあげるよ（お手伝い）」という申し出への返答など",
        jpNatural: "彼が車を洗います（意志）",
        usageLabel: "Future:Will:Offer",
      },
    },
    aspectOverrides: {
      progressive: {
        situationJa: "今、まさに庭や洗車場で車を洗っている最中のとき",
        jpNatural: "彼は（今）車を洗っています",
        usageLabel: "Progressive:InProgress",
        whyJa: ["be動詞 + washing で今の動作を表します"],
      },
      perfect: {
        situationJa: "「もう車を洗い終えたよ」という完了を言うとき",
        jpNatural: "彼は車を洗い終えました",
        usageLabel: "Perfect:Result",
        whyJa: ["have washed で完了や結果を表します"],
      },
      perfectProgressive: {
        situationJa: "一時間前からずっと、今もなお車を洗い続けているとき",
        jpNatural: "彼は（ずっと）車を洗い続けています",
        usageLabel: "Perfect:Continuation",
        whyJa: ["have been washing で動作の継続を強調します"],
      }
    },
    tenseOverrides: {
      Past: {
        situationJa: "過去の特定の日に車を洗ったことを述べるとき",
        jpNatural: "彼は車を洗いました",
        usageLabel: "Past:Fact",
        whyJa: ["過去の行為は過去形です"],
        aspectOverrides: {
          progressive: {
            situationJa: "過去のその瞬間、まさに車を洗っていた最中だったとき",
            jpNatural: "（その時）彼は車を洗っていました",
            usageLabel: "Progressive:InProgress",
            whyJa: ["was/were washing で過去の動作中を表します"],
          },
          perfect: {
            situationJa: "誰かが訪ねてきた過去 of の時点までに、すでに洗車が完了していたとき",
            jpNatural: "（その時には）彼は車を洗い終えていました",
            usageLabel: "Perfect:Result",
            whyJa: ["had washed で過去までの完了を表します"],
          },
          perfectProgressive: {
            situationJa: "過去のある時点まで、それまでずっと車を洗い続けていたとき",
            jpNatural: "（その時まで）彼は車を洗い続けていました",
            usageLabel: "Perfect:Continuation",
            whyJa: ["had been washing で過去までの継続を強調します"],
          }
        }
      },
      Future: {
        situationJa: "将来、車を洗う予定や意志があるとき",
        jpNatural: "彼は車を洗うつもりです",
        usageLabel: "Future:Will:Decision",
        aspectOverrides: {
          progressive: {
            situationJa: "将来のある時間に、ちょうど洗車している最中だろうと言うとき",
            jpNatural: "（その時間は）彼は車を洗っているところでしょう",
            usageLabel: "Future:Progressive",
            whyJa: ["will be washing で未来の進行中の動作を表します"],
          },
          perfect: {
            situationJa: "外出する未来の時点までに、車をピカピカに洗い終えているだろうと言うとき",
            jpNatural: "（出かけるまでには）彼は車を洗い終えているでしょう",
            usageLabel: "Future:Perfect",
            whyJa: ["will have washed で未来の完了を表します"],
          }
        }
      }
    },
    lesson: {
      situationJa: "彼の週末の習慣など",
      jpLiteral: "彼は車を洗う",
      jpNatural: "彼は車を洗います",
      usageLabel: "Present:Habit",
      whyJa: ["washの3単現はwashes"],
    },
  },
  {
    id: "watch-tv",
    titleJa: "テレビを見る",
    subject: "They",
    verbId: "watch",
    tail: "television after dinner",
    allowedFutureModes: ["will", "goingTo"],
    aspectOverrides: {
      progressive: {
        situationJa: "今、まさにリビングでテレビを見ている最中のとき",
        jpNatural: "彼らはテレビを見ています",
        usageLabel: "Progressive:InProgress",
        whyJa: ["今現在の動作を表します"],
      },
      perfect: {
        situationJa: "「さっきまで見ていた」という継続や、「あの番組を見たことがある」という経験を言うとき",
        jpNatural: "彼らは（さっきまで）テレビを見ていました / 見たことがあります",
        usageLabel: "Perfect:Experience",
        whyJa: ["have watched で経験や完了を表します"],
      },
      perfectProgressive: {
        situationJa: "夕食後からずっと、今もなおテレビを見続けているとき",
        jpNatural: "彼らは（ずっと）テレビを見続けています",
        usageLabel: "Perfect:Continuation",
        whyJa: ["have been watching で動作の継続を強調します"],
      }
    },
    tenseOverrides: {
      Past: {
        situationJa: "昨日などの特定の過去の時点でテレビを見たことを述べるとき",
        jpNatural: "彼らはテレビを見ました",
        usageLabel: "Past:Fact",
        whyJa: ["過去の行為は過去形です"],
        aspectOverrides: {
          progressive: {
            situationJa: "過去のその瞬間、まさにテレビを見ていた最中だったとき",
            jpNatural: "（その時）彼らはテレビを見ていました",
            usageLabel: "Progressive:InProgress",
            whyJa: ["was/were watching で過去の動作中を表します"],
          },
          perfect: {
            situationJa: "電気が消えた過去の時点までに、すでにテレビを見終えていたとき",
            jpNatural: "（その時までに）彼らはテレビを見終えていました",
            usageLabel: "Perfect:Result",
            whyJa: ["had watched で過去までの完了を表します"],
          },
          perfectProgressive: {
            situationJa: "過去のある時点まで、それまでずっとテレビを見続けていた状況",
            jpNatural: "（その時まで）彼らはテレビを見続けていました",
            usageLabel: "Perfect:Continuation",
            whyJa: ["had been watching で過去までの継続を強調します"],
          }
        }
      },
      Future: {
        situationJa: "将来、テレビを見る予定や予測を言うとき",
        jpNatural: "彼らはテレビを見るつもりです",
        usageLabel: "Future:Will:Prediction",
        aspectOverrides: {
          progressive: {
            situationJa: "将来のある時間に、ちょうどテレビの前に座って見ている最中だろうと言うとき",
            jpNatural: "（その時間は）彼らはテレビを見ている最中でしょう",
            usageLabel: "Future:Progressive",
            whyJa: ["will be watching で未来の進行を表します"],
          },
          perfect: {
            situationJa: "将来の就寝時間までに、ニュース番組を見終えているだろうと言うとき",
            jpNatural: "（寝る前までには）彼らはテレビを見終えているでしょう",
            usageLabel: "Future:Perfect",
            whyJa: ["will have watched で未来の完了を表します"],
          },
          perfectProgressive: {
            situationJa: "将来のある時点（親が部屋に来る時など）で、合計何時間もテレビを見続けたことになるだろうと言うとき",
            jpNatural: "（その時で）彼らは3時間ずっとテレビを見続けていることになります",
            usageLabel: "Future:PerfectProgressive",
            whyJa: ["will have been watching で未来までの継続を表します"],
          }
        }
      }
    },
    lesson: {
      situationJa: "彼らの典型的な習慣",
      jpLiteral: "彼らは夕食後にテレビを見る",
      jpNatural: "彼らは夕食後にテレビを見ます",
      usageLabel: "Present:Habit",
      whyJa: ["複数形なのでsは不要"],
    },
  },
  {
    id: "write-letter",
    titleJa: "手紙を書く",
    subject: "I",
    verbId: "write",
    tail: "a letter to my friend",
    allowedFutureModes: ["will", "goingTo", "aboutTo"],
    aspectOverrides: {
      progressive: {
        situationJa: "今、まさにペンを握って手紙を書いている最中のとき",
        jpNatural: "私は手紙を書いています",
        usageLabel: "Progressive:InProgress",
        whyJa: ["今現在の動作（執筆中）を表します"],
      },
      perfect: {
        situationJa: "「さっき書き上げた」という完了や、「ずっと書いてきた」という継続を言うとき",
        jpNatural: "私は手紙を書き終えました / （ずっと）手紙を書いてきました",
        usageLabel: "Perfect:Continuation",
        whyJa: ["write の過去分詞 written に注意"],
      },
      perfectProgressive: {
        situationJa: "さっきから何通もずっと手紙を書き続けているとき",
        jpNatural: "ずっと手紙を書き続けています",
        usageLabel: "Perfect:Continuation",
        whyJa: ["have been writing で動作の継続を強調します"],
      }
    },
    tenseOverrides: {
      Past: {
        situationJa: "過去に手紙を書いたという事実を述べるとき",
        jpNatural: "手紙を書きました",
        usageLabel: "Past:Fact",
        whyJa: ["write の過去形 wrote に注意"],
        aspectOverrides: {
          progressive: {
            situationJa: "過去のその瞬間、まさに手紙を書いていた最中だったとき",
            jpNatural: "（その時）手紙を書いていました",
            usageLabel: "Progressive:InProgress",
            whyJa: ["was/were writing で過去の動作中を表します"],
          },
          perfect: {
            situationJa: "誰かが来た過去の時点までに、すでに書き終えていたとき",
            jpNatural: "（その時には）手紙を書き終えていました",
            usageLabel: "Perfect:Result",
            whyJa: ["had written で過去までの完了を表します"],
          },
          perfectProgressive: {
            situationJa: "過去のある時点まで、ずっと手紙を書き続けていた状況",
            jpNatural: "（その時まで）ずっと手紙を書き続けていました",
            usageLabel: "Perfect:Continuation",
            whyJa: ["had been writing で過去までの継続を強調します"],
          }
        }
      },
      Future: {
        situationJa: "将来、手紙を書く予定や意志を述べるとき",
        jpNatural: "手紙を書くつもりです",
        usageLabel: "Future:Will:Decision",
        aspectOverrides: {
          progressive: {
            situationJa: "将来のある時間に、ちょうどデスクで筆を走らせているところだろうと言うとき",
            jpNatural: "（その時間は）手紙を書いているところでしょう",
            usageLabel: "Future:Progressive",
            whyJa: ["will be writing で未来の進行を表します"],
          },
          perfect: {
            situationJa: "集荷時間などの未来の時点までに、書き終えているだろうと言うとき",
            jpNatural: "（集荷までには）手紙を書き終えているでしょう",
            usageLabel: "Future:Perfect",
            whyJa: ["will have written で未来の完了を表します"],
          },
          perfectProgressive: {
            situationJa: "将来の特定の時点で、合計何時間も書き続けていることになる、と言いたいとき",
            jpNatural: "（その時で）2時間ずっと手紙を書き続けていることになります",
            usageLabel: "Future:PerfectProgressive",
            whyJa: ["will have been writing で未来までの継続を表します"],
          }
        }
      }
    },
    lesson: {
      situationJa: "動作の事実や意思",
      jpLiteral: "私は友人へ手紙を書く",
      jpNatural: "友だちに手紙を書きます",
      usageLabel: "Present:Fact",
      whyJa: ["動作の事実は現在形"],
    },
  },
  {
    id: "sing-song",
    titleJa: "歌を歌う",
    subject: "She",
    verbId: "sing",
    tail: "a beautiful song",
    allowedFutureModes: ["will", "goingTo"],
    aspectOverrides: {
      progressive: {
        situationJa: "今、まさにステージや何かの場所で歌っている最中のとき",
        jpNatural: "彼女は歌を歌っています",
        usageLabel: "Progressive:InProgress",
        whyJa: ["今現在の動作を表します"],
      },
      perfect: {
        situationJa: "「さっき歌い終えた」という完了や、「その歌を歌ったことがある」という経験を言うとき",
        jpNatural: "彼女は歌い終えました / 歌ったことがあります",
        usageLabel: "Perfect:Experience",
        whyJa: ["sing の過去分詞 sung に注意"],
      },
      perfectProgressive: {
        situationJa: "さっきからずっと、何曲も休みなく歌い続けているとき",
        jpNatural: "彼女はずっと歌い続けています",
        usageLabel: "Perfect:Continuation",
        whyJa: ["have been singing で動作の継続を強調します"],
      }
    },
    tenseOverrides: {
      Past: {
        situationJa: "過去のある時、彼女が歌を歌った事実を述べるとき",
        jpNatural: "彼女は歌を歌いました",
        usageLabel: "Past:Fact",
        whyJa: ["sing の過去形 sang に注意"],
        aspectOverrides: {
          progressive: {
            situationJa: "過去のその瞬間、まさに歌っている最中だったとき",
            jpNatural: "（その時）彼女は歌を歌っていました",
            usageLabel: "Progressive:InProgress",
            whyJa: ["was/were singing で過去の動作中を表します"],
          },
          perfect: {
            situationJa: "過去のコンサートが終わった時点までに、すでにその歌を歌い終えていたとき",
            jpNatural: "（その時までに）彼女は歌い終えていました",
            usageLabel: "Perfect:Result",
            whyJa: ["had sung で過去までの完了を表します"],
          },
          perfectProgressive: {
            situationJa: "過去のある時点まで、それまでずっと歌い続けていた状況",
            jpNatural: "（その時まで）彼女はずっと歌い続けていました",
            usageLabel: "Perfect:Continuation",
            whyJa: ["had been singing で過去までの継続を強調します"],
          }
        }
      },
      Future: {
        situationJa: "将来、歌を歌う予定や意志があるとき",
        jpNatural: "歌を歌うつもりです",
        usageLabel: "Future:Will:Decision",
        aspectOverrides: {
          progressive: {
            situationJa: "将来のある時間に、ちょうど熱唱している最中だろうと言うとき",
            jpNatural: "（その時間は）歌を歌っている最中でしょう",
            usageLabel: "Future:Progressive",
            whyJa: ["will be singing で未来の進行を表します"],
          },
          perfect: {
            situationJa: "将来の特定の時点までに、すべての曲を歌い終えているだろうと言うとき",
            jpNatural: "（その時までには）歌い終えているでしょう",
            usageLabel: "Future:Perfect",
            whyJa: ["will have sung で未来の完了を表します"],
          }
        }
      }
    },
    lesson: {
      situationJa: "彼女の才能や披露",
      jpLiteral: "彼女は美しい歌を歌う",
      jpNatural: "彼女は美しい歌を歌います",
      usageLabel: "Present:Fact",
      whyJa: ["3sgのsに注意"],
    },
  },
  {
    id: "drink-coffee",
    titleJa: "コーヒーを飲む",
    subject: "He",
    verbId: "drink",
    tail: "coffee every morning",
    allowedFutureModes: ["will", "goingTo"],
    aspectOverrides: {
      progressive: {
        situationJa: "今この瞬間、まさにコーヒーをすすっている最中のとき",
        jpNatural: "彼はコーヒーを飲んでいます",
        usageLabel: "Progressive:InProgress",
        whyJa: ["今現在の動作を表します"],
      },
      perfect: {
        situationJa: "「もう飲んじゃった」という完了や、「コーヒーを飲んだことがある（経験）」を言うとき",
        jpNatural: "彼はコーヒーを飲み終えました",
        usageLabel: "Perfect:Result",
        whyJa: ["drink の過去分詞 drunk に注意"],
      },
      perfectProgressive: {
        situationJa: "朝食の時からずっと、何杯もコーヒーを飲み続けている状況",
        jpNatural: "彼は（ずっと）コーヒーを飲み続けています",
        usageLabel: "Perfect:Continuation",
        whyJa: ["have been drinking で動作の継続を強調します"],
      }
    },
    tenseOverrides: {
      Past: {
        situationJa: "今日の朝、彼がコーヒーを飲んだ事実を言うとき",
        jpNatural: "彼はコーヒーを飲みました",
        usageLabel: "Past:Fact",
        whyJa: ["drink の過去形 drank に注意"],
        aspectOverrides: {
          progressive: {
            situationJa: "過去のその瞬間、まさにコーヒーを飲んでいた最中だったとき",
            jpNatural: "（その時）彼はコーヒーを飲んでいました",
            usageLabel: "Progressive:InProgress",
            whyJa: ["was/were drinking で過去の動作中を表します"],
          },
          perfect: {
            situationJa: "過去の会議が始まる前に、すでにコーヒーを飲み終えていたとき",
            jpNatural: "（その時までに）彼はコーヒーを飲み終えていました",
            usageLabel: "Perfect:Result",
            whyJa: ["had drunk で過去までの完了を表します"],
          },
          perfectProgressive: {
            situationJa: "過去のある時点まで、仕事の合間にずっと飲み続けていた状況",
            jpNatural: "（その時まで）ずっとコーヒーを飲み続けていました",
            usageLabel: "Perfect:Continuation",
            whyJa: ["had been drinking で過去までの継続を強調します"],
          }
        }
      },
      Future: {
        situationJa: "将来、コーヒーを飲むつもりや予測",
        jpNatural: "コーヒーを飲むつもりです",
        usageLabel: "Future:Will:Decision",
        aspectOverrides: {
          progressive: {
            situationJa: "将来のある時間に、ちょうど一息ついて飲んでいる最中だろうと言うとき",
            jpNatural: "（その時間は）コーヒーを飲んでいる最中でしょう",
            usageLabel: "Future:Progressive",
            whyJa: ["will be drinking で未来の進行を表します"],
          },
          perfect: {
            situationJa: "誰かが来る未来の時点までに、すでに飲み終えているだろうと言うとき",
            jpNatural: "（君が来るまでには）飲み終えているよ",
            usageLabel: "Future:Perfect",
            whyJa: ["will have drunk で未来の完了を表します"],
          },
          perfectProgressive: {
            situationJa: "将来のある時点まで、それまでずっとコーヒーを飲み続けているだろうと言うとき",
            jpNatural: "（その時まで）ずっとコーヒーを飲み続けていることでしょう",
            usageLabel: "Future:PerfectProgressive",
            whyJa: ["will have been drinking で未来までの継続を強調します"],
          }
        }
      }
    },
    lesson: {
      situationJa: "毎朝の習慣",
      jpLiteral: "彼は毎朝コーヒーを飲む",
      jpNatural: "彼は毎朝コーヒーを飲みます",
      usageLabel: "Present:Habit",
      whyJa: ["習慣的な動作は現在形"],
    },
  },
  {
    id: "clean-room",
    titleJa: "部屋を掃除する",
    subject: "I",
    verbId: "clean",
    tail: "my room",
    allowedFutureModes: ["will", "goingTo", "progFuture"],
    willNuances: {
      promise: {
        situationJa: "「あとで絶対掃除するから！」と親に約束するとき",
        jpNatural: "（ちゃんと）部屋を掃除します",
        usageLabel: "Future:Will:Promise",
      },
    },
    aspectOverrides: {
      progressive: {
        situationJa: "今、まさに掃除機をかけたり片付けをしたりしている最中のとき",
        jpNatural: "私は部屋を掃除しています",
        usageLabel: "Progressive:InProgress",
        whyJa: ["今現在の動作を表します"],
      },
      perfect: {
        situationJa: "「もうピカピカにしたよ」という完了を言うとき",
        jpNatural: "部屋を掃除し終えました（今は綺麗です）",
        usageLabel: "Perfect:Result",
        whyJa: ["have cleaned で完了や結果を表します"],
      },
      perfectProgressive: {
        situationJa: "さっきからずっと、休みなく掃除をし続けているとき",
        jpNatural: "（ずっと）掃除をし続けています",
        usageLabel: "Perfect:Continuation",
        whyJa: ["have been cleaning で動作の継続を強調します"],
      }
    },
    tenseOverrides: {
      Past: {
        situationJa: "過去の特定の日に部屋を掃除したことを述べるとき",
        jpNatural: "部屋を掃除しました",
        usageLabel: "Past:Fact",
        whyJa: ["過去の行為は過去形です"],
        aspectOverrides: {
          progressive: {
            situationJa: "過去のその瞬間、まさに掃除をしていた最中だったとき",
            jpNatural: "（その時）私は部屋を掃除していました",
            usageLabel: "Progressive:InProgress",
            whyJa: ["was/were cleaning で過去の動作中を表します"],
          },
          perfect: {
            situationJa: "友達が来る過去の時点までに、すでに掃除が完了していたとき",
            jpNatural: "（その時には）私は部屋を掃除し終えていました",
            usageLabel: "Perfect:Result",
            whyJa: ["had cleaned で過去までの完了を表します"],
          },
          perfectProgressive: {
            situationJa: "過去のある時点まで、それまでずっと掃除を続けていた状況",
            jpNatural: "（その時まで）私はずっと掃除をしていました",
            usageLabel: "Perfect:Continuation",
            whyJa: ["had been cleaning で過去までの継続を強調します"],
          }
        }
      },
      Future: {
        situationJa: "将来、掃除をする予定や意志があるとき",
        jpNatural: "部屋を掃除するつもりです",
        usageLabel: "Future:Will:Decision",
        aspectOverrides: {
          progressive: {
            situationJa: "将来のある時間に、ちょうど掃除機をかけている最中だろうと言うとき",
            jpNatural: "（その時間は）部屋を掃除している最中でしょう",
            usageLabel: "Future:Progressive",
            whyJa: ["will be cleaning で未来の進行を表します"],
          },
          perfect: {
            situationJa: "将来の来客時間までに、すでに掃除を済ませているだろうと言うとき",
            jpNatural: "（来客までには）部屋を掃除し終えているでしょう",
            usageLabel: "Future:Perfect",
            whyJa: ["will have cleaned で未来の完了を表します"],
          },
          perfectProgressive: {
            situationJa: "将来のある時点で、合計何時間も掃除をし続けていることになるだろうと言うとき",
            jpNatural: "（その時で）ずっと部屋を掃除し続けていることになります",
            usageLabel: "Future:PerfectProgressive",
            whyJa: ["will have been cleaning で未来までの継続を表します"],
          }
        }
      }
    },
    lesson: {
      situationJa: "これからの予定や事実",
      jpLiteral: "私は自分の部屋を掃除する",
      jpNatural: "自分の部屋を掃除します",
      usageLabel: "Present:Fact",
      whyJa: ["意志や予定を含む動作の事実"],
    },
  },
  {
    id: "open-window",
    titleJa: "窓を開ける",
    subject: "I",
    verbId: "open",
    tail: "the window",
    allowedFutureModes: ["will", "aboutTo"],
    allowedWillNuances: ["decision", "offer"],
    willNuances: {
      decision: {
        situationJa: "「暑いな、窓を開けよう」とその場で決めたとき",
        jpNatural: "（今）窓を開けますね",
        usageLabel: "Future:Will:Decision",
      },
      offer: {
        situationJa: "「開けましょうか？」と親切に申し出るとき",
        jpNatural: "（私が）窓を開けましょう",
        usageLabel: "Future:Will:Offer",
      },
    },
    aspectOverrides: {
      progressive: {
        situationJa: "まさに今、窓に手をかけて開けている最中のとき",
        jpNatural: "窓を開けているところです",
        usageLabel: "Progressive:InProgress",
        whyJa: ["今現在の動作を表します"],
      },
      perfect: {
        situationJa: "「もう開けたよ（今は開いているよ）」という結果を言うとき",
        jpNatural: "窓を開けました（今は開いています）",
        usageLabel: "Perfect:Result",
        whyJa: ["have opened で完了や結果を表します"],
      }
    },
    tenseOverrides: {
      Past: {
        situationJa: "過去のある時、窓を開けたという動作の事実を言うとき",
        jpNatural: "窓を開けました",
        usageLabel: "Past:Fact",
        whyJa: ["過去の出来事は過去形です"],
        aspectOverrides: {
          progressive: {
            situationJa: "過去のその瞬間、まさに窓を開けようとしていたところ",
            jpNatural: "（その時）窓を開けていました",
            usageLabel: "Progressive:InProgress",
            whyJa: ["was/were opening で過去の動作中を表します"],
          },
          perfect: {
            situationJa: "誰かが部屋に入る過去の時点までに、すでに窓が開いていたとき",
            jpNatural: "（その時までに）窓は開けられていました",
            usageLabel: "Perfect:Result",
            whyJa: ["had opened で過去までの完了を表します"],
          }
        }
      },
      Future: {
        situationJa: "将来、窓を開けるという意志や予測",
        jpNatural: "窓を開けるつもりです",
        usageLabel: "Future:Will:Decision",
        aspectOverrides: {
          progressive: {
            situationJa: "将来のある時間に、ちょうど換気のために窓を開けているところだろうと言うとき",
            jpNatural: "（その時は）窓を開けている最中でしょう",
            usageLabel: "Future:Progressive",
            whyJa: ["will be opening で未来の進行を表します"],
          },
          perfect: {
            situationJa: "将来のある時点までに、すでに窓を開け終えているだろうと言うとき",
            jpNatural: "（その時までには）窓を開け終えているでしょう",
            usageLabel: "Future:Perfect",
            whyJa: ["will have opened で未来の完了を表します"],
          }
        }
      }
    },
    lesson: {
      situationJa: "その場の動作",
      jpLiteral: "窓を開ける",
      jpNatural: "窓を開けます",
      usageLabel: "Present:Fact",
      whyJa: ["動作の事実は現在形"],
    },
  },
  {
    id: "close-door",
    titleJa: "ドアを閉める",
    subject: "He",
    verbId: "close",
    tail: "the door",
    allowedFutureModes: ["will", "goingTo", "aboutTo"],
    aspectOverrides: {
      progressive: {
        situationJa: "まさに今、ドアを閉めているところ、または閉まる瞬間のとき",
        jpNatural: "ドアを閉めています / ドアが閉まるところです",
        usageLabel: "Progressive:InProgress",
        whyJa: ["今現在の動作、または直後の未来を表します"],
      },
      perfect: {
        situationJa: "「もう閉めちゃった」という結果を言うとき",
        jpNatural: "ドアを閉め終えました（今は閉まっています）",
        usageLabel: "Perfect:Result",
        whyJa: ["have closed で完了や結果を表します"],
      }
    },
    tenseOverrides: {
      Past: {
        situationJa: "過去にドアを閉めたという事実を言うとき",
        jpNatural: "ドアを閉めました",
        usageLabel: "Past:Fact",
        whyJa: ["過去の行為は過去形です"],
        aspectOverrides: {
          progressive: {
            situationJa: "過去のその瞬間、まさにドアを閉めようとしていたところ",
            jpNatural: "（その時）ドアを閉めていました",
            usageLabel: "Progressive:InProgress",
            whyJa: ["was/were closing で過去の動作中を表します"],
          },
          perfect: {
            situationJa: "過去の特定の時点までに、すでにドアが閉まっていたとき",
            jpNatural: "（その時までに）ドアを閉め終えていました",
            usageLabel: "Perfect:Result",
            whyJa: ["had closed で過去までの完了を表します"],
          },
          perfectProgressive: {
            situationJa: "過去のある時点まで、それまでずっとドアを閉め続けていた状況",
            jpNatural: "（その時まで）ずっとドアを閉め続けていました",
            usageLabel: "Perfect:Continuation",
            whyJa: ["had been closing で過去までの継続を強調します"],
          }
        }
      },
      Future: {
        situationJa: "将来、ドアを閉める予定や意志",
        jpNatural: "ドアを閉めるつもりです",
        usageLabel: "Future:Will:Decision",
        aspectOverrides: {
          progressive: {
            situationJa: "将来のある時間に、ちょうど戸締まりのためにドアを閉めているところだろうと言うとき",
            jpNatural: "（その時は）ドアを閉めている最中でしょう",
            usageLabel: "Future:Progressive",
            whyJa: ["will be closing で未来の進行を表します"],
          },
          perfect: {
            situationJa: "外出する未来の時点までに、戸締まりを終えているだろうと言うとき",
            jpNatural: "（出かけるまでには）ドアを閉め終えているでしょう",
            usageLabel: "Future:Perfect",
            whyJa: ["will have closed で未来の完了を表します"],
          },
          perfectProgressive: {
            situationJa: "将来のある時点まで、それまでずっとドアを閉め続けているだろうと言うとき",
            jpNatural: "（その時まで）ずっとドアを閉め続けていることでしょう",
            usageLabel: "Future:PerfectProgressive",
            whyJa: ["will have been closing で未来までの継続を強調します"],
          }
        }
      }
    },
    lesson: {
      situationJa: "動作の事実",
      jpLiteral: "彼はドアを閉める",
      jpNatural: "彼はドアを閉めます",
      usageLabel: "Present:Fact",
      whyJa: ["3sgのsに注意"],
    },
  },
  {
    id: "listen-music",
    titleJa: "音楽を聴く",
    subject: "You",
    verbId: "listen",
    tail: "to music",
    allowedFutureModes: ["will", "goingTo"],
    aspectOverrides: {
      progressive: {
        situationJa: "今、まさにイヤホンなどで音楽を聴いている最中のとき",
        jpNatural: "あなたは音楽を聴いています",
        usageLabel: "Progressive:InProgress",
        whyJa: ["今現在の動作を表します"],
      },
      perfect: {
        situationJa: "「さっきまで聴いていた」という継続や、「その曲を聴いたことがある」という経験を言うとき",
        jpNatural: "あなたは音楽を（さっきまで）聴いていました / 聴いたことがあります",
        usageLabel: "Perfect:Experience",
        whyJa: ["have listened で経験や完了を表します"],
      },
      perfectProgressive: {
        situationJa: "午前中からずっと、お気に入りの曲を聴き続けているとき",
        jpNatural: "あなたはずっと音楽を聴き続けています",
        usageLabel: "Perfect:Continuation",
        whyJa: ["have been listening で動作の継続を強調します"],
      }
    },
    tenseOverrides: {
      Past: {
        situationJa: "過去に音楽を聴いたという事実を述べるとき",
        jpNatural: "音楽を聴きました",
        usageLabel: "Past:Fact",
        whyJa: ["listen の過去形 listened に注意"],
        aspectOverrides: {
          progressive: {
            situationJa: "過去のその瞬間、まさに音楽を聴いていた最中だったとき",
            jpNatural: "（その時）あなたは音楽を聴いていました",
            usageLabel: "Progressive:InProgress",
            whyJa: ["was/were listening で過去の動作中を表します"],
          },
          perfect: {
            situationJa: "過去のある時点までに、すでに聴き終えていたとき",
            jpNatural: "（その時までに）あなたは音楽を聴き終えていました",
            usageLabel: "Perfect:Result",
            whyJa: ["had listened で過去までの完了を表します"],
          },
          perfectProgressive: {
            situationJa: "過去のある時点まで、それまでずっと音楽を聴き続けていた状況",
            jpNatural: "（その時まで）あなたはずっと音楽を聴き続けていました",
            usageLabel: "Perfect:Continuation",
            whyJa: ["had been listening で過去までの継続を強調します"],
          }
        }
      },
      Future: {
        situationJa: "将来、音楽を聴く予定や意志を述べるとき",
        jpNatural: "音楽を聴くつもりです",
        usageLabel: "Future:Will:Decision",
        aspectOverrides: {
          progressive: {
            situationJa: "将来のある時間に、ちょうどお気に入りの曲を聴いてリラックスしているだろうと言うとき",
            jpNatural: "（その時間は）音楽を聴いている最中でしょう",
            usageLabel: "Future:Progressive",
            whyJa: ["will be listening で未来の進行を表します"],
          },
          perfect: {
            situationJa: "将来の特定の時点までに、アルバムを聴き終えているだろうと言うとき",
            jpNatural: "（その時までには）アルバムを聴き終えているでしょう",
            usageLabel: "Future:Perfect",
            whyJa: ["will have listened で未来の完了を表します"],
          },
          perfectProgressive: {
            situationJa: "将来のある時点（親が部屋に来る時など）で、合計何時間も聴き続けていることになる、と言いたいとき",
            jpNatural: "（その時で）1時間ずっと音楽を聴き続けていることになります",
            usageLabel: "Future:PerfectProgressive",
            whyJa: ["will have been listening で未来までの継続を表します"],
          }
        }
      }
    },
    lesson: {
      situationJa: "趣味や現在の動作",
      jpLiteral: "あなたは音楽を聴く",
      jpNatural: "あなたは音楽を聴きます",
      usageLabel: "Present:Habit",
      whyJa: ["習慣的な動作は現在形"],
    },
  },
  {
    id: "visit-tokyo",
    titleJa: "東京を訪れる",
    subject: "We",
    verbId: "visit",
    tail: "Tokyo next month",
    allowedFutureModes: ["will", "goingTo", "progFuture"],
    modeOverrides: {
      progFuture: {
        situationJa: "新幹線やホテルを既に予約している確実な予定",
        jpNatural: "来月東京に行くことになっています",
        usageLabel: "Progressive:Temporary",
        whyJa: ["現在進行形は個人的な手配・準備済みの予定に最適です"],
      },
    },
    aspectOverrides: {
      progressive: {
        situationJa: "まさに今、東京を観光して回っている最中のとき",
        jpNatural: "私たちは東京を訪れています（今そこにいます）",
        usageLabel: "Progressive:InProgress",
        whyJa: ["今現在の状態、または滞在中であることを表します"],
      },
      perfect: {
        situationJa: "「以前東京に行ったことがある」という経験や、「すでに到着した」という完了を言うとき",
        jpNatural: "私たちは東京を訪れたことがあります / （もう）東京に着きました",
        usageLabel: "Perfect:Result",
        whyJa: ["have visited で経験や完了を表します"],
      },
      perfectProgressive: {
        situationJa: "数日間ずっと東京に滞在し続け、今もなお観光を続けているとき",
        jpNatural: "私たちは（ずっと）東京を訪れ続けています",
        usageLabel: "Perfect:Continuation",
        whyJa: ["have been visiting で動作の継続を強調します"],
      }
    },
    tenseOverrides: {
      Past: {
        situationJa: "過去に東京を訪れた事実",
        jpNatural: "東京を訪れました",
        usageLabel: "Past:Fact",
        aspectOverrides: {
          progressive: {
            situationJa: "（特定の過去の瞬間）ちょうど東京観光をして回っていたとき",
            jpNatural: "（その時）東京を訪れていました（滞在中でした）",
            usageLabel: "Progressive:InProgress",
          },
          perfect: {
            situationJa: "過去のある時点（引っ越しなど）までに、すでに東京を訪れたことがあったとき",
            jpNatural: "（その時までに）東京を訪れたことがありました",
            usageLabel: "Perfect:Experience",
            whyJa: ["had visited で過去の時点より前の経験を表わします"],
          },
          perfectProgressive: {
            situationJa: "過去のある時点まで、それまでずっと東京を（繰り返し）訪れ続けていたような状況",
            jpNatural: "（その時まで）私たちは東京を訪れ続けていました",
            usageLabel: "Perfect:Continuation",
            whyJa: ["had been visiting で動作の継続を強調します"],
          }
        }
      },
      Future: {
        situationJa: "将来、東京を訪れる予定や意志",
        jpNatural: "来月、東京を訪れる予定です",
        usageLabel: "Future:Will:Decision",
        aspectOverrides: {
          progressive: {
            situationJa: "将来のある時間に、ちょうど東京を観光している真っ最中だろうと言うとき",
            jpNatural: "（その時間は）東京を訪れている最中でしょう",
            usageLabel: "Future:Progressive",
            whyJa: ["will be visiting で未来の進行を表します"],
          },
          perfect: {
            situationJa: "連休が終わる未来の時点までに、一通りの観光スポットを訪れ終えているだろうと言うとき",
            jpNatural: "（連休が終わるまでには）東京を訪れ終えているでしょう",
            usageLabel: "Future:Perfect",
            whyJa: ["will have visited で未来の完了を表します"],
          },
          perfectProgressive: {
            situationJa: "将来の特定の時点（再会した時など）に、東京に滞在し続けてきたことになる、と言いたいとき",
            jpNatural: "（その時で）数日間ずっと東京を訪れ続けていることになります",
            usageLabel: "Future:PerfectProgressive",
            whyJa: ["will have been visiting で未来までの継続を表します"],
          }
        }
      }
    },
    lesson: {
      situationJa: "将来の予定",
      jpLiteral: "私たちは来月東京を訪れる",
      jpNatural: "来月東京を訪れます",
      usageLabel: "Present:Fact",
      whyJa: ["予定であっても現在形を使うことがあります"],
    },
  },
  {
    id: "buy-new-car",
    titleJa: "新しい車を買う",
    subject: "They",
    verbId: "buy",
    tail: "a new car",
    allowedFutureModes: ["will", "goingTo", "progFuture"],
    modeOverrides: {
      goingTo: {
        situationJa: "以前から「買い換えよう」と話し合って決めていたとき",
        jpNatural: "彼らは新しい車を買うつもりです",
        whyJa: ["以前から決めていた「意図」は be going to が一般的です"],
      },
    },
    aspectOverrides: {
      progressive: {
        situationJa: "まさに今、ディーラーで契約書にサインしているような状況のとき",
        jpNatural: "（今）新しい車を買っています",
        usageLabel: "Progressive:InProgress",
        whyJa: ["今現在の動作（手続き中）を表します"],
      },
      perfect: {
        situationJa: "「もう買っちゃった」という結果や、「高級車を買ったことがある」という経験を言うとき",
        jpNatural: "彼らは新しい車を買いました",
        usageLabel: "Perfect:Result",
        whyJa: ["buy の過去分詞 bought に注意"],
      },
      perfectProgressive: {
        situationJa: "数ヶ月前からずっと検討し続け、今まさに商談が大詰めのような状況",
        jpNatural: "（ずっと）新しい車を買い続けています",
        usageLabel: "Perfect:Continuation",
        whyJa: ["have been buying で動作の継続を強調します"],
      }
    },
    tenseOverrides: {
      Past: {
        situationJa: "過去に新しい車を買ったという事実を言うとき",
        jpNatural: "新車を買いました",
        usageLabel: "Past:Fact",
        whyJa: ["buy の過去形 bought に注意"],
        aspectOverrides: {
          progressive: {
            situationJa: "過去のその瞬間、まさに車を買おうと手続きしていたとき",
            jpNatural: "（その時）新しい車を買っていました",
            usageLabel: "Progressive:InProgress",
            whyJa: ["was/were buying で過去の動作中を表します"],
          },
          perfect: {
            situationJa: "過去のある時点（例えば結婚したとき）までに、すでに車を買って所有していたとき",
            jpNatural: "（結婚したときには）既に新車を買っていました",
            usageLabel: "Perfect:Result",
            whyJa: ["had bought で過去までの完了または所有継続を表します"],
          },
          perfectProgressive: {
            situationJa: "過去のある時点まで、それまでずっと買い替えを検討・手続きし続けていたとき",
            jpNatural: "（その時まで）ずっと新しい車を買おうとし続けていました",
            usageLabel: "Perfect:Continuation",
            whyJa: ["had been buying で過去までの継続を強調します"],
          }
        }
      },
      Future: {
        situationJa: "将来、新しい車を買う予定や決意を言うとき",
        jpNatural: "新車を買うつもりです",
        usageLabel: "Future:Will:Decision",
        aspectOverrides: {
          progressive: {
            situationJa: "将来のある時間に、ちょうど契約の手続き中で「車を買っているところ」であろうと言うとき",
            jpNatural: "（その時間は）ちょうど新車を買っている最中（手続き中）でしょう",
            usageLabel: "Future:Progressive",
            whyJa: ["will be buying で未来の進行中（手続き中など）を表します"],
          },
          perfect: {
            situationJa: "来年の今頃までに、貯金を貯めて新車を買い終えているだろうと言うとき",
            jpNatural: "（来年までには）新車を買っているでしょう",
            usageLabel: "Future:Perfect",
            whyJa: ["will have bought で未来の完了を表します"],
          },
          perfectProgressive: {
            situationJa: "将来のある時点まで、それまでずっと新しい車を買い続けているだろうと言うとき",
            jpNatural: "（その時まで）ずっと新しい車を買い続けていることでしょう",
            usageLabel: "Perfect:Continuation",
            whyJa: ["will have been buying で未来までの継続を強調します"],
          }
        }
      }
    },
    lesson: {
      situationJa: "大きな買い物や予定",
      jpLiteral: "彼らは新しい車を買う",
      jpNatural: "彼らは新しい車を買います",
      usageLabel: "Present:Fact",
      whyJa: ["予定も含む動作の事実"],
    },
  },
  {
    id: "walk-dog",
    titleJa: "犬を散歩させる",
    subject: "I",
    verbId: "walk",
    tail: "my dog every evening",
    allowedFutureModes: ["will", "goingTo", "progFuture"],
    aspectOverrides: {
      progressive: {
        situationJa: "今、まさに外で犬を連れて歩いている最中のとき",
        jpNatural: "（今）犬の散歩をしています",
        usageLabel: "Progressive:InProgress",
        whyJa: ["今現在の動作を表します"],
      },
      perfect: {
        situationJa: "「もう散歩は済ませたよ」という完了を言うとき",
        jpNatural: "犬の散歩に行き終えました（もう家です）",
        usageLabel: "Perfect:Result",
        whyJa: ["have walked で完了や結果を表します"],
      },
      perfectProgressive: {
        situationJa: "一時間前からずっと歩き続けていて、今も散歩中のとき",
        jpNatural: "ずっと犬の散歩をし続けています",
        usageLabel: "Perfect:Continuation",
        whyJa: ["have been walking で動作の継続を強調します"],
      }
    },
    tenseOverrides: {
      Past: {
        situationJa: "いつもの散歩ではなく、特定の過去の時点で犬を散歩させた事実",
        jpNatural: "（今日は）犬の散歩をしました",
        usageLabel: "Past:Fact",
        whyJa: ["過去の行為は過去形です"],
        aspectOverrides: {
          progressive: {
            situationJa: "過去のその瞬間、まさに公園で犬を散歩させていたとき",
            jpNatural: "（その時）犬の散歩をしていました",
            usageLabel: "Progressive:InProgress",
            whyJa: ["was/were walking で過去の動作中を表します"],
          },
          perfect: {
            situationJa: "過去のある時点までに、すでに散歩を終えていたとき",
            jpNatural: "（その時までに）散歩はもう済ませておきました",
            usageLabel: "Perfect:Result",
            whyJa: ["had walked で過去までの完了を表します"],
          },
          perfectProgressive: {
            situationJa: "（過去の時点まで）足掛け何年も、毎日欠かさず散歩をさせ続けていたという状況",
            jpNatural: "（その時まで）ずっと犬を散歩させていました",
            usageLabel: "Perfect:Continuation",
            whyJa: ["had been walking で過去までの継続を強調します"],
          }
        }
      },
      Future: {
        situationJa: "将来、犬を散歩させる予定や意志",
        jpNatural: "犬の散歩をするつもりです",
        usageLabel: "Future:Will:Decision",
        aspectOverrides: {
          progressive: {
            situationJa: "将来のある時間に、ちょうど公園で犬を散歩させている最中だろうと言うとき",
            jpNatural: "（その時間は）犬の散歩をしている最中でしょう",
            usageLabel: "Future:Progressive",
            whyJa: ["will be walking で未来の進行を表します"],
          },
          perfect: {
            situationJa: "夕食の未来の時点までに、散歩を済ませているだろうと言うとき",
            jpNatural: "（夕飯までには）散歩を終えているでしょう",
            usageLabel: "Future:Perfect",
            whyJa: ["will have walked で未来の完了を表します"],
          },
          perfectProgressive: {
            situationJa: "将来のある記念日などの時点で、合計何日間も散歩をさせ続けてきたことになるだろうと言うとき",
            jpNatural: "（その日で）1000日間ずっと散歩させてきたことになります",
            usageLabel: "Future:PerfectProgressive",
            whyJa: ["will have been walking で未来までの継続を表します"],
          }
        }
      }
    },
    lesson: {
      situationJa: "夕方の決まった日課",
      jpLiteral: "私は（毎晩）犬の散歩をする",
      jpNatural: "毎晩犬の散歩をします",
      usageLabel: "Present:Habit",
      whyJa: ["習慣的な動作は現在形"],
    },
  },
];
