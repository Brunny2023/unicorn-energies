
import { supabase } from "@/integrations/supabase/client";
import { AuthToast, NavigateFunction } from "../types";

export const signIn = async (
  email: string, 
  password: string,
  { toast, navigate }: { toast: AuthToast['toast'], navigate: NavigateFunction }
) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    toast({
      title: "Welcome back!",
      description: "You've successfully logged in.",
    });

    // Redirect based on role
    if (data.user) {
      console.log("User authenticated:", data.user);
      
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();
        
      if (profileError) {
        console.error("Error fetching user role:", profileError);
        navigate("/dashboard");
        return;
      }
        
      if (profileData?.role === 'admin') {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  } catch (error: any) {
    console.error("Login error:", error);
    toast({
      variant: "destructive",
      title: "Login failed",
      description: error.message || "Invalid email or password",
    });
  }
};
