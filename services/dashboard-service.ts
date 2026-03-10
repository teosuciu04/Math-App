import { Chapter, Grade } from "@/types/quiz";
import { supabase } from "../lib/supabase";

export const DashboardService = {
  async getGrades() {
    return await supabase
      .from("grades")
      .select("*")
      .order("id")
      .returns<Grade[]>();
  },

  async getChapters(gradeId: number) {
    return await supabase
      .from("chapters")
      .select("*")
      .eq("grade_id", gradeId)
      .returns<Chapter[]>();
  },

  async getHomeDashboardProgress(gradeId: number) {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) return null;

    const { data, error } = await supabase.rpc("get_home_dashboard_progress", {
      p_user_id: user.id,
      p_grade_id: gradeId,
    });

    if (error) {
      console.error("Dashboard Progress Error:", error);
      return null;
    }
    return data;
  },

  async getChapterProgress(gradeId: number) {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) return [];

    const { data, error } = await supabase.rpc("get_chapter_progress", {
      p_user_id: user.id,
      p_grade_id: gradeId,
    });

    if (error) {
      console.error("Chapter Progress Error:", error);
      return [];
    }
    return data;
  },

  async getUserGrade(): Promise<number> {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) return 8;

    const { data, error } = await supabase
      .from("profiles")
      .select("last_selected_grade")
      .eq("id", user.id)
      .single();

    if (error || !data?.last_selected_grade) return 8;
    return data.last_selected_grade;
  },

  async updateUserGrade(grade: number) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from("profiles")
      .update({ last_selected_grade: grade })
      .eq("id", user.id);
  },
};
