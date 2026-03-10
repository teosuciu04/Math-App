import { Question, QuizResult } from "@/types/quiz";
import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";

export function useResults() {
  const { backendData, questions, userAnswers } = useLocalSearchParams();
  const [showDetails, setShowDetails] = useState(false);

  // Parse JSON data safely
  const data = useMemo(() => {
    try {
      return {
        evalData: backendData
          ? (JSON.parse(backendData as string) as QuizResult)
          : null,
        qList: questions ? (JSON.parse(questions as string) as Question[]) : [],
        uAns: userAnswers
          ? (JSON.parse(userAnswers as string) as Record<string, string>)
          : {},
      };
    } catch (e) {
      console.error("Error parsing results:", e);
      return { evalData: null, qList: [], uAns: {} };
    }
  }, [backendData, questions, userAnswers]);

  return {
    ...data,
    showDetails,
    setShowDetails,
  };
}
