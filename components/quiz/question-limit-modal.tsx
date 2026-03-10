import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { QuizUtils } from "../../utils/quiz-logic";
import { AppButton } from "../ui/app-button";
import { AppModal } from "../ui/app-modal";

interface Props {
  visible: boolean;
  totalAvailable: number;
  onClose: () => void;
  onSelect: (limit: number) => void;
}

export function QuestionLimitModal({
  visible,
  totalAvailable,
  onClose,
  onSelect,
}: Props) {
  // Use our logic helper to get the right numbers to show
  const options = QuizUtils.getValidCounts(totalAvailable);

  return (
    <AppModal
      visible={visible}
      onClose={onClose}
      title="Câte întrebări dorești?"
    >
      <Text style={styles.modalSub}>Alege lungimea testului:</Text>

      <View style={styles.optionsGrid}>
        {options.map((num) => (
          <TouchableOpacity
            key={num}
            style={styles.optionBtn}
            onPress={() => onSelect(num)}
            activeOpacity={0.7}
          >
            <Text style={styles.optionText}>
              {num === totalAvailable ? `Toate (${num})` : num}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <AppButton
        title="Anulează"
        variant="outline"
        onPress={onClose}
        style={styles.cancelBtn}
      />
    </AppModal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 24,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", color: "#2e2e2e" },
  modalSub: { fontSize: 14, color: "#888", marginBottom: 20, marginTop: 5 },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    marginBottom: 25,
  },
  optionBtn: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#f2f8ff",
    borderRadius: 14,
    minWidth: 90,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e1efff",
  },
  optionText: { fontSize: 16, fontWeight: "700", color: "#4A90E2" },
  cancelBtn: { width: "100%" },
});
