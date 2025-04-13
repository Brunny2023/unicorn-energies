
import { supabase } from '@/integrations/supabase/client';
import { AffiliateReward } from '@/types/investment';

export const getUserAffiliateRewards = async (userId: string): Promise<AffiliateReward[]> => {
  try {
    const { data, error } = await supabase
      .from('affiliate_rewards')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as AffiliateReward[];
  } catch (error) {
    console.error('Error fetching user affiliate rewards:', error);
    return [];
  }
};

export const getUserReferralCode = async (userId: string): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('referral_code')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data.referral_code;
  } catch (error) {
    console.error('Error fetching user referral code:', error);
    return null;
  }
};

export const getUserReferrals = async (userId: string): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('affiliates')
      .select(`
        id,
        level,
        created_at,
        user_id,
        user:user_id (
          email
        )
      `)
      .eq('referrer_id', userId)
      .order('level', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user referrals:', error);
    return [];
  }
};

export const processAffiliateReward = async (rewardId: string): Promise<boolean> => {
  try {
    // Get the reward details
    const { data: rewardData, error: rewardFetchError } = await supabase
      .from('affiliate_rewards')
      .select('*')
      .eq('id', rewardId)
      .eq('status', 'pending')
      .single();

    if (rewardFetchError) throw rewardFetchError;

    // Update the user's wallet balance
    const { data: walletData, error: walletFetchError } = await supabase
      .from('wallets')
      .select('balance')
      .eq('user_id', rewardData.user_id)
      .single();

    if (walletFetchError) throw walletFetchError;

    const newBalance = Number(walletData.balance) + Number(rewardData.amount);
    
    const { error: walletUpdateError } = await supabase
      .from('wallets')
      .update({ 
        balance: newBalance,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', rewardData.user_id);

    if (walletUpdateError) throw walletUpdateError;

    // Update the reward status
    const { error: rewardUpdateError } = await supabase
      .from('affiliate_rewards')
      .update({ 
        status: 'processed', 
        processed_at: new Date().toISOString()
      })
      .eq('id', rewardId);

    if (rewardUpdateError) throw rewardUpdateError;

    // Create a transaction record
    const { error: transactionError } = await supabase
      .from('transactions')
      .insert([{
        user_id: rewardData.user_id,
        amount: rewardData.amount,
        type: 'affiliate_reward',
        status: 'completed',
        description: `Level ${rewardData.level} affiliate reward processed`
      }]);

    if (transactionError) throw transactionError;

    return true;
  } catch (error) {
    console.error('Error processing affiliate reward:', error);
    return false;
  }
};
