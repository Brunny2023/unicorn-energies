
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useInvestmentData = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const fetchActiveInvestmentsCount = async () => {
    setLoading(true);
    try {
      console.log("Fetching active investments count...");
      
      // Try to connect to Supabase
      try {
        const { error: testError } = await supabase.from('investments').select('count', { count: 'exact', head: true });
        if (testError) {
          console.error("Error connecting to Supabase for investments:", testError);
          return 0;
        }
        console.log("Successfully connected to Supabase for investments");
      } catch (connectionError) {
        console.error("Failed to connect to Supabase for investments:", connectionError);
        return 0;
      }
      
      // Fetch active investments count
      let activeInvestmentsCount = 0;
      try {
        const { count, error: investmentCountError } = await supabase
          .from('investments')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'active');
        
        if (investmentCountError) {
          console.error("Error fetching active investments count:", investmentCountError);
        } else {
          activeInvestmentsCount = count || 0;
          console.log("Active investments count:", activeInvestmentsCount);
        }
      } catch (error) {
        console.error("Failed to fetch active investments count:", error);
      }
      
      return activeInvestmentsCount;
    } catch (error) {
      console.error("Error in fetchActiveInvestmentsCount:", error);
      toast({
        title: "Error",
        description: "Failed to fetch investment data",
        variant: "destructive",
      });
      return 0;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fetchActiveInvestmentsCount
  };
};
