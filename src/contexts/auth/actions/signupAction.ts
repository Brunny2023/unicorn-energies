
import { supabase } from "@/integrations/supabase/client";
import { AuthToast, NavigateFunction } from "../types";

export const signUp = async (
  email: string, 
  password: string, 
  fullName: string,
  { toast, navigate }: { toast: AuthToast['toast'], navigate: NavigateFunction }
) => {
  try {
    console.log("Starting signup process for:", email);
    
    // Sign up the user using Supabase's built-in functionality with simplified options
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: window.location.origin + '/login',
      },
    });

    if (error) {
      console.error("Registration error from Supabase:", error);
      throw error;
    }

    console.log("User signup successful:", data.user?.id);
    
    toast({
      title: "Account created!",
      description: "You can now log in with your credentials.",
    });

    navigate("/login");
    return { success: true };
  } catch (error: any) {
    console.error("Registration error:", error.message, error);
    
    // More descriptive error message to help diagnose issues
    let errorMessage = "Error creating account";
    
    if (error.message) {
      errorMessage = error.message;
    } else if (error.code) {
      errorMessage = `Error (${error.code}): ${error.message || "Unknown error"}`;
    }
    
    toast({
      variant: "destructive",
      title: "Registration failed",
      description: errorMessage,
    });
    
    return { success: false, error: errorMessage };
  }
};
