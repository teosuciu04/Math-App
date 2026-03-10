import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import { AuthService } from "../services/auth-service";

export function useAuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Eroare", "Te rugăm să introduci email-ul și parola.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await AuthService.login(email, password);
      if (error) throw error;

      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert("Autentificare eșuată", "Credențialele sunt incorecte.");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleLogin,
  };
}
