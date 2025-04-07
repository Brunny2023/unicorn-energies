import { supabase } from "@/integrations/supabase/client";

export type AuthToast = {
  toast: (props: {
    title: string;
    description: string;
    variant?: "default" | "destructive";
    action?: any;
  }) => void;
};

export type NavigateFunction = (to: string) => void;

export const signUp = async (
  email: string, 
  password: string, 
  fullName: string,
  { toast, navigate }: { toast: AuthToast['toast'], navigate: NavigateFunction }
) => {
  try {
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

    toast({
      title: "Account created!",
      description: "Please check your email for verification.",
    });

    navigate("/login");
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Registration failed",
      description: error.message || "An error occurred during registration",
    });
  }
};

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
      const { data: profileData } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();
        
      if (profileData?.role === 'admin') {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Login failed",
      description: error.message || "Invalid email or password",
    });
  }
};

export const signOut = async (
  { toast, navigate }: { toast: AuthToast['toast'], navigate: NavigateFunction }
) => {
  try {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
    navigate("/");
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to log out. Please try again.",
    });
  }
};

export const resetPassword = async (
  email: string,
  { toast }: { toast: AuthToast['toast'] }
) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      throw error;
    }

    toast({
      title: "Password reset email sent",
      description: "Check your inbox for a password reset link.",
    });
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Reset failed",
      description: error.message || "Failed to send reset email. Please try again.",
    });
  }
};

export const updatePassword = async (
  newPassword: string,
  { toast, navigate }: { toast: AuthToast['toast'], navigate: NavigateFunction }
) => {
  try {
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      throw error;
    }

    toast({
      title: "Password updated",
      description: "Your password has been successfully updated.",
    });

    navigate("/dashboard");
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Update failed",
      description: error.message || "Failed to update password. Please try again.",
    });
  }
};

export const checkIfAdmin = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error("Error checking admin status:", error);
      return false;
    }
    
    return data?.role === 'admin';
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};
