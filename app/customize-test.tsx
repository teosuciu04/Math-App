import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { QuestionLimitModal } from "../components/quiz/question-limit-modal";
import { SubjectSection } from "../components/quiz/subject-section";
import { AppButton } from "../components/ui/app-button";
import { useCustomizeQuiz } from "../hooks/use-customize-quiz";

export default function CustomizeTest() {
  const {
    grades,
    selectedGrade,
    selectGrade,
    algebraChapters,
    geometryChapters,
    selectedChapters,
    toggleChapter,
    toggleAllChapters,
    modalVisible,
    setModalVisible,
    totalInDb,
    handleStartPress,
  } = useCustomizeQuiz();

  const startQuiz = (limit: number) => {
    setModalVisible(false);
    router.push({
      pathname: "/quiz-screen",
      params: { ids: selectedChapters.join(","), limit: limit },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Alege clasa</Text>
      <View style={styles.gradeGrid}>
        {grades.map((g) => (
          <TouchableOpacity
            key={g.id}
            style={[styles.chip, selectedGrade === g.id && styles.activeChip]}
            onPress={() => selectGrade(g.id)}
          >
            <Text
              style={[
                styles.chipText,
                selectedGrade === g.id && styles.activeChipText,
              ]}
            >
              {g.level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scroll}>
        {selectedGrade && (
          <>
            <Text style={styles.sectionTitle}>Alege capitolele</Text>
            <SubjectSection
              title="Algebră"
              items={algebraChapters}
              selectedIds={selectedChapters}
              onToggle={toggleChapter}
              onSelectAll={() => toggleAllChapters(algebraChapters)}
            />
            <SubjectSection
              title="Geometrie"
              items={geometryChapters}
              selectedIds={selectedChapters}
              onToggle={toggleChapter}
              onSelectAll={() => toggleAllChapters(geometryChapters)}
            />
          </>
        )}
      </ScrollView>

      <AppButton
        title="Începe Testul"
        disabled={selectedChapters.length === 0}
        onPress={handleStartPress}
      />

      {/* Clean and easy to read! */}
      <QuestionLimitModal
        visible={modalVisible}
        totalAvailable={totalInDb}
        onClose={() => setModalVisible(false)}
        onSelect={startQuiz}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    marginTop: 10,
  },
  gradeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  chip: {
    width: "48%",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  activeChip: { backgroundColor: "#4A90E2", borderColor: "#4A90E2" },
  chipText: { fontWeight: "bold" },
  activeChipText: { color: "#fff" },
  scroll: { flex: 1 },
});
