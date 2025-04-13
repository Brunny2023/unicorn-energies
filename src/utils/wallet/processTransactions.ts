
import { supabase } from '@/integrations/supabase/client';
import { fetchWalletData } from './fetchWalletData';
import { calculateWithdrawalRequest } from './calculateWithdrawal';
import { WithdrawalDestination } from '@/types/investment';

// Process a withdrawal transaction
export const processWithdrawal = async (
  userId: string, 
  amount: number,
  destination?: { 
    method_type: string; 
    name: string; 
    details: any 
  }
): Promise<boolean> => {
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
    
    // Create a descriptive message for the transaction record
    let description = `Withdrawal request. Fee: $${withdrawal.fee.toFixed(2)}, Net: $${withdrawal.netAmount.toFixed(2)}`;
    
    if (destination) {
      // Add destination info to the description
      const methodType = destination.method_type.charAt(0).toUpperCase() + destination.method_type.slice(1);
      description += ` | To: ${destination.name} (${methodType})`;
      
      // Add specific details based on method type
      if (destination.method_type === 'crypto' && destination.details.address) {
        const addressShort = destination.details.address.length > 12
          ? `${destination.details.address.slice(0, 6)}...${destination.details.address.slice(-6)}`
          : destination.details.address;
        description += ` | Address: ${addressShort}`;
      } else if (destination.method_type === 'bank' && destination.details.account_number) {
        const accountShort = destination.details.account_number.length > 8
          ? `****${destination.details.account_number.slice(-4)}`
          : destination.details.account_number;
        description += ` | Account: ${accountShort}`;
      } else if (destination.method_type === 'digital_wallet' && destination.details.email) {
        description += ` | Account: ${destination.details.email}`;
      }
    }
    
    // Record transaction
    const { error: txError } = await supabase
      .from('transactions')
      .insert([
        {
          user_id: userId,
          type: 'withdrawal',
          amount: amount,
          status: 'pending',
          description: description,
          metadata: destination ? {
            destination: {
              method_type: destination.method_type,
              name: destination.name,
              details: destination.details
            }
          } : null
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

// Enhanced deposit function with transaction tracking
export const depositFunds = async (
  userId: string, 
  amount: number, 
  method?: string, 
  transactionId?: string,
  referenceId?: string
): Promise<boolean> => {
  try {
    // Get current wallet data
    const walletData = await fetchWalletData(userId);
    
    if (!walletData) {
      throw new Error("Wallet data not found");
    }
    
    // Calculate new balance
    const newBalance = walletData.balance + amount;
    
    // Update wallet balance and total_deposits
    const { error: walletError } = await supabase
      .from('wallets')
      .update({ 
        balance: newBalance,
        total_deposits: (walletData.total_deposits || 0) + amount,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);
      
    if (walletError) throw walletError;
    
    // Build transaction description
    let description = `Deposit processed via ${method || 'unknown method'}`;
    if (transactionId) description += ` (Tx ID: ${transactionId})`;
    if (referenceId) description += ` (Ref: ${referenceId})`;
    
    // Record transaction
    const { error: txError } = await supabase
      .from('transactions')
      .insert([
        {
          user_id: userId,
          type: 'deposit',
          amount: amount,
          status: 'completed',
          description: description,
          metadata: {
            method: method,
            transaction_id: transactionId,
            reference_id: referenceId
          }
        }
      ]);
      
    if (txError) throw txError;
    
    // Store the user's last deposit method in local storage
    if (method) {
      localStorage.setItem("lastDepositMethod", method);
    }
    
    return true;
  } catch (error) {
    console.error("Error processing deposit:", error);
    return false;
  }
};
