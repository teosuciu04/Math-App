import { Chapter } from "@/types/quiz";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SubjectSectionProps {
  title: string;
  items: Chapter[];
  selectedIds: number[];
  onToggle: (id: number) => void;
  onSelectAll: () => void;
}

export function SubjectSection({
  title,
  items,
  selectedIds,
  onToggle,
  onSelectAll,
}: SubjectSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Check if every item passed to this section is in the selectedIds list
  const isAllSelected =
    items.length > 0 && items.every((item) => selectedIds.includes(item.id));

  if (items.length === 0) return null;

  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity
        style={styles.subjectBtn}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.subjectText}>{title}</Text>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color="#4A90E2"
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.contentWrapper}>
          <TouchableOpacity style={styles.selectAllBtn} onPress={onSelectAll}>
            <Ionicons
              name={isAllSelected ? "checkbox" : "square-outline"}
              size={20}
              color="#4A90E2"
            />
            <Text style={styles.selectAllText}>
              {isAllSelected ? "Deselectează tot" : "Selectează tot"}
            </Text>
          </TouchableOpacity>

          {items.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.item,
                selectedIds.includes(item.id) && styles.activeItem,
              ]}
              onPress={() => onToggle(item.id)}
            >
              <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: { marginBottom: 10 },
  subjectBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  subjectText: { fontSize: 18, fontWeight: "bold", color: "#4A90E2" },
  contentWrapper: { marginLeft: 10 },
  selectAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  selectAllText: {
    marginLeft: 8,
    color: "#4A90E2",
    fontWeight: "600",
    fontSize: 14,
  },
  item: { padding: 15, borderBottomWidth: 1, borderColor: "#eee" },
  itemText: { fontSize: 16, color: "#333" },
  activeItem: { backgroundColor: "#e3f2fd", borderRadius: 8 },
});
