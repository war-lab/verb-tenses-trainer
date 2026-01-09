# 英語時制学習アプリ（Verb Tenses Trainer）開発プロンプト（React + TypeScript）

あなたは熟練のフロントエンドエンジニア兼教材設計者です。  
以下の仕様で **React + TypeScript** の学習アプリ（MVP）を実装してください。  
目的は「同一の例文を、時制（過去/現在/未来）と、完了/進行（※完了と進行は共存可能）を切り替えるだけで、英語のニュアンスがどう変わるか」を体感させることです。

---

## 0. 前提（文法の整理）
- **時制（Tense）**：過去 / 現在 / 未来  
  → 時制は同時に複数は持てない（過去と現在を同時にはできない）
- **アスペクト（Aspect）**：完了 / 進行  
  → 完了と進行は共存可能（Perfect Progressive）
- 未来表現は `will` だけでなく `be going to` / **現在進行形で未来** / `be about to` 等も扱う

---

## 1. アプリの学習体験（UI/UX）
### 1-1. 基本画面（Trainer）
- 例文カードを1つ選ぶ（20個セットから）
- 「時制」タブ：`Past / Present / Future`
- 「アスペクト」トグル：`Perfect` / `Progressive`（両方ON可）
- 未来表現の選択（Futureのときだけ表示）：
  - `will`
  - `be going to`
  - `present progressive (future plan)` ※例: I’m meeting him tomorrow.
  - `be about to` ※例: I’m about to fall asleep.
- 生成された英文を表示
- 変更された部分（助動詞・have・be・過去分詞・ing）を **ハイライト**
- 右側/下側に **日本語の「一言ニュアンス」** を表示（長文解説は不要）

### 1-2. 比較モード（Compare）
- 同じ例文を、**最大3つのフォーム**（例：will / going to / prog-future）で並べて差分比較できる

### 1-3. 未来の使い分けミニレッスン（Future Guide）
- `will` vs `be going to` の違いを短く表示
  - `will`：その場の判断/意志/予測（今決めた感）
  - `be going to`：事前に決まっていた計画/根拠のある予測
- 進行形で未来：予定・確定っぽさ（カレンダーに入ってる感じ）
- `be about to`：直前（今にも〜しそう）

---

## 2. 生成ルール（テンプレ）
### 2-1. 基本形
- **Progressive**：`be + V-ing`（be動詞に時制が乗る）
  - Present: `am/is/are + V-ing`
  - Past: `was/were + V-ing`
  - Future: `will be + V-ing`
- **Perfect**：`have + V-pp`（haveに時制が乗る）
  - Present: `have/has + V-pp`
  - Past: `had + V-pp`
  - Future: `will have + V-pp`
- **Perfect Progressive**：`have been + V-ing`
  - Present: `have/has been + V-ing`
  - Past: `had been + V-ing`
  - Future: `will have been + V-ing`

### 2-2. Future表現（Simple Futureのバリエーション）
- `will + base`（意思/その場で決めた/予測）
- `be going to + base`（計画/根拠のある予測）
- `present progressive + time marker`（予定/確定感）
- `be about to + base`（直前）

※アプリでは「Future」のときに `futureMode` を選ばせる。

---

## 3. MVP要件（実装要件）
- **フレームワーク**：React + TypeScript
- **ビルド**：Vite
- **状態管理**：React hooksでOK（Contextでも可）
- **スタイル**：CSS Modules or Tailwindどちらでも良い（ただし読みやすくシンプル）
- **データ**：ローカル定数（JSON/TS）で持つ（DB不要）
- **ルーティング**：
  - `/` Trainer
  - `/compare` Compare
  - `/future` Future Guide
- **必須機能**：
  1) 20例文から選択  
  2) tense + aspect + futureMode を切替 → 英文生成  
  3) 差分ハイライト  
  4) 日本語一言ニュアンス表示  
  5) progressiveが不自然な文（状態動詞など）は警告表示（例：know/own 等）
- **品質**：
  - 型定義を丁寧に（`Tense`, `Aspect`, `FutureMode`, `VerbForms`, `SentenceTemplate`）
  - 生成ロジックは `src/lib/conjugator.ts` などに分離してテストしやすく

---

