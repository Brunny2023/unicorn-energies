
import { supabase } from '@/integrations/supabase/client';
import { WalletData, WithdrawalRequest } from '@/types/investment';

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

export const calculateWithdrawalRequest = async (userId: string, requestedAmount: number): Promise<WithdrawalRequest> => {
  try {
    const walletData = await fetchWalletData(userId);
    
    if (!walletData) {
      return {
        eligible: false,
        reason: "Wallet data not found",
        amount: 0,
        fee: 0,
        netAmount: 0
      };
    }
    
    const { balance, withdrawal_fee_percentage } = walletData;
    
    // Check if user has sufficient balance
    if (balance < requestedAmount) {
      return {
        eligible: false,
        reason: "Insufficient balance",
        amount: requestedAmount,
        fee: 0,
        netAmount: 0
      };
    }
    
    // Calculate fee
    const feePercentage = withdrawal_fee_percentage || 5; // default 5%
    const fee = (requestedAmount * feePercentage) / 100;
    const netAmount = requestedAmount - fee;
    
    return {
      eligible: true,
      amount: requestedAmount,
      fee: fee,
      netAmount: netAmount
    };
  } catch (error) {
    console.error("Error calculating withdrawal:", error);
    return {
      eligible: false,
      reason: "Error processing request",
      amount: 0,
      fee: 0,
      netAmount: 0
    };
  }
};

export const processWithdrawal = async (userId: string, amount: number): Promise<boolean> => {
  try {
    const withdrawal = await calculateWithdrawalRequest(userId, amount);
    
    if (!withdrawal.eligible) {
      throw new Error(withdrawal.reason || "Withdrawal not eligible");
    }
    
    // Update wallet balance
    const { error: walletError } = await supabase
      .from('wallets')
      .update({ 
        balance: supabase.sql`balance - ${amount}`,
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
          description: `Withdrawal fee (${withdrawal.fee / amount * 100}%)`
        }
      ]);
      
    if (feeError) throw feeError;
    
    return true;
  } catch (error) {
    console.error("Error processing withdrawal:", error);
    return false;
  }
};

export const depositFunds = async (userId: string, amount: number): Promise<boolean> => {
  try {
    // Update wallet balance
    const { error: walletError } = await supabase
      .from('wallets')
      .update({ 
        balance: supabase.sql`balance + ${amount}`,
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

export const deductFromWalletBalance = async (userId: string, amount: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('wallets')
      .update({ 
        balance: supabase.sql`balance - ${amount}`,
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
