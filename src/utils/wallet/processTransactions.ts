
import { supabase } from '@/integrations/supabase/client';
import { fetchWalletData } from './fetchWalletData';
import { calculateWithdrawalRequest } from './calculateWithdrawal';
import { WithdrawalDestination } from '@/types/investment';
import { 
  checkWithdrawalEligibility, 
  processWithdrawalTransaction, 
  createTransactionRecords 
} from './transactionHelpers';

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
    
    // Check eligibility for withdrawal
    const eligibilityResult = await checkWithdrawalEligibility(userId, walletData, amount);
    if (!eligibilityResult.eligible) {
      throw new Error(eligibilityResult.reason || "Withdrawal not eligible");
    }
    
    const withdrawal = calculateWithdrawalRequest(walletData, amount);
    
    if (!withdrawal.eligible) {
      throw new Error(withdrawal.reason || "Withdrawal not eligible");
    }
    
    // Process the withdrawal transaction
    const updateSuccess = await processWithdrawalTransaction(userId, walletData, amount);
    if (!updateSuccess) {
      throw new Error("Failed to update wallet balance");
    }
    
    // Create transaction records
    await createTransactionRecords(userId, amount, withdrawal, destination);
    
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
