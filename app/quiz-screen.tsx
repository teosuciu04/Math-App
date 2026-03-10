import { Ionicons } from "@expo/vector-icons";
import { Stack, router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ExitQuizModal } from "../components/quiz/exit-quiz-modal"; // New
import { AppButton } from "../components/ui/app-button";
import { AppInput } from "../components/ui/app-input"; // New
import { usePreventBack } from "../hooks/use-prevent-back"; // New
import { useQuiz } from "../hooks/use-quiz";

export default function QuizScreen() {
  const { ids, limit } = useLocalSearchParams();
  const [showExitModal, setShowExitModal] = useState(false);

  const {
    questions,
    index,
    setIndex,
    answers,
    loading,
    handleChoice,
    submitQuiz,
    currentQuestion,
    isLastQuestion,
  } = useQuiz(ids as string, limit as string);

  usePreventBack(!loading, () => setShowExitModal(true));

  // This prevents the options from re-calculating unless the question or current answer changes
  const questionContent = useMemo(() => {
    if (!currentQuestion) return null;

    if (currentQuestion.type === "fill_in") {
      return (
        <AppInput
          placeholder="Introduceți răspunsul..."
          value={answers[currentQuestion.id] || ""}
          onChangeText={(t) => handleChoice(currentQuestion.id, t, false)}
          autoCapitalize="none"
        />
      );
    }

    return (
      <View style={styles.optionsContainer}>
        {currentQuestion.options?.map((opt: string) => {
          const selected = (answers[currentQuestion.id] || "")
            .split(",")
            .includes(opt);
          const isMulti = currentQuestion.type === "multiple_choice";

          return (
            <TouchableOpacity
              key={opt}
              style={[styles.opt, selected && styles.optSelected]}
              onPress={() => handleChoice(currentQuestion.id, opt, isMulti)}
              activeOpacity={0.7} // Added for better touch feel
            >
              <Text
                style={[styles.optLabel, selected && styles.optLabelSelected]}
              >
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }, [currentQuestion, answers, handleChoice]);

  // --- RENDERING GUARDS ---

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Se încarcă întrebările...</Text>
      </View>
    );
  }

  if (!questions || questions.length === 0 || !currentQuestion) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ marginBottom: 20 }}>Nu am găsit întrebări.</Text>
        <AppButton title="Înapoi" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* 2. ADD THIS BLOCK: It disables the iOS swipe gesture for this screen */}
      <Stack.Screen
        options={{
          gestureEnabled: false, // Disables iOS swipe back
          headerShown: false, // Hides the default native header
        }}
      />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setShowExitModal(true)}
          style={styles.exitBtn}
        >
          <Ionicons name="close-circle-outline" size={26} color="#FF4444" />
          <Text style={styles.exitText}>Abandonează</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.progress}>
          {index + 1} / {questions.length}
        </Text>
        <Text style={styles.qText}>{currentQuestion.content}</Text>
        {/* Render the memoized input or options */}
        {questionContent}
      </View>

      <View style={styles.nav}>
        <AppButton
          title="Înapoi"
          variant="outline"
          onPress={() => setIndex(index - 1)}
          disabled={index === 0}
          style={styles.navBtn}
        />

        <AppButton
          title={isLastQuestion ? "Trimite" : "Înainte"}
          variant={isLastQuestion ? "secondary" : "primary"}
          onPress={isLastQuestion ? submitQuiz : () => setIndex(index + 1)}
          style={styles.navBtn}
        />
      </View>
      <ExitQuizModal
        visible={showExitModal}
        onClose={() => setShowExitModal(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  exitBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6, // Space between the icon and the text
    padding: 5,
  },
  exitText: {
    color: "#FF4444",
    fontWeight: "700",
    fontSize: 14,
  },
  container: { flex: 1, backgroundColor: "#ffffff" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: { marginTop: 10, color: "#4A90E2", fontWeight: "500" },
  innerContainer: { flex: 1, padding: 25, justifyContent: "center" },
  progress: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginBottom: 20,
  },
  qText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#000",
  },
  optionsContainer: { gap: 10 },
  opt: {
    padding: 16,
    borderWidth: 1.5, // Slightly thicker for better visibility
    borderRadius: 12,
    borderColor: "#eee",
    backgroundColor: "#f9f9f9",
  },
  optSelected: { backgroundColor: "#4A90E2", borderColor: "#4A90E2" },
  optLabel: { fontSize: 16, color: "#333" },
  optLabelSelected: { color: "#fff", fontWeight: "bold" },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 25,
    gap: 15,
  },
  navBtn: { flex: 1 },
});
