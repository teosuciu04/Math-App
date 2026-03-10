import { ReactNode } from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface Props {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline";
  style?: StyleProp<ViewStyle>;
  icon?: ReactNode;
}

export function AppButton({
  title,
  onPress,
  loading,
  disabled,
  variant = "primary",
  style,
  icon,
}: Props) {
  const isSecondary = variant === "secondary";
  const isOutline = variant === "outline";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading || disabled}
      style={[
        styles.btn,
        isSecondary && styles.btnSecondary,
        isOutline && styles.btnOutline,
        (loading || disabled) && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isOutline ? "#4A90E2" : "#fff"} />
      ) : (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {icon && <View style={{ marginRight: 10 }}>{icon}</View>}
          <Text style={[styles.text, isOutline && styles.textOutline]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  btnSecondary: { backgroundColor: "#28a745" },
  btnOutline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#4A90E2",
  },
  disabled: { opacity: 0.5 },
  text: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  textOutline: { color: "#4A90E2" },
});
