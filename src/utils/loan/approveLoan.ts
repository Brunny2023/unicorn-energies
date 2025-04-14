
import { supabase } from '@/integrations/supabase/client';
import { validateMinimumLoanAmount } from './validators/loanAmountValidator';

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
    
    // Validate minimum loan amount
    const loanAmount = Number(loanData.amount);
    const validationResult = validateMinimumLoanAmount(loanAmount);
    
    if (!validationResult.valid) {
      // Update loan as rejected
      await supabase
        .from('loan_applications')
        .update({ 
          status: 'rejected', 
          approved_by: adminId,
          admin_notes: validationResult.message,
          updated_at: new Date().toISOString()
        })
        .eq('id', loanId);
      
      return false;
    }

    return await processLoanApproval(loanId, adminId, loanData.user_id, loanAmount, adminNotes);
  } catch (error) {
    console.error('Error approving loan application:', error);
    return false;
  }
};

/**
 * Process the approval of a validated loan
 * @param loanId The ID of the loan application
 * @param adminId The admin ID
 * @param userId The user ID receiving the loan
 * @param loanAmount The loan amount
 * @param adminNotes Optional admin notes
 * @returns Success status
 */
const processLoanApproval = async (
  loanId: string,
  adminId: string,
  userId: string,
  loanAmount: number,
  adminNotes?: string
): Promise<boolean> => {
  try {
    // Update the loan application
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
      .eq('user_id', userId)
      .single();

    if (walletFetchError) throw walletFetchError;

    const newBalance = Number(walletData.balance) + loanAmount;
    
    const { error: walletUpdateError } = await supabase
      .from('wallets')
      .update({ 
        balance: newBalance,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (walletUpdateError) throw walletUpdateError;

    // Create a transaction record
    const { error: transactionError } = await supabase
      .from('transactions')
      .insert([{
        user_id: userId,
        amount: loanAmount,
        type: 'loan',
        status: 'completed',
        description: `Loan approved for $${loanAmount}. This amount can only be used for investments. You need to double your loan amount through daily interests before withdrawing profits.`,
        created_by: adminId
      }]);

    if (transactionError) throw transactionError;

    return true;
  } catch (error) {
    console.error('Error processing loan approval:', error);
    return false;
  }
};
