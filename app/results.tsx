import { EvalDetail, Question } from "@/types/quiz";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppButton } from "../components/ui/app-button";
import { useResults } from "../hooks/use-results";

export default function ResultsScreen() {
  const { evalData, qList, uAns, showDetails, setShowDetails } = useResults();

  if (!evalData) return null;

  // Helper: Renders each question result card
  const renderDetailCard = (q: Question) => {
    const detail = evalData.details.find(
      (d: EvalDetail) => d.question_id === q.id,
    );
    if (!detail) return null;

    const isCorrect = detail.is_correct;
    const userProvidedAnswer = uAns[q.id];

    return (
      <View
        key={q.id}
        style={[styles.card, isCorrect ? styles.correct : styles.wrong]}
      >
        <Text style={styles.qContent}>{q.content}</Text>
        <Text style={styles.userAns}>
          Răspunsul tău:{" "}
          <Text style={{ fontWeight: "600" }}>
            {userProvidedAnswer && userProvidedAnswer.trim() !== ""
              ? userProvidedAnswer
              : "Nespecificat (Omis)"}
          </Text>
        </Text>
        {!isCorrect && (
          <View style={styles.correctionBox}>
            <Text style={styles.correctLabel}>
              Răspuns corect: {detail.correct_answer}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text style={styles.scoreTitle}>Rezultat Final</Text>

        <View style={styles.scoreBox}>
          <Text style={styles.bigNum}>
            {evalData.score} / {evalData.total}
          </Text>
          <Text style={styles.scoreSub}>întrebări corecte</Text>
        </View>

        <TouchableOpacity
          onPress={() => setShowDetails(!showDetails)}
          style={styles.viewToggle}
        >
          <Text style={styles.link}>
            {showDetails
              ? "Ascunde detaliile"
              : "Vezi întrebările și răspunsurile"}
          </Text>
        </TouchableOpacity>

        {showDetails && (
          <View style={styles.detailsList}>{qList.map(renderDetailCard)}</View>
        )}

        <AppButton
          title="Pagina Principală"
          onPress={() => router.replace("/(tabs)")}
          style={styles.homeBtn}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  correctionBox: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(220, 53, 69, 0.1)", // Light red separator
  },
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, padding: 20 },
  scoreTitle: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
  },
  scoreBox: { alignItems: "center", marginVertical: 30 },
  bigNum: { fontSize: 64, fontWeight: "bold", color: "#4A90E2" },
  scoreSub: { fontSize: 16, color: "#888", marginTop: 0 },
  viewToggle: { marginBottom: 20 },
  link: {
    textAlign: "center",
    color: "#4A90E2",
    fontSize: 16,
    fontWeight: "600",
  },
  detailsList: { marginBottom: 20 },
  card: { padding: 15, borderRadius: 12, marginVertical: 6, borderWidth: 1.5 },
  correct: { borderColor: "#28a745", backgroundColor: "#f0fff4" },
  wrong: { borderColor: "#dc3545", backgroundColor: "#fff5f5" },
  qContent: { fontWeight: "bold", fontSize: 16, marginBottom: 5 },
  userAns: { color: "#555" },
  correctLabel: { color: "#28a745", fontWeight: "bold", marginTop: 5 },
  homeBtn: { marginTop: 10 },
});
