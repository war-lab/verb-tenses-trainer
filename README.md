# Verb Tenses Trainer (英語時制学習アプリ)

英語の時制（Tense）とアスペクト（Aspect）を組み合わせて、そのニュアンスの違いをリアルタイムに体感するための学習アプリケーションです。

## 機能 (Features)
- **Trainer Mode**: 20種類の例文から選択し、時制（過去/現在/未来）とアスペクト（完了/進行）を自由に切り替えて、英文法構造の変化と意味合いを確認できます。
- **Compare Mode**: 未来表現（will / be going to / 進行形）など、類似した表現を並べて比較し、ニュアンスの違いを学びます。
- **Future Guide**: 迷いやすい未来表現の使い分けについての解説ガイドです。
- **ダークモード**: ヘッダーのトグルボタンでライト/ダークテーマを切り替え可能。
- **レスポンシブデザイン**: デスクトップでは2カラムレイアウト、モバイルではハンバーガーメニューで最適化された表示。

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
詳細な設計思想については [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) を参照してください。

## デプロイ (Deployment)
このリポジトリは GitHub Actions を使用して、`main` ブランチへのプッシュ時に自動的に GitHub Pages へデプロイされる構成になっています。
設定ファイル: `.github/workflows/deploy.yml`
