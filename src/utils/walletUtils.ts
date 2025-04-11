
import { supabase } from '@/integrations/supabase/client';
import { WalletData, WithdrawalRequest } from '@/types/investment';

// Wallet management utilities
export const calculateWithdrawalFee = (walletData: WalletData, amount: number): WithdrawalRequest => {
  if (amount <= 0) {
    return {
      eligible: false,
      reason: "Withdrawal amount must be greater than zero",
      amount,
      fee: 0,
      netAmount: 0
    };
  }

  if (amount > walletData.balance) {
    return {
      eligible: false,
      reason: "Insufficient balance for withdrawal",
      amount,
      fee: 0,
      netAmount: 0
    };
  }

  const fee = (amount * walletData.withdrawal_fee_percentage) / 100;
  const netAmount = amount - fee;

  return {
    eligible: true,
    amount,
    fee,
    netAmount
  };
};

export const processWithdrawal = async (userId: string, amount: number): Promise<boolean> => {
  try {
    // In development mode, simulate a successful withdrawal
    const isDevelopmentMode = true; // Change to false in production
    
    if (isDevelopmentMode) {
      return new Promise(resolve => {
        setTimeout(() => resolve(true), 1500);
      });
    }
    
    // For production: Update wallet balance in the database
    const { data: walletData, error: walletError } = await supabase
      .from('wallets')
      .select('id, balance')
      .eq('user_id', userId)
      .single();
      
    if (walletError || !walletData) {
      console.error("Error fetching wallet data:", walletError);
      return false;
    }
    
    if (walletData.balance < amount) {
      console.error("Insufficient balance for withdrawal");
      return false;
    }
    
    // Update wallet balance
    const { error: updateError } = await supabase
      .from('wallets')
      .update({ 
        balance: walletData.balance - amount,
        updated_at: new Date().toISOString()
      })
      .eq('id', walletData.id);
      
    if (updateError) {
      console.error("Error updating wallet balance:", updateError);
      return false;
    }
    
    // Record transaction
    const { error: transactionError } = await supabase
      .from('transactions')
      .insert([
        {
          user_id: userId,
          type: 'withdrawal',
          amount: amount,
          status: 'completed',
          description: 'Withdrawal from investment account'
        }
      ]);
      
    if (transactionError) {
      console.error("Error recording transaction:", transactionError);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error processing withdrawal:", error);
    return false;
  }
};

export const getUserWallet = async (userId: string): Promise<WalletData | null> => {
  try {
    const { data, error } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', userId)
      .single();
      
    if (error) throw error;
    
    return data as WalletData;
  } catch (error) {
    console.error('Error fetching user wallet:', error);
    return null;
  }
};
