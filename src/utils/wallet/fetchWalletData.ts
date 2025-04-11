
import { supabase } from '@/integrations/supabase/client';
import { WalletData } from '@/types/investment';

// Core wallet data retrieval function
export const fetchWalletData = async (userId: string): Promise<WalletData | null> => {
  try {
    const { data, error } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', userId)
      .single();
      
    if (error) throw error;
    return data as WalletData;
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    return null;
  }
};

// Alias the fetchWalletData function to getUserWallet for compatibility
export const getUserWallet = fetchWalletData;
