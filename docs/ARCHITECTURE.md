# アーキテクチャ設計書 (Verb Tenses Trainer)

## 1. 概要
本プロジェクトは React + TypeScript + Vite + Tailwind CSS で構築されたシングルページアプリケーション（SPA）です。
「時制（Tense: 過去/現在/未来）」と「相（Aspect: 完了/進行）」を独立して操作し、英語の動詞表現のニュアンス変化を体感的に学習することを目的としています。

## 2. コア設計指針

### 2.1 ロジックとUIの分離
- **活用ロジック** (`lib/conjugator.ts`) は、UIコンポーネントから完全に分離されています。
- `SentenceTemplate`（文の雛形）と、状態（時制、相、未来モード）を入力として受け取り、`ConjugatedResult`（トークン列 + 警告情報）を返します。
- これにより、ロジック単体でのテストが容易になり、将来的なプラットフォーム拡張にも対応しやすくなっています。

### 2.2 データ駆動アプローチ
- **データベース不要**: すべてのコンテンツは静的な TypeScript ファイル (`data/verbs.ts`, `data/sentences.ts`) として管理されています。
- **テンプレート方式**: 例文は、動詞・主語・目的語などを「穴埋め」可能なテンプレートとして定義されており、文法ルールに基づいてエンジンが動的に文を再構築します。

### 2.3 トークンベースのレンダリング
- 生成エンジンは単純な文字列ではなく、「トークン」の配列 (`{ text: string, kind: 'aux'|'verb'|... }`) を返します。
- これにより、UI上での**きめ細やかなハイライト表示**（助動詞を赤系、本動詞を青系にする等）を実現し、学習者が文構造の変化を瞬時に視覚的に理解できるよう設計されています。

### 2.4 コンポーネント駆動UI
- **Tailwind CSS**: 全てのスタイリングはTailwindのユーティリティクラスで実装し、デザインシステムの一貫性を保証。
- **再利用可能なUIキット** (`components/ui/`): Card, Badge, SectionHeaderなど、プロジェクト全体で統一されたデザインコンポーネント。
- **cn()ユーティリティ** (`lib/cn.ts`): `clsx`と`tailwind-merge`を組み合わせ、条件付きクラス名の管理とTailwindクラスの競合解決を実現。

## 3. ディレクトリ構成

```
verb-tenses-trainer/
├── src/
│   ├── components/       # UIコンポーネント
│   │   ├── ui/           # 再利用可能なUIコンポーネント
│   │   │   ├── Card.tsx          # カードコンテナ（Header, Content, Footer）
│   │   │   ├── Badge.tsx         # バッジ（3バリアント: default, muted, outline）
│   │   │   └── SectionHeader.tsx # セクションヘッダー（アイコン + タイトル + 説明）
│   │   ├── Header.tsx            # グローバルヘッダー（ナビゲーション + ダークモードトグル）
│   │   ├── SentencePicker.tsx    # 例文選択UI
│   │   ├── TenseControls.tsx     # 時制・相・未来モード選択UI
│   │   ├── GeneratedSentence.tsx # 生成された文の表示（トークンハイライト付き）
│   │   ├── NuanceNote.tsx        # ニュアンス説明カード
│   │   └── StateSummary.tsx      # 現在の状態サマリ（Badge表示）
│   ├── pages/            # ページコンポーネント
│   │   ├── TrainerPage.tsx       # メイントレーニング画面
│   │   ├── ComparePage.tsx       # 未来表現比較画面
│   │   └── FutureGuidePage.tsx   # 未来表現ガイド
│   ├── data/             # 静的データ
│   │   ├── verbs.ts              # 動詞辞書（活用形 + 進行形可否情報）
│   │   └── sentences.ts          # 例文テンプレート（主語 + 動詞 + ニュアンス説明）
│   ├── domain/           # 型定義
│   │   └── types.ts              # TypeScript型定義（Tense, Aspect, Token等）
│   ├── lib/              # コアロジック・ユーティリティ
│   │   ├── conjugator.ts         # 活用エンジン（文生成ロジック）
│   │   └── cn.ts                 # Tailwindクラス結合ユーティリティ
│   ├── App.tsx           # ルーティング設定とレイアウト
│   ├── main.tsx          # エントリポイント
│   └── index.css         # グローバルスタイル（Tailwind directives）
├── docs/
│   └── ARCHITECTURE.md   # 本ドキュメント
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions CI/CD設定
├── package.json
├── vite.config.ts        # Vite設定（GitHub Pages base path含む）
├── tailwind.config.js    # Tailwind CSS設定
└── tsconfig.json         # TypeScript設定
```

## 4. 新しいページ・メニュー項目の追加方法

新しいページや機能を追加する際は、以下の手順に従ってください。

### 4.1 ページコンポーネントの作成
1. `src/pages/` に新しいページコンポーネントを作成（例: `PracticeModePage.tsx`）
   ```tsx
   export function PracticeModePage() {
     return (
       <div className="max-w-4xl mx-auto">
         <h2 className="text-3xl font-bold mb-6">Practice Mode</h2>
         {/* ページコンテンツ */}
       </div>
     );
   }
   ```

