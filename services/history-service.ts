import { supabase } from "../lib/supabase";

export const HistoryService = {
  async getQuizHistory() {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) return [];

    const { data, error } = await supabase
      .from("quiz_sessions")
      .select("*")
      .eq("user_id", user.id)
      .order("completed_at", { ascending: false });

    if (error) {
      console.error("History fetch error:", error);
      return [];
    }
    return data;
  },
};
