
import { Plan, CalculationResults, WithdrawalRequest } from "@/types/investment";
import { supabase } from "@/integrations/supabase/client";

/**
 * Calculate investment results based on amount and plan
 */
export const calculateInvestment = (amount: number, plan: Plan): CalculationResults => {
  if (!amount || !plan) return null;
  
  const dailyProfit = (amount * plan.dailyReturn) / 100;
  const totalProfit = dailyProfit * plan.duration;
  const totalReturn = amount + totalProfit;
  
  return {
    dailyProfit,
    totalProfit,
    totalReturn
  };
};

/**
 * Create a new investment for a user
 */
export const createInvestment = async (userId: string, planId: string, amount: number, planDetails: Plan) => {
  try {
    const { dailyProfit, totalProfit } = calculateInvestment(amount, planDetails) || {};
    if (!dailyProfit || !totalProfit) throw new Error("Failed to calculate investment returns");
    
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + planDetails.duration);
    
    const { data, error } = await supabase
      .from('investments')
      .insert({
        user_id: userId,
        plan_id: planId,
        amount,
        daily_return: planDetails.dailyReturn,
        duration: planDetails.duration,
        end_date: endDate.toISOString(),
        total_return: amount + totalProfit,
      })
      .select()
      .single();
    
    if (error) throw error;
    
    // Deduct the investment amount from the user's wallet
    const { error: walletError } = await supabase
      .from('wallets')
      .update({ balance: supabase.rpc('decrement_balance', { amount }) })
      .eq('user_id', userId);
    
    if (walletError) throw walletError;
    
    // Create a transaction record
    await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        amount,
        type: 'investment',
        status: 'completed',
        description: `Investment in ${planDetails.name} plan`
      });
    
    return data;
  } catch (error) {
    console.error("Error creating investment:", error);
    throw error;
  }
};

/**
 * Check if user can withdraw funds and calculate fees
 */
export const calculateWithdrawal = async (userId: string, amount: number): Promise<WithdrawalRequest> => {
  try {
    // Get user wallet and active investments
    const { data: wallet, error: walletError } = await supabase
      .from('wallets')
      .select('balance, accrued_profits, withdrawal_fee_percentage')
      .eq('user_id', userId)
      .single();
    
    if (walletError) throw walletError;
    
    const { data: activeInvestments, error: investmentError } = await supabase
      .from('investments')
      .select('end_date')
      .eq('user_id', userId)
      .eq('status', 'active');
    
    if (investmentError) throw investmentError;
    
    // Check if any active investments haven't reached their end date
    const hasActiveInvestments = activeInvestments.some(inv => {
      const endDate = new Date(inv.end_date);
      return endDate > new Date();
    });
    
    // Calculate withdrawal fee
    const fee = (amount * wallet.withdrawal_fee_percentage) / 100;
    const netAmount = amount - fee;
    
    let eligible = true;
    let reason = undefined;
    
    // Check if user has enough balance
    if (amount > wallet.balance) {
      eligible = false;
      reason = "Insufficient balance";
    }
    
    // Check if user has active investments that haven't matured
    if (hasActiveInvestments) {
      eligible = false;
      reason = "You have active investments that haven't reached their maturity date";
    }
    
    return {
      amount,
      fee,
      netAmount,
      eligible,
      reason
    };
  } catch (error) {
    console.error("Error calculating withdrawal:", error);
    throw error;
  }
};

/**
 * Process a withdrawal request
 */
export const processWithdrawal = async (userId: string, amount: number): Promise<boolean> => {
  try {
    const withdrawalRequest = await calculateWithdrawal(userId, amount);
    
    if (!withdrawalRequest.eligible) {
      throw new Error(withdrawalRequest.reason || "Withdrawal not eligible");
    }
    
    // Update wallet balance
    const { error: walletError } = await supabase
      .from('wallets')
      .update({ 
        balance: supabase.rpc('decrement_balance', { amount })
      })
      .eq('user_id', userId);
    
    if (walletError) throw walletError;
    
    // Create transaction for withdrawal and fee
    await supabase
      .from('transactions')
      .insert([
        {
          user_id: userId,
          amount: withdrawalRequest.netAmount,
          type: 'withdrawal',
          status: 'pending',
          description: 'Withdrawal request'
        },
        {
          user_id: userId,
          amount: withdrawalRequest.fee,
          type: 'fee',
          status: 'completed',
          description: 'Withdrawal fee (5%)'
        }
      ]);
    
    return true;
  } catch (error) {
    console.error("Error processing withdrawal:", error);
    throw error;
  }
};

/**
 * Get all investments for a user
 */
export const getUserInvestments = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('investments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching user investments:", error);
    throw error;
  }
};

/**
 * Format currency values
 */
export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

/**
 * Calculate days remaining until investment maturity
 */
export const calculateDaysRemaining = (endDate: string): number => {
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
};
