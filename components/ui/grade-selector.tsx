import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

interface GradeSelectorProps {
  currentGrade: number;
  onSelectGrade: (grade: number) => void;
}

const GRADES = [5, 6, 7, 8];

export function GradeSelector({
  currentGrade,
  onSelectGrade,
}: GradeSelectorProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (grade: number) => {
    onSelectGrade(grade);
    setModalVisible(false);
  };

  return (
    <View>
      {/* The trigger button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Clasa a {currentGrade}-a</Text>
        <Ionicons name="chevron-down" size={20} color="#333" />
      </TouchableOpacity>

      {/* The popup menu */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.menu}>
              <Text style={styles.menuTitle}>Alege Clasa</Text>
              {GRADES.map((grade) => (
                <TouchableOpacity
                  key={grade}
                  style={[
                    styles.menuItem,
                    currentGrade === grade && styles.menuItemActive,
                  ]}
                  onPress={() => handleSelect(grade)}
                >
                  <Text
                    style={[
                      styles.menuItemText,
                      currentGrade === grade && styles.menuItemTextActive,
                    ]}
                  >
                    Clasa a {grade}-a
                  </Text>
                  {currentGrade === grade && (
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color="#007AFF"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignSelf: "flex-start",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginRight: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 16,
    padding: 20,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuItemActive: {
    backgroundColor: "#f0f8ff",
    borderRadius: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 0,
  },
  menuItemText: { fontSize: 16, color: "#333" },
  menuItemTextActive: { fontWeight: "bold", color: "#007AFF" },
});
