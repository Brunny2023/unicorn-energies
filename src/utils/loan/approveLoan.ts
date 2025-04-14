
import { supabase } from '@/integrations/supabase/client';

/**
 * Approve a loan application
 * @param loanId The ID of the loan application to approve
 * @param adminId The ID of the admin approving the loan
 * @param adminNotes Optional notes from the admin
 * @returns Success status
 */
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
        description: `Loan approved for $${loanData.amount}. This amount can only be used for investments. You need to double your loan amount through daily interests before withdrawing profits.`,
        created_by: adminId
      }]);

    if (transactionError) throw transactionError;

    return true;
  } catch (error) {
    console.error('Error approving loan application:', error);
    return false;
  }
};
