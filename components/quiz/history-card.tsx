import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HistoryCardProps {
  session: any;
  onPress: (session: any) => void;
}

export function HistoryCard({ session, onPress }: HistoryCardProps) {
  const date = new Date(session.completed_at).toLocaleDateString("ro-RO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const scoreVal = parseFloat(session.score_percentage) || 0;
  const isGoodScore = scoreVal >= 70;

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(session)}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{session.title || "Test Antrenament"}</Text>
        <View
          style={[
            styles.scoreBadge,
            { backgroundColor: isGoodScore ? "#E8F5E9" : "#FFEBEE" },
          ]}
        >
          <Text
            style={[
              styles.scoreText,
              { color: isGoodScore ? "#2E7D32" : "#C62828" },
            ]}
          >
            {scoreVal.toFixed(0)}%
          </Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <Ionicons name="calendar-outline" size={16} color="#666" />
        <Text style={styles.dateText}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    marginRight: 10,
  },
  scoreBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  scoreText: { fontWeight: "bold", fontSize: 14 },
  cardFooter: { flexDirection: "row", alignItems: "center", gap: 5 },
  dateText: { color: "#666", fontSize: 14 },
});
