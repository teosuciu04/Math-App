import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppButton } from "../ui/app-button";
import { AppModal } from "../ui/app-modal";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export function ExitQuizModal({ visible, onClose }: Props) {
  const handleExit = () => {
    onClose();
    router.replace("/(tabs)");
  };

  return (
    <AppModal visible={visible} onClose={onClose} title="Abandonezi testul?">
      <Ionicons name="warning-outline" size={48} color="#FF4444" />
      <Text style={styles.modalSub}>
        Progresul tău actual va fi pierdut definitiv.
      </Text>

      <View style={styles.modalActions}>
        <AppButton
          title="Continuă testul"
          onPress={onClose}
          style={styles.modalBtn}
        />
        <AppButton
          title="Da, abandonează"
          variant="outline"
          onPress={handleExit}
          style={[styles.modalBtn, styles.exitOutline]}
        />
      </View>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  modalSub: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginVertical: 15,
    lineHeight: 22,
  },
  modalActions: { width: "100%", gap: 12 },
  modalBtn: { width: "100%" },
  exitOutline: { borderColor: "#FF4444" },
});
