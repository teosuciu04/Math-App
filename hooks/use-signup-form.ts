import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import { AuthService } from "../services/auth-service";

export function useSignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert("Eroare", "Te rugăm să completezi toate câmpurile.");
      return;
    }

    setLoading(true);
    const { error } = await AuthService.signUp(email, password);
    setLoading(false);

    if (error) {
      Alert.alert("Înregistrare eșuată", error.message);
      return;
    }

    Alert.alert("Succes", "Contul a fost creat! Acum te poți autentifica.");
    router.replace("../index");
  };

  return { email, setEmail, password, setPassword, loading, handleSignup };
}
