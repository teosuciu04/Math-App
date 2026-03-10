import { Question } from "@/types/quiz";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { QuizService } from "../services/quiz-service";
import { QuizUtils } from "../utils/quiz-logic";

export function useQuiz(ids: string, limit: string) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Safety Guard: Don't fetch if params are missing
    if (!ids || !limit) return;

    const loadQuestions = async () => {
      setLoading(true);
      try {
        const chapterIds = String(ids).split(",").map(Number);
        const requestedLimit = Number(limit);

        // 1. Pass both chapterIds AND the requestedLimit to the service
        const { data, error } = await QuizService.getQuestions(
          chapterIds,
          requestedLimit,
        );

        if (error) throw error;

        if (data) {
          // 2. The database already did the distributing, limiting, and shuffling!
          // We just set the state directly.
          setQuestions(data);
        }
      } catch (err) {
        console.error("Quiz Loading Error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [ids, limit]); // Only re-run if these specific values change

  const currentQuestion: Question | null = questions[index] || null;

  const handleChoice = useCallback(
    (qId: string, val: string, isMulti: boolean) => {
      setAnswers((prev) => {
        const current = prev[qId] || "";
        const updated = isMulti ? QuizUtils.toggleSelection(current, val) : val;
        return { ...prev, [qId]: updated };
      });
    },
    [],
  );

  const submitQuiz = async () => {
    setLoading(true);
    try {
      // 1. Delegate the database work entirely to our upgraded Service!
      const results = await QuizService.verifyOnBackend(questions, answers);

      // 2. Navigate to results using 'replace' so the user cannot swipe back into the test
      router.replace({
        pathname: "/results",
        params: {
          backendData: JSON.stringify(results),
          questions: JSON.stringify(questions),
          userAnswers: JSON.stringify(answers),
        },
      });
    } catch (e: any) {
      console.error("Submit Error:", e);
      alert(e.message || "Eroare la procesarea testului!");
    } finally {
      setLoading(false);
    }
  };

  return {
    questions,
    index,
    setIndex,
    answers,
    loading,
    handleChoice,
    submitQuiz,
    currentQuestion,
    isLastQuestion: index === questions.length - 1,
  };
}
