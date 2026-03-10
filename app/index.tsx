import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { AppButton } from "../components/ui/app-button";
import { AppInput } from "../components/ui/app-input";
import { useAuthForm } from "../hooks/use-auth-form";

export default function LoginScreen() {
  const { email, setEmail, password, setPassword, loading, handleLogin } =
    useAuthForm();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bine ai venit!</Text>

      <AppInput
        label="Email"
        placeholder="Introdu adresa de email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <AppInput
        label="Parolă"
        placeholder="Introdu parola"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <AppButton
        title="Autentificare"
        onPress={handleLogin}
        loading={loading}
        style={styles.loginBtn}
      />

      <AppButton
        title="Nu ai cont? Înregistrează-te"
        onPress={() => router.push("/signup")}
        variant="outline"
        style={styles.signupBtn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 50,
    color: "#2e2e2e",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  loginBtn: {
    marginTop: 10,
  },
  signupBtn: {
    marginTop: 20,
    borderWidth: 0, // Makes it look like a text link while remaining a button
  },
});
