import { AppButton } from "@/components/ui/app-button";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { AppInput } from "../components/ui/app-input";
import { useSignupForm } from "../hooks/use-signup-form";

export default function SignupScreen() {
  const { email, setEmail, password, setPassword, loading, handleSignup } =
    useSignupForm();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>

      <AppInput
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <AppInput
        label="Password"
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <AppButton title="Sign Up" onPress={handleSignup} loading={loading} />

      <AppButton
        title="Already have an account? Log in"
        onPress={() => router.push("../index")}
        variant="outline"
        style={styles.loginBtn}
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
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    color: "#2e2e2e",
  },
  loginBtn: {
    marginTop: 20,
    borderWidth: 0,
  },
});
