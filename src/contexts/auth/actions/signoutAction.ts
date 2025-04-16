
import { supabase } from "@/integrations/supabase/client";
import { AuthToast, NavigateFunction } from "../types";

export const signOut = async (
  { toast, navigate }: { toast: AuthToast['toast'], navigate: NavigateFunction }
) => {
  try {
    console.log("Signing out...");
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
    navigate("/");
  } catch (error: any) {
    console.error("Logout error:", error);
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to log out. Please try again.",
    });
  }
};
