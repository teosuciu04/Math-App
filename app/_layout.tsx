import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayout() {
  return (
    // We force DefaultTheme (Light) to avoid the black screen conflict
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="customize-test"
          options={{
            title: "Personalizează Testul",
            headerShown: true,
            headerBackTitle: "Acasă",
            headerTintColor: "#000",
          }}
        />
        <Stack.Screen
          name="quiz-screen"
          options={{ title: "Test", headerShown: false }}
        />
        <Stack.Screen
          name="results"
          options={{ title: "Rezultat", headerShown: false }}
        />
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
