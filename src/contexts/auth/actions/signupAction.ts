
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
    
    // Check if user already exists
    const { data: existingUsers, error: checkError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email);
      
    if (checkError) {
      console.error("Error checking existing user:", checkError);
    } else if (existingUsers && existingUsers.length > 0) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "A user with this email already exists",
      });
      return;
    }
    
    // Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      throw error;
    }

    console.log("User signup successful:", data.user?.id);
    
    toast({
      title: "Account created!",
      description: "Please check your email for verification.",
    });

    navigate("/login");
  } catch (error: any) {
    console.error("Registration error:", error);
    toast({
      variant: "destructive",
      title: "Registration failed",
      description: error.message || "An error occurred during registration",
    });
  }
};
