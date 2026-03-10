import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface CircularProgressProps {
  percentage: number;
  radius?: number;
  strokeWidth?: number;
  title?: string;
}

export function CircularProgress({
  percentage = 0,
  radius = 60,
  strokeWidth = 12,
  title = "",
}: CircularProgressProps) {
  // Math for the circle
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const halfCircle = radius + strokeWidth;

  // Dynamic colors matching your image style!
  const getColor = (p: number) => {
    if (p < 25) return "#E74C3C"; // Red
    if (p < 50) return "#F39C12"; // Orange
    if (p < 75) return "#8BC34A"; // Light Green
    if (p < 90) return "#1ABC9C"; // Teal
    return "#3498DB"; // Blue
  };

  const color = getColor(percentage);

  return (
    <View style={styles.container}>
      {title ? <Text style={styles.title}>{title}</Text> : null}

      <View style={{ width: halfCircle * 2, height: halfCircle * 2 }}>
        <Svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
        >
          {/* 1. The Light Gray Background Track */}
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="#F0F0F0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* 2. The Colored Progress Track */}
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round" // This gives the exact rounded ends from your image!
            rotation="-90" // Starts the progress at the top (12 o'clock)
            originX={halfCircle}
            originY={halfCircle}
          />
        </Svg>

        {/* 3. The Text in the Middle */}
        <View style={[StyleSheet.absoluteFillObject, styles.textContainer]}>
          <Text style={styles.percentageText}>{percentage}%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginBottom: 10,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  percentageText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});
