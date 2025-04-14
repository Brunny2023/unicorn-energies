
import { supabase } from '@/integrations/supabase/client';

/**
 * Reject a loan application
 * @param loanId The ID of the loan application to reject
 * @param adminId The ID of the admin rejecting the loan
 * @param adminNotes Optional notes from the admin
 * @returns Success status
 */
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