## 4. データモデル（推奨）
### 4-1. VerbForms
```ts
type VerbForms = {
  base: string;       // go
  past: string;       // went
  pp: string;         // gone
  ing: string;        // going
  third: string;      // goes
  progressiveAllowed?: boolean; // default true
  notes?: string;     // 状態動詞など
};
```

### 4-2. SentenceTemplate
```ts
type Person = "I" | "You" | "He" | "She" | "We" | "They" | "It";

type SentenceTemplate = {
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
};
```

---

## 5. 例文20個「最強セット」（verbs辞書 + sentenceTemplates）
### 5-1. verbs（不規則は明示、規則はそのまま）
以下を `src/data/verbs.ts` に入れて使ってください。

- go: go / went / gone / going / goes
- eat: eat / ate / eaten / eating / eats
- drive: drive / drove / driven / driving / drives
- write: write / wrote / written / writing / writes
- take: take / took / taken / taking / takes
- make: make / made / made / making / makes
- meet: meet / met / met / meeting / meets
- build: build / built / built / building / builds
- run: run / ran / run / running / runs
- study: study / studied / studied / studying / studies
- work: work / worked / worked / working / works
- watch: watch / watched / watched / watching / watches
- finish: finish / finished / finished / finishing / finishes
- arrive: arrive / arrived / arrived / arriving / arrives
- decide: decide / decided / decided / deciding / decides
- live: live / lived / lived / living / lives
- know: know / knew / known / knowing / knows（progressiveAllowed=false 推奨）
- have(own): have / had / had / having / has（所有のhaveはprogressiveBad）
- rain: rain / rained / rained / raining / rains（It主語用）
- fall: fall / fell / fallen / falling / falls（be about to の例に使える）

### 5-2. sentenceTemplates（20個）
以下を `src/data/sentences.ts` に入れ、UIの一覧に出してください。  
※ timeは表示補助。必須ではないが、**進行形で未来**を成立させるため future time を活用してOK。

---

#### 01. (habit/action) 朝食
- EN base: I eat breakfast.
- time: present="every day", past="yesterday", future="tomorrow"
- ニュアンス（例）：
  - simplePresent: 習慣
  - simplePast: 昨日の事実
  - simpleFuture: 明日食べる（意思/予定）
  - progressive: いま食べてる最中
  - perfect: もう食べ終えた（結果）
  - perfectProgressive: 食べ続けてきた（継続の途中）

#### 02. (state) 在住
- EN base: I live in Osaka.
- time: past="in 2020", future="next year"
- progressive: “一時的に住んでる”感
- perfect: “ずっと住んできた（今も）”

#### 03. (activity) 勉強
- EN base: I study English.
- time: present="every night", past="last night", future="tonight"

#### 04. (activity) 仕事
- EN base: I work.
- time: present="on weekdays", past="yesterday", future="tomorrow"

#### 05. (achievement) 到着
- EN base: She arrives.
- time: present="at 10", past="at 10 yesterday", future="at 10 tomorrow"
- perfect: “もう到着した”

#### 06. (achievement) 終了
- EN base: We finish the report.
- time: present="today", past="yesterday", future="by tomorrow"
- future perfectが刺さる：will have finished by tomorrow

#### 07. (action) 運転
- EN base: I drive a car.
- future: will / going to の比較に最適

#### 08. (action) 行く（未来表現の主役）
- EN base: I go to the office.
- future: will go / am going to go / am going (tomorrow)

#### 09. (action) 会う（進行形で未来）
- EN base: I meet him.
- future="tomorrow"（I’m meeting him tomorrow が成立）

#### 10. (action) 書く
- EN base: She writes an email.
- perfect: “もう書いた”が自然

#### 11. (action) 取る
- EN base: He takes a photo.
- progressive: “撮ってる最中”

#### 12. (action) 作る
- EN base: They make dinner.
- progressive/ perfect/ perfect progressive 全部使いやすい

#### 13. (action) 見る
- EN base: We watch a movie.
- progressive: “観てる最中”

#### 14. (activity) 走る
- EN base: I run.
- progressive: “走ってる最中”
- perfectProgressive: “走り続けてきた（疲れてる）”

#### 15. (action) 作る（build）
- EN base: They build a house.
- perfect: 完成した/していないの差が出る

