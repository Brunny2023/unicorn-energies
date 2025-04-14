
import { supabase } from '@/integrations/supabase/client';
import { LoanApplication } from '@/types/investment';

/**
 * Get loan applications for a specific user
 * @param userId The user ID to fetch loan applications for
 * @returns Array of loan applications
 */
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

/**
 * Get all loan applications in the system (admin only)
 * @returns Array of all loan applications
 */
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
