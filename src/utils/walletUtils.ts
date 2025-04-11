
import { supabase } from '@/integrations/supabase/client';
import { WalletData, WithdrawalRequest } from '@/types/investment';

export const fetchWalletData = async (userId: string): Promise<WalletData | null> => {
  try {
    const { data, error } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error("Error fetching wallet data:", error);
      return null;
    }

    return data as WalletData;
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    return null;
  }
};

export const processWithdrawal = async (userId: string, amount: number): Promise<boolean> => {
  try {
    // Get wallet data
    const { data: wallet, error: walletError } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (walletError || !wallet) {
      throw new Error('Could not fetch wallet data');
    }

    // Check if wallet has enough balance
    if (wallet.balance < amount) {
      throw new Error('Insufficient balance');
    }

    // Calculate fee
    const fee = (amount * wallet.withdrawal_fee_percentage) / 100;
    const netAmount = amount - fee;

    // Update wallet balance
    const { error: updateError } = await supabase
      .from('wallets')
      .update({ balance: wallet.balance - amount })
      .eq('user_id', userId);

    if (updateError) {
      throw updateError;
    }

    // Record transaction
    const { error: txError } = await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        amount: amount,
        type: 'withdrawal',
        status: 'completed',
        description: `Withdrawal with ${fee.toFixed(2)} fee. Net: ${netAmount.toFixed(2)}`,
      });

    if (txError) {
      throw txError;
    }

    return true;
  } catch (error) {
    console.error('Error processing withdrawal:', error);
    return false;
  }
};

export const calculateWithdrawalFee = (walletData: WalletData | null, amount: number): WithdrawalRequest => {
  if (!walletData) {
    return {
      amount,
      fee: 0,
      netAmount: 0,
      eligible: false,
      reason: 'Wallet not found'
    };
  }

  if (walletData.balance < amount) {
    return {
      amount,
      fee: 0,
      netAmount: 0,
      eligible: false,
      reason: 'Insufficient balance'
    };
  }

  const fee = (amount * walletData.withdrawal_fee_percentage) / 100;
  const netAmount = amount - fee;

  return {
    amount,
    fee,
    netAmount,
    eligible: true
  };
};