#### 16. (weather) 雨（It主語）
- EN base: It rains.
- progressive: It is raining.
- perfect: It has rained.（雨が降った＝地面が濡れてる等）
- perfectProgressive: It has been raining.（ずっと降ってる）

#### 17. (state/注意) 知っている（progressive不自然）
- EN base: I know the answer.
- restrictions: progressiveBad=true（通常 “I am knowing” は不自然）
- UIで警告：状態動詞は基本進行形にしない

#### 18. (state/注意) 所有のhave（progressive不自然）
- EN base: She has a car.
- restrictions: progressiveBad=true（所有は “is having” にしない）
- 例外説明は1行だけ：「have=所有は進行にしない。have=食事/経験は別」

#### 19. (achievement) 決める
- EN base: I decide.
- perfect: “もう決めた”
- will vs going to：意思 vs 計画にも絡む

#### 20. (about to) 寝落ち直前
- EN base: I fall asleep.
- futureMode="aboutTo" で “I’m about to fall asleep.” を生成できるようにする（これは特別扱いでもOK）
- progressiveも “I’m falling asleep.” は「寝落ちし始めてる」ニュアンス

---

## 6. 生成エンジンの仕様（重要）
### 6-1. 出力構成
基本は以下の順で生成する：

1) 主語（subject）
2) 助動詞/助動構文（will / be going to / about to 等）
3) 完了（have）
4) 進行（be）
5) 本動詞（base / pp / ing / past / third）
6) 目的語/補語/前置詞句
7) time phrase（任意）

### 6-2. “Simple” の生成
- Present: `I/You/We/They + base`, `He/She/It + third`
- Past: `+ past`
- Future: futureModeで分岐（will / going to / present progressive / about to）
  - will: `will + base`
  - goingTo: `am/is/are going to + base`
  - progFuture: `am/is/are + ing`（time.futureがある場合に推奨）
  - aboutTo: `am/is/are about to + base`

### 6-3. aspect適用
- perfect ON: `have/has`（present）/ `had`（past）/ `will have`（future） + `pp`
- progressive ON: `be`（時制に合わせる or will be） + `ing`
- perfect+progressive ON: `have been`（時制変化） + `ing`

※ futureModeが progFuture のときにさらに progressive ON を重ねると破綻しやすいので、
- `progFuture` は “Simple Future枠の別表現” として扱い、progressiveトグルはOFF固定でも良い
（またはUIで無効化）

### 6-4. 制約（警告）
- `progressiveAllowed=false` または `progressiveBad=true` の文で progressive をONにしたら、
  - 生成はする（学習用に敢えて見せる） or 生成を止める（どちらでも）
  - ただし必ず「不自然/例外あり」警告を表示

---

## 7. 画面構成（提案コンポーネント）
- `App.tsx`（Router）
- `pages/TrainerPage.tsx`
- `pages/ComparePage.tsx`
- `pages/FutureGuidePage.tsx`
- `components/SentencePicker.tsx`
- `components/TenseControls.tsx`（Past/Present/Future + Perfect/Progressive）
- `components/FutureModeSelect.tsx`
- `components/GeneratedSentence.tsx`（ハイライト表示）
- `components/NuanceNote.tsx`
- `components/NuanceWarning.tsx`
- `lib/conjugator.ts`（生成ロジック）
- `data/verbs.ts`
- `data/sentences.ts`
- `types.ts`

---

## 8. 受け入れ条件（Acceptance Criteria）
1) 例文を選ぶ → 時制・完了・進行・未来モードを切り替える → 英文が正しく変わる  
2) `It is raining / It has been raining / It will have rained` 等が生成できる  
3) `will` と `be going to` と `progFuture` の比較が Compare で並べられる  
4) `know` や 所有 `have` で進行形ONにすると警告が出る  
5) 生成ロジックがUIから分離され、型が破綻していない

---

## 9. 実装のコツ（指示）
- まず `conjugator.ts` を最初に作って、ユニットテスト（簡易でもOK）で主要パターンを通す
- その後UIを作る
- ハイライトは「トークン化」して、助動詞/aux/verbの部分だけ `<mark>` 的に囲う方式でOK

---

## 10. 最後に
MVPは“教材として成立すること”が最優先。  
見た目はシンプルでいいが、**差分ハイライト**と**一言ニュアンス**は妥協しないこと。

以上の仕様で、実装一式を生成してください。
