import { SentenceTemplate } from '../domain/types';

export const sentences: SentenceTemplate[] = [
  {
    id: '01',
    titleJa: '朝食（習慣/行動）',
    subject: 'I',
    verbKey: 'eat',
    object: 'breakfast',
    time: { present: 'every day', past: 'yesterday', future: 'tomorrow' },
    tags: ['action'],
    nuance: {
      simplePresent: '（習慣として）食べる',
      simplePast: '（過去の事実として）食べた',
      simpleFuture: '（これから）食べるつもり',
      progressive: '今ちょうど食べている最中',
      perfect: 'もう食べ終えた（満腹/完了）',
      perfectProgressive: 'ずっと食べ続けている'
    }
  },
  {
    id: '02',
    titleJa: '大阪在住（状態）',
    subject: 'I',
    verbKey: 'live',
    prepPhrase: 'in Osaka',
    time: { past: 'in 2020', future: 'next year' },
    tags: ['state'],
    nuance: {
      simplePresent: '（定住して）住んでいる',
      simplePast: '以前住んでいた',
      simpleFuture: '住むことになる',
      progressive: '（一時的に）住んでいる',
      perfect: 'ずっと住んできた（継続）',
      perfectProgressive: 'ずっと住み続けている'
    }
  },
  {
    id: '03',
    titleJa: '英語の勉強（活動）',
    subject: 'I',
    verbKey: 'study',
    object: 'English',
    time: { present: 'every night', past: 'last night', future: 'tonight' },
    tags: ['activity'],
    nuance: {
      simplePresent: '勉強する習慣がある',
      simplePast: '勉強した',
      simpleFuture: '勉強するつもり',
      progressive: '勉強している最中',
      perfect: '勉強し終えた（経験/完了）',
      perfectProgressive: 'ずっと勉強し続けている'
    }
  },
  {
    id: '04',
    titleJa: '仕事（活動）',
    subject: 'I',
    verbKey: 'work',
    time: { present: 'on weekdays', past: 'yesterday', future: 'tomorrow' },
    tags: ['activity'],
    nuance: {
      simplePresent: '働いている（職がある）',
      simplePast: '働いた',
      simpleFuture: '働くつもり',
      progressive: '今仕事中',
      perfect: '働き終えた / 働いたことがある',
      perfectProgressive: 'ずっと働き詰めだ'
    }
  },
  {
    id: '05',
    titleJa: '到着（到達）',
    subject: 'She',
    verbKey: 'arrive',
    time: { present: 'at 10', past: 'at 10 yesterday', future: 'at 10 tomorrow' },
    tags: ['achievement'],
    nuance: {
      simplePresent: '（ダイヤ通りに）到着する',
      simplePast: '到着した',
      simpleFuture: '到着するだろう',
      progressive: 'もうすぐ到着しそうだ',
      perfect: 'すでに到着してここにいる',
      perfectProgressive: '（通常あまり使わない）'
    }
  },
  {
    id: '06',
    titleJa: 'レポート終了（達成）',
    subject: 'We',
    verbKey: 'finish',
    object: 'the report',
    time: { present: 'today', past: 'yesterday', future: 'by tomorrow' },
    tags: ['achievement'],
    nuance: {
      simplePresent: '終える（予定/習慣）',
      simplePast: '終えた',
      simpleFuture: '終えるつもり',
      progressive: '終えようとしている最中',
      perfect: 'もう終わった',
      perfectProgressive: '（完了へ向けて）ずっと作業している'
    }
  },
  {
    id: '07',
    titleJa: '運転（行動）',
    subject: 'I',
    verbKey: 'drive',
    object: 'a car',
    tags: ['action'],
    nuance: {
      simplePresent: '運転する（免許がある/習慣）',
      simplePast: '運転した',
      simpleFuture: '運転するつもり',
      progressive: '今運転中',
      perfect: '運転したことがある / し終えた',
      perfectProgressive: 'ずっと運転している'
    }
  },
  {
    id: '08',
    titleJa: 'オフィスへ行く（移動）',
    subject: 'I',
    verbKey: 'go',
    prepPhrase: 'to the office',
    tags: ['action'],
    nuance: {
      simplePresent: '行く（習慣）',
      simplePast: '行った',
      simpleFuture: '行くつもり',
      progressive: '向かっている最中',
      perfect: '行ってしまった（ここにはいない）',
      perfectProgressive: 'ずっと通っている'
    }
  },
  {
    id: '09',
    titleJa: '彼に会う（予定）',
    subject: 'I',
    verbKey: 'meet',
    object: 'him',
    time: { future: 'tomorrow' },
    tags: ['action'],
    nuance: {
      simplePresent: '会う（習慣）',
      simplePast: '会った',
      simpleFuture: '会うつもり',
      progressive: '会っている最中 / 明日会う予定（確定）',
      perfect: 'もう会った',
      perfectProgressive: 'ずっと会っている'
    }
  },
  {
    id: '10',
    titleJa: 'メールを書く',
    subject: 'She',
    verbKey: 'write',
    object: 'an email',
    tags: ['action'],
    nuance: {
      simplePresent: '書く（習慣）',
      simplePast: '書いた',
      simpleFuture: '書くつもり',
      progressive: '書いている最中',
      perfect: '書き終えた',
      perfectProgressive: 'ずっと書き続けている'
    }
  },
  {
    id: '11',
    titleJa: '写真を撮る',
    subject: 'He',
    verbKey: 'take',
    object: 'a photo',
    tags: ['action'],
    nuance: {
      simplePresent: '撮る（習慣/趣味）',
      simplePast: '撮った',
      simpleFuture: '撮るだろう',
      progressive: '構えている最中',
      perfect: '撮り終えた',
      perfectProgressive: 'ずっと撮っている'
    }
  },
  {
    id: '12',
    titleJa: '夕食を作る',
    subject: 'They',
    verbKey: 'make',
    object: 'dinner',
    tags: ['action'],
    nuance: {
      simplePresent: '作る（係/習慣）',
      simplePast: '作った',
      simpleFuture: '作るつもり',
      progressive: '作っている最中',
      perfect: '作り終えた',
      perfectProgressive: 'ずっと作っている'
    }
  },
  {
    id: '13',
    titleJa: '映画を観る',
    subject: 'We',
    verbKey: 'watch',
    object: 'a movie',
    tags: ['action'],
    nuance: {
      simplePresent: '観る（習慣）',
      simplePast: '観た',
      simpleFuture: '観るつもり',
      progressive: '観ている最中',
      perfect: '観終わった / 観たことがある',
      perfectProgressive: 'ずっと観ている'
    }
  },
  {
    id: '14',
    titleJa: '走る（運動）',
    subject: 'I',
    verbKey: 'run',
    tags: ['activity'],
    nuance: {
      simplePresent: '走る（習慣）',
      simplePast: '走った',
      simpleFuture: '走るつもり',
      progressive: '走っている最中',
      perfect: '走り終えた',
      perfectProgressive: '走り続けてきた（今疲れている）'
    }
  },
  {
    id: '15',
    titleJa: '家を建てる',
    subject: 'They',
    verbKey: 'build',
    object: 'a house',
    tags: ['action'],
    nuance: {
      simplePresent: '建てる（仕事で等）',
      simplePast: '建てた',
      simpleFuture: '建てるだろう',
      progressive: '建設中',
      perfect: '建て終わった（完成）',
      perfectProgressive: 'ずっと建設作業をしている'
    }
  },
  {
    id: '16',
    titleJa: '雨が降る',
    subject: 'It',
    verbKey: 'rain',
    tags: ['weather'],
    nuance: {
      simplePresent: '（気候として）雨が降る',
      simplePast: '降った',
      simpleFuture: '降るだろう',
      progressive: '今降っている',
      perfect: '降った（地面が濡れている）',
      perfectProgressive: 'ずっと降り続いている'
    }
  },
  {
    id: '17',
    titleJa: '答えを知っている（状態）',
    subject: 'I',
    verbKey: 'know',
    object: 'the answer',
    tags: ['state'],
    restrictions: { progressiveBad: true, note: '状態動詞 know は通常進行形にしない' },
    nuance: {
      simplePresent: '知っている',
      simplePast: '知っていた',
      simpleFuture: '知ることになるだろう',
      progressive: '×（知っている状態の途中とは言わない）',
      perfect: 'ずっと知っている',
      perfectProgressive: '×'
    }
  },
  {
    id: '18',
    titleJa: '車を持っている（所有）',
    subject: 'She',
    verbKey: 'have_own',
    object: 'a car',
    tags: ['state'],
    restrictions: { progressiveBad: true, note: '所有の have は進行形にしない（食事の have とは別）' },
    nuance: {
      simplePresent: '持っている',
      simplePast: '持っていた',
      simpleFuture: '持つことになる',
      progressive: '×（所有しつつある、とは言わない）',
      perfect: 'ずっと持っている',
      perfectProgressive: '×'
    }
  },
  {
    id: '19',
    titleJa: '決める',
    subject: 'I',
    verbKey: 'decide',
    tags: ['achievement'],
    nuance: {
      simplePresent: '決める（習慣）',
      simplePast: '決めた',
      simpleFuture: '決めるだろう',
      progressive: '決めようとしている（迷っている）',
      perfect: 'もう決めた（決心がついた）',
      perfectProgressive: 'ずっと決めかねている'
    }
  },
  {
    id: '20',
    titleJa: '寝落ちする',
    subject: 'I',
    verbKey: 'fall',
    complement: 'asleep',
    allowedFutureModes: ['will', 'goingTo', 'aboutTo'],
    tags: ['achievement'],
    nuance: {
      simplePresent: '寝落ちする',
      simplePast: '寝落ちした',
      simpleFuture: '寝落ちするだろう',
      progressive: '寝落ちしかけている',
      perfect: '寝落ちしてしまった',
      perfectProgressive: '（あまり使わない）'
    }
  }
];
