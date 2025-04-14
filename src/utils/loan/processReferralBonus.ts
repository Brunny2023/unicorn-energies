
import { supabase } from '@/integrations/supabase/client';

/**
 * Process a referral bonus for a loan application
 * @param referrerId The ID of the user who referred the loan applicant
 * @param commitmentFee The commitment fee paid by the referred user
 * @returns Success status
 */
export const processLoanReferralBonus = async (
  referrerId: string,
  commitmentFee: number
): Promise<boolean> => {
  try {
    // Check if the commitment fee meets the minimum requirement for bonus
    if (commitmentFee < 688) {
      console.log(`Deposit amount ($${commitmentFee}) is less than the required $688 for referral bonus`);
      return false;
    }
    
    // Get referrer's wallet data
    const { data: walletData, error: walletError } = await supabase
      .from('wallets')
      .select('balance')
      .eq('user_id', referrerId)
      .single();
      
    if (walletError) {
      console.error('Error fetching referrer wallet:', walletError);
      return false;
    }
    
    // Define bonus amount
    const bonusAmount = 250;
    
    // Update referrer's wallet with the bonus
    const { error: updateError } = await supabase
      .from('wallets')
      .update({ 
        balance: walletData.balance + bonusAmount,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', referrerId);
      
    if (updateError) {
      console.error('Error updating referrer wallet balance:', updateError);
      return false;
    }
    
    // Create transaction record for the referral bonus
    const { error: txError } = await supabase
      .from('transactions')
      .insert([{
        user_id: referrerId,
        amount: bonusAmount,
        type: 'bonus',
        status: 'completed',
        description: `Loan referral bonus ($${bonusAmount}) for referring a loan applicant who deposited $${commitmentFee.toFixed(2)}`
      }]);
      
    if (txError) {
      console.error('Error creating referral bonus transaction:', txError);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error processing loan referral bonus:', error);
    return false;
  }
};
