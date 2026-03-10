import { Question, QuizResult } from "@/types/quiz";
import { supabase } from "../lib/supabase";

export const QuizService = {
  async getQuestions(chapterIds: number[], limit: number) {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) throw new Error("Nu ești autentificat!");

    const { data, error } = await supabase.rpc("generate_smart_quiz", {
      p_user_id: user.id,
      p_chapter_ids: chapterIds,
      p_limit: limit,
    });

    if (error) {
      console.error("Smart Quiz Generation Error:", error);
      return { data: null, error };
    }

    return { data: data as Question[], error: null };
  },

  async getTotalCount(chapterIds: number[]) {
    const { count } = await supabase
      .from("questions")
      .select("*", { count: "exact", head: true })
      .in("chapter_id", chapterIds);
    return count || 0;
  },

  async verifyOnBackend(
    questions: Question[],
    userAnswers: Record<string, string>,
  ): Promise<QuizResult> {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error("Nu ești autentificat!");
    }

    const questionIds = questions.map((q) => q.id);

    const fullQuizData = questions.map((q) => ({
      ...q,
      user_answer: userAnswers[q.id] || null,
    }));

    const { data, error } = await supabase.rpc("verify_quiz_results", {
      p_user_id: user.id,
      p_title: "Test de Antrenament",
      p_grade_id: 8,
      p_user_answers: userAnswers,
      p_question_ids: questionIds,
      p_full_quiz_data: fullQuizData,
    });

    if (error) {
      console.error("Supabase RPC Error:", error);
      throw error;
    }

    return data as QuizResult;
  },
};
