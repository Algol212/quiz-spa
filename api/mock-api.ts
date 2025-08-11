import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

// CORS許可（Reactからアクセスできるようにする）
app.use(cors());

// モックのクイズデータ
const quizzes = [
  {
    id: 1,
    question: "Reactの開発元はどこ？",
    options: ["Google", "Facebook (Meta)", "Microsoft", "Amazon"],
    answer: 1 // indexで指定
  },
  {
    id: 2,
    question: "JavaScriptの型定義を追加する言語は？",
    options: ["Flow", "TypeScript", "Elm", "ReasonML"],
    answer: 1
  }
];

// クイズ一覧取得
app.get("/quizzes", (req, res) => {
  res.json(quizzes.map(({ answer, ...rest }) => rest)); // 答えは送らない
});

// 特定クイズの答え取得
app.get("/quizzes/:id/answer", (req, res) => {
  const quizId = Number(req.params.id);
  const quiz = quizzes.find(q => q.id === quizId);

  if (!quiz) {
    res.status(404).json({ error: "Quiz not found" });
    return;
  }

  res.json({ answer: quiz.answer });
});

app.listen(PORT, () => {
  console.log(`Mock API is running on http://localhost:${PORT}`);
});
