# クイズ配信SPA (React + TypeScript + Vite)

このプロジェクトは **React + TypeScript + Vite** で構築した**シングルページアプリケーション (SPA)** です。  
ローカルの **Mock API** からクイズ問題を取得し、ユーザーが回答を選択して答え合わせができます。  
答え合わせ後は選択肢を変更できないように制御しています。

---

## 主な機能
- 🎯 クイズの出題と選択肢表示
- ✅ 回答後の選択肢ロック機能
- ⚡ Viteによる高速開発環境（HMR対応）
- 📦 Expressを利用したローカルMock API

---

## アーキテクチャ構成図

```mermaid
graph TD
    subgraph ブラウザ
        A[React SPA<br>(Vite + TypeScript)]
    end
    subgraph ローカル開発環境
        B[Mock API<br>(Express + TypeScript)]
    end
    A -->|HTTP GET /quizzes| B
    A -->|HTTP GET /quizzes/:id/answer| B
```

> 将来的には、このMock API部分を **AWS API Gateway + Lambda + DynamoDB** に置き換えることで、サーバーレス構成に移行可能です。

---

## ディレクトリ構成
```
project-root/
├── api/
│   └── mock-api.ts    # Mock APIサーバー（Express）
├── src/
│   ├── App.tsx        # メインReactアプリ
│   ├── components/    # Reactコンポーネント
│   └── ...
├── package.json
└── README.md
```

---

## 動作環境
- Node.js **v20.19.0** 以上（macOSの場合は `nvm` 推奨）
- npm **v10.x** 以上

---

## セットアップ手順

```bash
# 1. 依存パッケージをインストール
npm install

# 2. Mock API用の依存パッケージを追加
npm install express cors --save
npm install @types/express @types/cors --save-dev
```

---

## 実行方法

### React開発サーバーの起動
```bash
npm run dev
```

### Mock APIの起動
```bash
npm run mock-api
```
Mock APIは [http://localhost:3001](http://localhost:3001) で動作します。

利用可能なエンドポイント:
- `/quizzes` → クイズ一覧（答えは含まれない）
- `/quizzes/:id/answer` → 特定クイズの答え取得

### ReactとMock APIを同時に起動
```bash
npm run dev:all
```
(`dev:all` は **concurrently** を使用して同時起動します)

---

## `package.json` のスクリプト例
```json
{
  "scripts": {
    "dev": "vite",
    "mock-api": "ts-node api/mock-api.ts",
    "dev:all": "concurrently \"npm run mock-api\" \"npm run dev\""
  }
}
```

---

## ビルド
```bash
npm run build
```
出力は `dist/` フォルダに作成されます。

---

## Lint
本プロジェクトには ESLint 設定が含まれています。  
型チェックを強化したい場合は、Viteのドキュメントを参考に設定を拡張してください。

---

## 今後の拡張案
- AWS API Gateway + Lambdaとの統合
- DynamoDBにクイズデータ保存
- S3に画像を保存して画像付きクイズに対応
