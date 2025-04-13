
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
    
    // Check if user has any active loans
    const { data: loanData, error: loanError } = await supabase
      .from('loan_applications')
      .select('amount')
      .eq('user_id', userId)
      .eq('status', 'approved')
      .order('created_at', { ascending: false });
      
    if (loanError) throw loanError;
    
    // Sum of all approved loans
    const totalLoans = loanData.reduce((sum, loan) => sum + Number(loan.amount), 0);
    
    // Get total investments
    const { data: investmentsData, error: investmentsError } = await supabase
      .from('investments')
      .select('amount')
      .eq('user_id', userId);
      
    if (investmentsError) throw investmentsError;
    
    // Sum of all investments
    const totalInvestments = investmentsData.reduce((sum, inv) => sum + Number(inv.amount), 0);
    
    // Get the user's non-loan balance (balance before loans)
    const nonLoanBalance = walletData.balance - totalLoans;
    
    // If withdrawal amount is greater than non-loan balance, check investment requirements
    if (amount > nonLoanBalance) {
      // If there are loans but insufficient investments, prevent withdrawal
      if (totalLoans > 0 && totalInvestments < totalLoans / 3) {
        throw new Error(`You must invest at least $${(totalLoans / 3).toFixed(2)} (33.33% of your loans) before withdrawing. Currently invested: $${totalInvestments.toFixed(2)}`);
      }
      
      // Limit withdrawal to non-loan balance plus eligible profit amount
      const eligibleAmount = nonLoanBalance + walletData.accrued_profits;
      if (amount > eligibleAmount) {
        throw new Error(`You can only withdraw up to $${eligibleAmount.toFixed(2)} (your balance excluding loans plus eligible profits)`);
      }
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
