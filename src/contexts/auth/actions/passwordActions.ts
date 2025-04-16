
import { supabase } from "@/integrations/supabase/client";
import { AuthToast, NavigateFunction } from "../types";

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
    console.error("Password reset error:", error);
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
    console.error("Password update error:", error);
    toast({
      variant: "destructive",
      title: "Update failed",
      description: error.message || "Failed to update password. Please try again.",
    });
  }
};
