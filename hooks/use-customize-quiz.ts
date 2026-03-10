import { DashboardService } from "@/services/dashboard-service";
import { Chapter, Grade } from "@/types/quiz";
import { useEffect, useState } from "react";
import { QuizService } from "../services/quiz-service";

export function useCustomizeQuiz() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [algebraChapters, setAlgebraChapters] = useState<Chapter[]>([]);
  const [geometryChapters, setGeometryChapters] = useState<Chapter[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedChapters, setSelectedChapters] = useState<number[]>([]);
  const [totalInDb, setTotalInDb] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    DashboardService.getGrades().then(({ data }) => data && setGrades(data));
  }, []);

  const selectGrade = async (gradeId: number) => {
    setSelectedGrade(gradeId);
    setSelectedChapters([]); // Reset selection when grade changes
    const { data } = await DashboardService.getChapters(gradeId);
    if (data) {
      setAlgebraChapters(data.filter((c) => c.subject === "algebra"));
      setGeometryChapters(data.filter((c) => c.subject === "geometry"));
    }
  };

  const toggleChapter = (id: number) => {
    setSelectedChapters((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const toggleAllChapters = (chapters: any[]) => {
    const chapterIds = chapters.map((c) => c.id);
    const allSelected = chapterIds.every((id) => selectedChapters.includes(id));
    if (allSelected) {
      // If all are selected, remove them
      setSelectedChapters((prev) =>
        prev.filter((id) => !chapterIds.includes(id)),
      );
    } else {
      // Otherwise, add only the ones not already selected to avoid duplicates
      setSelectedChapters((prev) => [...new Set([...prev, ...chapterIds])]);
    }
  };

  const handleStartPress = async () => {
    const count = await QuizService.getTotalCount(selectedChapters);
    setTotalInDb(count);
    setModalVisible(true);
  };

  return {
    grades,
    selectedGrade,
    selectGrade,
    algebraChapters,
    geometryChapters,
    selectedChapters,
    toggleChapter,
    toggleAllChapters,
    totalInDb,
    modalVisible,
    setModalVisible,
    handleStartPress,
  };
}
