
import { supabase } from '@/integrations/supabase/client';
import { fetchWalletData } from './fetchWalletData';
import { calculateWithdrawalRequest } from './calculateWithdrawal';

// Process a withdrawal transaction
export const processWithdrawal = async (userId: string, amount: number): Promise<boolean> => {
  try {
    // Get current wallet data
    const walletData = await fetchWalletData(userId);
    
    if (!walletData) {
      throw new Error("Wallet data not found");
    }
    
    const withdrawal = calculateWithdrawalRequest(walletData, amount);
    
    if (!withdrawal.eligible) {
      throw new Error(withdrawal.reason || "Withdrawal not eligible");
    }
    
    // Calculate new balance
    const newBalance = walletData.balance - amount;
    
    // Update wallet balance
    const { error: walletError } = await supabase
      .from('wallets')
      .update({ 
        balance: newBalance,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);
      
    if (walletError) throw walletError;
    
    // Record transaction
    const { error: txError } = await supabase
      .from('transactions')
      .insert([
        {
          user_id: userId,
          type: 'withdrawal',
          amount: amount,
          status: 'pending',
          description: `Withdrawal request. Fee: $${withdrawal.fee.toFixed(2)}, Net: $${withdrawal.netAmount.toFixed(2)}`
        }
      ]);
      
    if (txError) throw txError;
    
    // Record fee transaction
    const { error: feeError } = await supabase
      .from('transactions')
      .insert([
        {
          user_id: userId,
          type: 'fee',
          amount: withdrawal.fee,
          status: 'completed',
          description: `Withdrawal fee (${(withdrawal.fee / amount * 100).toFixed(2)}%)`
        }
      ]);
      
    if (feeError) throw feeError;
    
    return true;
  } catch (error) {
    console.error("Error processing withdrawal:", error);
    return false;
  }
};

// Deposit funds into wallet
export const depositFunds = async (userId: string, amount: number): Promise<boolean> => {
  try {
    // Get current wallet data
    const walletData = await fetchWalletData(userId);
    
    if (!walletData) {
      throw new Error("Wallet data not found");
    }
    
    // Calculate new balance
    const newBalance = walletData.balance + amount;
    
    // Update wallet balance
    const { error: walletError } = await supabase
      .from('wallets')
      .update({ 
        balance: newBalance,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);
      
    if (walletError) throw walletError;
    
    // Record transaction
    const { error: txError } = await supabase
      .from('transactions')
      .insert([
        {
          user_id: userId,
          type: 'deposit',
          amount: amount,
          status: 'completed',
          description: `Deposit processed`
        }
      ]);
      
    if (txError) throw txError;
    
    return true;
  } catch (error) {
    console.error("Error processing deposit:", error);
    return false;
  }
};
