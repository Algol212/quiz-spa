import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItemButton,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Box
} from "@mui/material";

type Quiz = {
  id: number;
  question: string;
  options: string[];
};

export default function App() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answer, setAnswer] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/quizzes")
      .then(res => res.json())
      .then(data => setQuizzes(data))
      .catch(err => console.error("クイズ取得エラー:", err));
  }, []);

  const handleSelectQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setSelectedOption(null);
    setAnswer(null);
  };

  const handleCheckAnswer = () => {
    if (!selectedQuiz) return;
    fetch(`http://localhost:3001/quizzes/${selectedQuiz.id}/answer`)
      .then(res => res.json())
      .then(data => setAnswer(data.answer))
      .catch(err => console.error("答え取得エラー:", err));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        クイズアプリ（MUI版）
      </Typography>

      {!selectedQuiz && (
        <>
          <Typography variant="h6" gutterBottom>
            クイズ一覧
          </Typography>
          <List>
            {quizzes.map(quiz => (
              <ListItemButton
                key={quiz.id}
                onClick={() => handleSelectQuiz(quiz)}
              >
                {quiz.question}
              </ListItemButton>
            ))}
          </List>
        </>
      )}

      {selectedQuiz && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {selectedQuiz.question}
            </Typography>
            <RadioGroup
              value={selectedOption}
              onChange={(e) => setSelectedOption(Number(e.target.value))}
            >
              {selectedQuiz.options.map((option, idx) => (
                <FormControlLabel
                  key={idx}
                  value={idx}
                  control={<Radio />}
                  label={option}
                  disabled={answer !== null} // 答え合わせ後は選択肢を変更できない
                />
              ))}
            </RadioGroup>

            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                onClick={handleCheckAnswer}
                disabled={selectedOption === null}
              >
                答え合わせ
              </Button>
              <Button
                variant="outlined"
                onClick={() => setSelectedQuiz(null)}
              >
                戻る
              </Button>
            </Box>

            {answer !== null && (
              <Typography
                variant="body1"
                sx={{ mt: 2, color: answer === selectedOption ? "green" : "red" }}
              >
                {answer === selectedOption ? "✅ 正解！" : "❌ 不正解..."}
              </Typography>
            )}
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
