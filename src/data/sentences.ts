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
      },
      perfect: {
        situationJa: "「雨が降った（ばかり）」という最近の出来事や、「（ずっと）降っていた」という状態を指すとき",
        jpNatural: "雨が降りました / （今まで）降っていました",
        usageLabel: "Perfect:Result",
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
    aspectOverrides: {
      progressive: {
        situationJa: "今、学校に向かっている最中（通学中）のとき",
        jpNatural: "彼らは（今）学校に向かっています",
        usageLabel: "Progressive:InProgress",
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
    aspectOverrides: {
      progressive: {
        situationJa: "まさに今、シャッターを切ろうとしているところ、あるいは撮影中のとき",
        jpNatural: "（今）写真を撮っています",
        usageLabel: "Progressive:InProgress",
      },
      perfect: {
        situationJa: "「もう撮ったよ」という完了や、「撮ったことがある」という経験を言うとき",
        jpNatural: "写真を撮り終えました / 撮ったことがあります",
        usageLabel: "Perfect:Result",
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
      },
      perfect: {
        situationJa: "「さっき読み終わった（読破した）」という完了や、「読したことがある」という経験を言うとき",
        jpNatural: "彼女はその本を読み終えました / 読んだことがあります",
        usageLabel: "Perfect:Result",
      },
      perfectProgressive: {
        situationJa: "数時間前からずっと、今もなお本を読み続けているとき",
        jpNatural: "彼女はずっと本を読み続けています",
        usageLabel: "Perfect:Continuation",
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
      },
      perfect: {
        situationJa: "「もう作り終えたよ」という完了や、「何度も作ったことがある」という経験を言うとき",
        jpNatural: "彼女は夕食を作り終えました / 作ったことがあります",
        usageLabel: "Perfect:Result",
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
      },
      perfect: {
        situationJa: "「さっきまで走っていた」という継続や、「あんなに速く走ったことがある」という経験を言うとき",
        jpNatural: "彼は（今まで）とても速く走っていました / 走ったことがあります",
        usageLabel: "Perfect:Continuation",
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
      },
      perfect: {
        situationJa: "「もう今日の分は終わったよ」という完了や、「ずっと勉強してきた」という継続を言うとき",
        jpNatural: "私たちは英語を勉強し終えました / （ずっと）勉強してきました",
        usageLabel: "Perfect:Continuation",
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
      },
      perfect: {
        situationJa: "「さっきまでやっていた」という継続や、「テニスをしたことがある」という経験を言うとき",
        jpNatural: "あなたは（さっきまで）テニスをしていました / したことがあります",
        usageLabel: "Perfect:Experience",
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
      },
      perfect: {
        situationJa: "「もう車を洗い終えたよ」という完了を言うとき",
        jpNatural: "彼は車を洗い終えました",
        usageLabel: "Perfect:Result",
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
      },
      perfect: {
        situationJa: "「さっきまで見ていた」という継続や、「あの番組を見たことがある」という経験を言うとき",
        jpNatural: "彼らは（さっきまで）テレビを見ていました / 見たことがあります",
        usageLabel: "Perfect:Experience",
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
      },
      perfect: {
        situationJa: "「さっき書き上げた」という完了や、「ずっと書いてきた」という継続を言うとき",
        jpNatural: "私は手紙を書き終えました / （ずっと）手紙を書いてきました",
        usageLabel: "Perfect:Continuation",
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
      },
      perfect: {
        situationJa: "「さっき歌い終えた」という完了や、「その歌を歌ったことがある」という経験を言うとき",
        jpNatural: "彼女は歌い終えました / 歌ったことがあります",
        usageLabel: "Perfect:Experience",
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
      },
      perfect: {
        situationJa: "「もう飲んじゃった」という完了や、「コーヒーを飲んだことがある（経験）」を言うとき",
        jpNatural: "彼はコーヒーを飲み終えました",
        usageLabel: "Perfect:Result",
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
      },
      perfect: {
        situationJa: "「もうピカピカにしたよ」という完了を言うとき",
        jpNatural: "部屋を掃除し終えました（今は綺麗です）",
        usageLabel: "Perfect:Result",
      },
      perfectProgressive: {
        situationJa: "さっきからずっと、休みなく掃除をし続けているとき",
        jpNatural: "（ずっと）掃除をし続けています",
        usageLabel: "Perfect:Continuation",
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
      },
      perfect: {
        situationJa: "「もう開けたよ（今は開いているよ）」という結果を言うとき",
        jpNatural: "窓を開けました（今は開いています）",
        usageLabel: "Perfect:Result",
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
      },
      perfect: {
        situationJa: "「もう閉めちゃった」という結果を言うとき",
        jpNatural: "ドアを閉め終えました（今は閉まっています）",
        usageLabel: "Perfect:Result",
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
      },
      perfect: {
        situationJa: "「さっきまで聴いていた」という継続や、「その曲を聴いたことがある」という経験を言うとき",
        jpNatural: "あなたは音楽を（さっきまで）聴いていました / 聴いたことがあります",
        usageLabel: "Perfect:Experience",
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
      },
      perfect: {
        situationJa: "「以前東京に行ったことがある」という経験や、「すでに到着した」という完了を言うとき",
        jpNatural: "私たちは東京を訪れたことがあります / （もう）東京に着きました",
        usageLabel: "Perfect:Result",
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
      },
      perfect: {
        situationJa: "「もう買っちゃった」という結果や、「高級車を買ったことがある」という経験を言うとき",
        jpNatural: "彼らは新しい車を買いました",
        usageLabel: "Perfect:Result",
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
      },
      perfect: {
        situationJa: "「もう散歩は済ませたよ」という完了を言うとき",
        jpNatural: "犬の散歩に行き終えました（もう家です）",
        usageLabel: "Perfect:Result",
      },
      perfectProgressive: {
        situationJa: "一時間前からずっと歩き続けていて、今も散歩中のとき",
        jpNatural: "ずっと犬の散歩をし続けています",
        usageLabel: "Perfect:Continuation",
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
