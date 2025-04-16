
import { supabase } from "@/integrations/supabase/client";

export const checkIfAdmin = async (userId: string): Promise<boolean> => {
  try {
    console.log("Checking admin status for user:", userId);
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error("Error checking admin status:", error);
      return false;
    }
    
    const isAdmin = data?.role === 'admin';
    console.log("Is admin?", isAdmin);
    return isAdmin;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};
