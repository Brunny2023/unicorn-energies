
import { supabase } from '@/integrations/supabase/client';
import { LoanApplication } from '@/types/investment';

export const createLoanApplication = async (
  userId: string,
  amount: number,
  purpose: string
): Promise<LoanApplication | null> => {
  try {
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

    // Get the loan application details to update the wallet
    const { data: loanData, error: loanFetchError } = await supabase
      .from('loan_applications')
      .select('user_id, amount')
      .eq('id', loanId)
      .single();

    if (loanFetchError) throw loanFetchError;

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

    // Create a transaction record
    const { error: transactionError } = await supabase
      .from('transactions')
      .insert([{
        user_id: loanData.user_id,
        amount: loanData.amount,
        type: 'loan',
        status: 'completed',
        description: `Loan approved for $${loanData.amount}`,
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
