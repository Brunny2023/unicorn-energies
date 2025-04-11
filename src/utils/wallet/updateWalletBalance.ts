
import { supabase } from '@/integrations/supabase/client';

// Update wallet balance
export const updateWalletBalance = async (userId: string, newBalance: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('wallets')
      .update({ 
        balance: newBalance,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);
      
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error updating wallet balance:", error);
    return false;
  }
};

// Deduct from wallet balance
export const deductFromWalletBalance = async (userId: string, amount: number): Promise<boolean> => {
  try {
    // First get the current balance
    const { data, error: fetchError } = await supabase
      .from('wallets')
      .select('balance')
      .eq('user_id', userId)
      .single();
    
    if (fetchError) throw fetchError;
    
    // Calculate new balance
    const newBalance = data.balance - amount;
    
    // Update with the new calculated balance
    const { error } = await supabase
      .from('wallets')
      .update({ 
        balance: newBalance,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);
      
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deducting from wallet balance:", error);
    return false;
  }
};
