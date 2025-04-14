
import { supabase } from '@/integrations/supabase/client';
import { LoanApplication } from '@/types/investment';
import { calculateLoanCommitmentFee } from '../investmentCalculationUtils';

/**
 * Create a new loan application
 * @param userId The user ID submitting the application
 * @param amount The loan amount requested
 * @param purpose The purpose of the loan
 * @returns The created loan application or null if there was an error
 */
export const createLoanApplication = async (
  userId: string,
  amount: number,
  purpose: string
): Promise<LoanApplication | null> => {
  try {
    // Enforce minimum loan amount
    if (amount < 3500) {
      throw new Error("Minimum loan amount is $3,500");
    }
    
    // Calculate commitment fee (5% of loan amount)
    const commitmentFee = calculateLoanCommitmentFee(amount);
    
    // Check if user has sufficient balance to pay commitment fee
    const { data: walletData, error: walletError } = await supabase
      .from('wallets')
      .select('balance')
      .eq('user_id', userId)
      .single();
      
    if (walletError) throw walletError;
    
    if (walletData.balance < commitmentFee) {
      throw new Error(`Insufficient funds to pay commitment fee. Required: $${commitmentFee.toFixed(2)}, Available: $${walletData.balance.toFixed(2)}`);
    }
    
    // Start a transaction - first deduct the commitment fee
    const { error: feeError } = await supabase
      .from('wallets')
      .update({ 
        balance: walletData.balance - commitmentFee,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);
      
    if (feeError) throw feeError;
    
    // Record the commitment fee transaction
    const { error: txError } = await supabase
      .from('transactions')
      .insert([
        {
          user_id: userId,
          type: 'fee',
          amount: commitmentFee,
          status: 'completed',
          description: `Loan application commitment fee (5% of $${amount.toFixed(2)})`
        }
      ]);
      
    if (txError) throw txError;
    
    // Now create the loan application
    const { data, error } = await supabase
      .from('loan_applications')
      .insert([
        {
          user_id: userId,
          amount,
          purpose,
          status: 'pending'
        }
      ])
      .select('*')
      .single();

    if (error) throw error;
    return data as LoanApplication;
  } catch (error) {
    console.error('Error creating loan application:', error);
    return null;
  }
};
