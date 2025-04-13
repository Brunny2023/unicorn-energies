
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useWalletData = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const fetchWalletBalances = async () => {
    setLoading(true);
    try {
      console.log("Fetching wallet balances...");
      
      // Try to connect to Supabase
      try {
        const { error: testError } = await supabase.from('wallets').select('count', { count: 'exact', head: true });
        if (testError) {
          console.error("Error connecting to Supabase for wallets:", testError);
          return 0;
        }
        console.log("Successfully connected to Supabase for wallets");
      } catch (connectionError) {
        console.error("Failed to connect to Supabase for wallets:", connectionError);
        return 0;
      }
      
      // Fetch wallets data
      let wallets = [];
      try {
        const { data: walletsData, error: walletsError } = await supabase
          .from('wallets')
          .select('balance');
        
        if (walletsError) {
          console.error("Error fetching wallets:", walletsError);
        } else {
          wallets = walletsData || [];
          console.log("Wallets data:", wallets);
        }
      } catch (error) {
        console.error("Failed to fetch wallets data:", error);
      }
      
      const systemBalance = wallets?.reduce((sum, wallet) => sum + Number(wallet.balance), 0) || 0;
      return systemBalance;
    } catch (error) {
      console.error("Error in fetchWalletBalances:", error);
      toast({
        title: "Error",
        description: "Failed to fetch wallet data",
        variant: "destructive",
      });
      return 0;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fetchWalletBalances
  };
};
