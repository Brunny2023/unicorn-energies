
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useUserData = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const fetchUserCount = async () => {
    setLoading(true);
    try {
      console.log("Fetching user count...");
      
      // Try to connect to Supabase
      try {
        const { error: testError } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
        if (testError) {
          console.error("Error connecting to Supabase for users:", testError);
          return 0;
        }
        console.log("Successfully connected to Supabase for users");
      } catch (connectionError) {
        console.error("Failed to connect to Supabase for users:", connectionError);
        return 0;
      }
      
      // Fetch user count
      let userCount = 0;
      try {
        const { count, error: userCountError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        
        if (userCountError) {
          console.error("Error fetching user count:", userCountError);
        } else {
          userCount = count || 0;
          console.log("User count:", userCount);
        }
      } catch (error) {
        console.error("Failed to fetch user count:", error);
      }
      
      return userCount;
    } catch (error) {
      console.error("Error in fetchUserCount:", error);
      toast({
        title: "Error",
        description: "Failed to fetch user data",
        variant: "destructive",
      });
      return 0;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fetchUserCount
  };
};
