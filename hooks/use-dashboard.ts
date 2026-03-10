import { useEffect, useState } from "react";
import { DashboardService } from "../services/dashboard-service";

export function useDashboard() {
  const [grade, setGrade] = useState<number>(8); // Default to 8
  const [loading, setLoading] = useState(true);
  const [progressData, setProgressData] = useState<any>(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    // 1. Get the remembered grade
    const savedGrade = await DashboardService.getUserGrade();
    setGrade(savedGrade);

    // 2. Fetch the progress stats for that specific grade
    await fetchStats(savedGrade);

    setLoading(false);
  };

  const fetchStats = async (gradeId: number) => {
    const stats = await DashboardService.getHomeDashboardProgress(gradeId);
    setProgressData(stats);
  };

  const handleGradeChange = async (newGrade: number) => {
    setLoading(true);
    setGrade(newGrade);

    // 1. Save it to memory
    await DashboardService.updateUserGrade(newGrade);
    // 2. Fetch the new progress rings for the newly selected grade!
    await fetchStats(newGrade);

    setLoading(false);
  };

  return {
    grade,
    loading,
    progressData,
    handleGradeChange,
  };
}
