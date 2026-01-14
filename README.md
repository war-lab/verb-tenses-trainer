# Verb Tenses Trainer (英語時制学習アプリ)

英語の時制（Tense）とアスペクト（Aspect）を組み合わせて、そのニュアンスの違いをリアルタイムに体感するための学習アプリケーションです。

## 機能 (Features)
- **Trainer Mode (12-Cell Matrix)**: 20種類以上の例文に対し、3つの時制（過去/現在/未来）と4つのアスペクト（基本/完了/進行/完了進行）を自在に組み合わせた**全12パターン**の学習が可能です。
- **Training Mode (Practice)**: 出題された状況（Situation）に対して最適な時制・相を選ぶ実践モード。正誤判定だけでなく、「なぜその答えなのか（Rule of Thumb）」や「なぜ惜しいのか」を即座にフィードバックします。
- **Pedagogical Nuances**: 単なる動詞の変化だけでなく、各組み合わせに応じた「シチュエーション解説」「自然な和訳」「文法のポイント（Why?）」をリアルタイムに表示します。
- **Future Dimension**: 未来表現では `will` (4つのニュアンス), `be going to`, `about to` などを切り替え、アスペクトと組み合わせることで英語特有の時間感覚を深く学べます。
- **Compare Mode**: 未来表現や類似した構造を並べて比較し、微妙なニュアンスの違いを視覚的に理解します。
- **Future Guide**: 迷いやすい未来表現の使い分けについて、体系的な解説を提供。
- **ダークモード & レスポンシブ**: モダンで快適な学習環境をあらゆるデバイスで提供。

## 技術スタック (Tech Stack)
- React
- TypeScript
- Vite
- React Router
- Tailwind CSS v3 (スタイリング)
- Lucide React (アイコン)
- GitHub Actions (for Deployment)

## 開発の始め方 (Getting Started)

### 前提条件
- Node.js (v18以上推奨)

### インストール
```bash
git clone <repository-url>
cd verb-tenses-trainer
npm install
```

### ローカル実行
```bash
npm run dev
```
ブラウザで `http://localhost:5173` を開いてください。

## アーキテクチャ
詳細な設計思想については [docs/ARCHITECTURE_ja.md](docs/ARCHITECTURE_ja.md) (日本語) または [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) (English) を参照してください。

## デプロイ (Deployment)
このリポジトリは GitHub Actions を使用して、`main` ブランチへのプッシュ時に自動的に GitHub Pages へデプロイされる構成になっています。
設定ファイル: `.github/workflows/deploy.yml`
