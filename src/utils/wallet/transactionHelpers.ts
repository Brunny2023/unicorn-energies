
import { supabase } from '@/integrations/supabase/client';
import { WalletData, WithdrawalRequest, WithdrawalDestination } from '@/types/investment';

/**
 * Check if a user is eligible to withdraw the requested amount
 * @param userId The user ID requesting the withdrawal
 * @param walletData The user's wallet data
 * @param amount The amount to withdraw
 * @returns Eligibility status with reason if not eligible
 */
export const checkWithdrawalEligibility = async (
  userId: string,
  walletData: WalletData,
  amount: number
): Promise<{eligible: boolean, reason?: string}> => {
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
      return {
        eligible: false,
        reason: `You must invest at least $${(totalLoans / 3).toFixed(2)} (33.33% of your loans) before withdrawing. Currently invested: $${totalInvestments.toFixed(2)}`
      };
    }
    
    // Limit withdrawal to non-loan balance plus eligible profit amount
    const eligibleAmount = nonLoanBalance + walletData.accrued_profits;
    if (amount > eligibleAmount) {
      return {
        eligible: false,
        reason: `You can only withdraw up to $${eligibleAmount.toFixed(2)} (your balance excluding loans plus eligible profits)`
      };
    }
  }
  
  return { eligible: true };
};

/**
 * Process the withdrawal transaction by updating the wallet balance
 * @param userId The user ID requesting the withdrawal
 * @param walletData The user's wallet data
 * @param amount The amount to withdraw
 * @returns Success status of the operation
 */
export const processWithdrawalTransaction = async (
  userId: string,
  walletData: WalletData,
  amount: number
): Promise<boolean> => {
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
    
  if (walletError) {
    console.error("Error updating wallet balance:", walletError);
    return false;
  }
  
  return true;
};

/**
 * Create transaction records for withdrawal and fee
 * @param userId The user ID requesting the withdrawal
 * @param amount The amount to withdraw
 * @param withdrawal The calculated withdrawal request details
 * @param destination Optional destination details
 * @returns Success status of the operation
 */
export const createTransactionRecords = async (
  userId: string,
  amount: number,
  withdrawal: WithdrawalRequest,
  destination?: { method_type: string; name: string; details: any }
): Promise<boolean> => {
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
    
  if (txError) {
    console.error("Error recording withdrawal transaction:", txError);
    return false;
  }
  
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
    
  if (feeError) {
    console.error("Error recording fee transaction:", feeError);
    return false;
  }
  
  return true;
};
