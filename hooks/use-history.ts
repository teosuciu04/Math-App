import { HistoryService } from "@/services/history-service";
import { router } from "expo-router";
import { useEffect, useState } from "react";

export function useHistory() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    const data = await HistoryService.getQuizHistory();
    setSessions(data);
    setLoading(false);
  };

  const reviewTest = (session: any) => {
    // Business logic isolated here!
    const questions = session.quiz_data || [];
    const userAnswers: Record<string, string> = {};
    let score = 0;

    const details = questions.map((q: any) => {
      userAnswers[q.id] = q.user_answer;

      const isCorrect =
        q.user_answer &&
        q.user_answer.toLowerCase().trim() ===
          q.correct_answer.toLowerCase().trim();

      if (isCorrect) score++;

      return {
        question_id: q.id,
        is_correct: isCorrect,
        correct_answer: q.correct_answer,
        user_answer: q.user_answer || "",
      };
    });

    const backendData = { score, total: questions.length, details };

    router.push({
      pathname: "/results",
      params: {
        backendData: JSON.stringify(backendData),
        questions: JSON.stringify(questions),
        userAnswers: JSON.stringify(userAnswers),
      },
    });
  };

  return {
    sessions,
    loading,
    reviewTest,
  };
}