### 4.2 ルーティングの追加
1. `src/App.tsx` のimport文に新しいページを追加
   ```tsx
   import { PracticeModePage } from './pages/PracticeModePage';
   ```

2. `<Routes>` 内に新しいルートを追加
   ```tsx
   <Route path="/practice" element={<PracticeModePage />} />
   ```

### 4.3 ヘッダーメニューの追加
1. `src/components/Header.tsx` の `navLinks` 配列に新しいリンクを追加
   ```tsx
   const navLinks = [
     { to: '/', label: 'Trainer' },
     { to: '/compare', label: 'Compare' },
     { to: '/future', label: 'Guide' },
     { to: '/practice', label: 'Practice' }, // 新規追加
   ];
   ```

これだけで、デスクトップ・モバイル両方のナビゲーションに自動的に追加されます。
ハンバーガーメニューや現在のページハイライトも自動的に動作します。

## 5. 重要な決定事項とトレードオフ

### 5.1 ニュアンスの単純化
厳密には「過去完了」などは時制と相の組み合わせですが、MVP（Minimum Viable Product）では、学習者に分かりやすく提示するため、主にアスペクト（相）に基づくニュアンス（例：「完了形 ＝ 完了/結果」）を優先してマッピングしています。

### 5.2 未来表現の扱い
未来（Future）は時制の一つとして扱いつつ、英語特有の多様な表現（will / be going to / 進行形など）をカバーするため、「Future Mode」という概念を導入しています。

### 5.3 警告（Warning）システム
「状態動詞の進行形」など、文法的に不自然な組み合わせを選択させないのではなく、「生成した上で警告を表示する」方針を採用しました。これにより、「なぜそれが不自然なのか」を学習者が理解できる教育的効果を狙っています。

### 5.4 Tailwind CSS採用の理由
- **一貫性**: デザインシステムが統一され、異なる開発者間でもスタイルの一貫性を保てる
- **保守性**: クラス名の命名に悩まず、ユーティリティクラスで直感的にスタイリング可能
- **ダークモード**: `dark:` プレフィックスで簡単にダークモード対応が可能
- **レスポンシブ**: `md:`, `lg:` などのプレフィックスでブレークポイント管理が容易

## 6. レスポンシブデザイン

### デスクトップ (md以上)
- **2カラムレイアウト**: 左側に入力コントロール、右側に出力結果を配置
- **Sticky Output**: 右側の出力カラムは画面をスクロールしても固定表示
- **フルメニュー表示**: ヘッダーに全てのナビゲーションリンクを横並びで表示

### モバイル (mdより小さい)
- **縦スタックレイアウト**: 全てのコンテンツを縦に配置
- **ハンバーガーメニュー**: ナビゲーションは開閉式メニューに格納
- **タッチ最適化**: タップしやすい大きめのボタンとパディング

### ダークモード
- **システム全体対応**: 全コンポーネントが `dark:` クラスでダークモード対応
- **ユーザー制御**: ヘッダーのトグルボタンで手動切り替え可能
- **カラーパレット**: Slate系をベースに、Indigo系をアクセントカラーとして使用

## 7. 開発時の注意事項

### スタイリング規約
- **Tailwindクラスのみ使用**: カスタムCSSは `index.css` の `@layer` directive内のみに限定
- **cn()の使用**: 条件付きクラス名は必ず `cn()` ユーティリティを使用してマージ
- **カラー統一**: Slate (グレー系), Indigo (プライマリ), Emerald/Amber/Red (状態表示) のみ使用

### コンポーネント作成規約
- **単一責任**: 各コンポーネントは1つの明確な役割のみを持つ
- **Props型定義**: 全てのPropsに対して明示的な型定義を行う
- **再利用性**: 3回以上繰り返すコードは `components/ui/` に切り出す

### データ追加方法
- **動詞の追加**: `src/data/verbs.ts` に `VerbForms` オブジェクトを追加
- **例文の追加**: `src/data/sentences.ts` に `SentenceTemplate` オブジェクトを追加
- **型安全**: TypeScriptの型システムが自動的に不足フィールドを検出

## 8. 今後の改善案

### 機能拡張
- **動詞検索機能**: 大量の動詞を扱う場合の検索UI
- **カスタム例文**: ユーザーが自分で動詞を入力して試せるモード
- **進捗保存**: LocalStorageを使った学習進捗の保存機能

### UX改善
- **アニメーション強化**: トークンハイライトやページ遷移時のスムーズなアニメーション
- **音声読み上げ**: Web Speech APIを使った英文の音声読み上げ機能
- **チュートリアル**: 初回訪問時のガイドツアー

### 技術的改善
- **テスト追加**: `conjugator.ts` のユニットテスト、E2Eテスト
- **パフォーマンス**: React.memoやuseMemoの最適化
- **アクセシビリティ**: ARIA属性の追加、キーボードナビゲーション対応

---

**このドキュメントは、Antigravityや他の開発者が本プロジェクトの設計思想を理解し、一貫性を保ちながら機能拡張できるよう作成されています。新規機能追加時は必ず本ドキュメントを参照してください。**
