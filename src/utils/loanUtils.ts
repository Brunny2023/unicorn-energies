
import { supabase } from '@/integrations/supabase/client';
import { LoanApplication } from '@/types/investment';

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
    
    // Calculate commitment fee (0.00172% of loan amount)
    const commitmentFee = amount * 0.0000172;
    
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
          description: `Loan application commitment fee (0.00172% of $${amount.toFixed(2)})`
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

export const getUserLoanApplications = async (userId: string): Promise<LoanApplication[]> => {
  try {
    const { data, error } = await supabase
      .from('loan_applications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as LoanApplication[];
  } catch (error) {
    console.error('Error fetching user loan applications:', error);
    return [];
  }
};

export const getAllLoanApplications = async (): Promise<LoanApplication[]> => {
  try {
    const { data, error } = await supabase
      .from('loan_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as LoanApplication[];
  } catch (error) {
    console.error('Error fetching all loan applications:', error);
    return [];
  }
};

export const approveLoanApplication = async (
  loanId: string,
  adminId: string,
  adminNotes?: string
): Promise<boolean> => {
  try {
    // Get the loan application details
    const { data: loanData, error: loanFetchError } = await supabase
      .from('loan_applications')
      .select('user_id, amount, purpose')
      .eq('id', loanId)
      .single();

    if (loanFetchError) throw loanFetchError;
    
    // Ensure loan amount meets minimum requirement
    if (Number(loanData.amount) < 3500) {
      // Update loan as rejected
      await supabase
        .from('loan_applications')
        .update({ 
          status: 'rejected', 
          approved_by: adminId,
          admin_notes: `Loan amount does not meet the minimum requirement of $3,500.`,
          updated_at: new Date().toISOString()
        })
        .eq('id', loanId);
      
      return false;
    }
    
    // Validate loan amount is within 300% of proposed investment amount
    // Extract proposed investment amount from purpose
    const proposedInvestmentMatch = loanData.purpose?.match(/\$?(\d+[.,]?\d*)/);
    if (!proposedInvestmentMatch) {
      throw new Error("Could not determine proposed investment amount from purpose");
    }
    
    const proposedInvestment = parseFloat(proposedInvestmentMatch[1].replace(',', ''));
    const loanAmount = Number(loanData.amount);
    
    // Check if loan is at most 300% of proposed investment
    if (loanAmount > proposedInvestment * 3) {
      // Update loan as rejected
      await supabase
        .from('loan_applications')
        .update({ 
          status: 'rejected', 
          approved_by: adminId,
          admin_notes: `Loan amount exceeds 300% of proposed investment (${proposedInvestment}). Maximum allowed: $${(proposedInvestment * 3).toFixed(2)}`,
          updated_at: new Date().toISOString()
        })
        .eq('id', loanId);
      
      return false;
    }

    // Start a transaction
    // First update the loan application
    const { error: updateError } = await supabase
      .from('loan_applications')
      .update({ 
        status: 'approved', 
        approved_by: adminId,
        approved_at: new Date().toISOString(),
        admin_notes: adminNotes || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', loanId)
      .eq('status', 'pending');

    if (updateError) throw updateError;

    // Update the user's wallet balance
    const { data: walletData, error: walletFetchError } = await supabase
      .from('wallets')
      .select('balance')
      .eq('user_id', loanData.user_id)
      .single();

    if (walletFetchError) throw walletFetchError;

    const newBalance = Number(walletData.balance) + Number(loanData.amount);
    
    const { error: walletUpdateError } = await supabase
      .from('wallets')
      .update({ 
        balance: newBalance,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', loanData.user_id);

    if (walletUpdateError) throw walletUpdateError;

    // Create a transaction record with loan metadata
    const { error: transactionError } = await supabase
      .from('transactions')
      .insert([{
        user_id: loanData.user_id,
        amount: loanData.amount,
        type: 'loan',
        status: 'completed',
        description: `Loan approved for $${loanData.amount}. This amount can only be used for investments and requires at least ${(loanAmount / 3).toFixed(2)} to be invested before withdrawing profits.`,
        created_by: adminId
      }]);

    if (transactionError) throw transactionError;

    return true;
  } catch (error) {
    console.error('Error approving loan application:', error);
    return false;
  }
};

export const rejectLoanApplication = async (
  loanId: string,
  adminId: string,
  adminNotes?: string
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('loan_applications')
      .update({ 
        status: 'rejected', 
        approved_by: adminId,
        admin_notes: adminNotes || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', loanId)
      .eq('status', 'pending');

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error rejecting loan application:', error);
    return false;
  }
};
