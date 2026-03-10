import { supabase } from "../lib/supabase";

export const AuthService = {
  // Method 1: Login
  async login(email: string, password: string) {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  // Method 2: Sign Up
  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });

    // If signup is successful, create the profile row
    if (data?.user && !error) {
      try {
        await supabase.from("profiles").insert({
          id: data.user.id,
          email: data.user.email,
        });
      } catch (profileError) {
        console.error("Profile creation failed:", profileError);
      }
    }

    return { data, error };
  },
};
