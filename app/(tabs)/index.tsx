import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppButton } from "../../components/ui/app-button";
import { CircularProgress } from "../../components/ui/circular-progress"; // <-- Import it!
import { GradeSelector } from "../../components/ui/grade-selector";
import { useDashboard } from "../../hooks/use-dashboard";

export default function HomeScreen() {
  const { grade, loading, progressData, handleGradeChange } = useDashboard();

  if (loading) {
    return (
      <SafeAreaView style={styles.center} edges={["top"]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Salut!</Text>
          <Text style={styles.subtitle}>Ești gata de învățat?</Text>
        </View>
        <GradeSelector currentGrade={grade} onSelectGrade={handleGradeChange} />
      </View>

      <View style={styles.content}>
        {/* THE NEW DASHBOARD CIRCLES */}
        <View style={styles.dashboard}>
          {/* Big Master Circle */}
          <CircularProgress
            percentage={progressData?.overall?.percentage || 0}
            radius={75}
            strokeWidth={16}
            title="Progres Total"
          />

          {/* Smaller Subject Circles */}
          <View style={styles.subCirclesContainer}>
            <CircularProgress
              percentage={progressData?.algebra?.percentage || 0}
              radius={45}
              strokeWidth={10}
              title="Algebră"
            />
            <CircularProgress
              percentage={progressData?.geometry?.percentage || 0}
              radius={45}
              strokeWidth={10}
              title="Geometrie"
            />
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <AppButton
          title="Începe un Test Nou"
          onPress={() => router.push("/customize-test")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  greeting: { fontSize: 28, fontWeight: "bold", color: "#333" },
  subtitle: { fontSize: 16, color: "#666", marginTop: 4 },
  content: { flex: 1, padding: 20 },
  footer: { padding: 20, backgroundColor: "#f8f9fa" },

  /* New Dashboard Layout Styles */
  dashboard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 40, // Space between top circle and bottom circles
  },
  subCirclesContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around", // Spaces Algebra and Geometry evenly
  },
});
