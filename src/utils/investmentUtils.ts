
import { supabase } from "@/integrations/supabase/client";
import { Investment, WalletData, Transaction, Plan, CalculationResults, WithdrawalRequest } from "@/types/investment";
import { Tables } from "@/integrations/supabase/types";

export const getUserInvestments = async (userId: string): Promise<Investment[]> => {
  try {
    const { data, error } = await supabase
      .from('investments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    // Map database fields to our Investment type
    const investments: Investment[] = data.map(inv => ({
      id: inv.id,
      plan_id: inv.plan_id,
      user_id: inv.user_id,
      amount: inv.amount,
      dailyReturn: inv.daily_return,
      duration: inv.duration,
      startDate: inv.start_date,
      endDate: inv.end_date,
      totalReturn: inv.total_return,
      status: inv.status as 'active' | 'completed' | 'cancelled',
      createdAt: inv.created_at
    }));
    
    return investments;
  } catch (error) {
    console.error("Error fetching user investments:", error);
    throw error;
  }
};

export const fetchWalletData = async (userId: string): Promise<WalletData | null> => {
  try {
    const { data, error } = await supabase
      .from('wallets')
      .select('id, balance, accrued_profits, withdrawal_fee_percentage')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching wallet:', error);
    return null;
  }
};

export const fetchTransactions = async (userId: string): Promise<Transaction[]> => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

// Add missing utility functions
export const calculateInvestment = (amount: number, plan: Plan): CalculationResults => {
  if (amount <= 0) return null;
  
  const dailyProfit = (amount * plan.dailyReturn) / 100;
  const totalProfit = dailyProfit * plan.duration;
  const totalReturn = amount + totalProfit;
  
  return {
    dailyProfit,
    totalProfit,
    totalReturn
  };
};

export const createInvestment = async (
  userId: string,
  planId: string,
  amount: number,
  planDetails: Plan
): Promise<void> => {
  try {
    // Calculate investment details
    const results = calculateInvestment(amount, planDetails);
    if (!results) throw new Error("Invalid calculation results");
    
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + planDetails.duration);
    
    // Start a transaction
    // 1. Decrement wallet balance
    const { error: walletError } = await supabase
      .from('wallets')
      .update({ balance: supabase.rpc('decrement_balance', { amount }) })
      .eq('user_id', userId);
      
    if (walletError) throw walletError;
    
    // 2. Create investment record
    const { error: investmentError } = await supabase
      .from('investments')
      .insert({
        user_id: userId,
        plan_id: planId,
        amount,
        daily_return: planDetails.dailyReturn,
        duration: planDetails.duration,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        total_return: results.totalReturn,
        status: 'active'
      });
      
    if (investmentError) throw investmentError;
    
    // 3. Create transaction record
    const { error: transactionError } = await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        amount,
        type: 'investment',
        description: `Investment in ${planId} plan`
      });
      
    if (transactionError) throw transactionError;
  } catch (error) {
    console.error("Error creating investment:", error);
    throw error;
  }
};

export const calculateDaysRemaining = (endDate: string): number => {
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const calculateWithdrawal = (
  walletData: WalletData,
  requestedAmount: number
): WithdrawalRequest | null => {
  if (!walletData || requestedAmount <= 0 || requestedAmount > walletData.accrued_profits) {
    return null;
  }
  
  const fee = (requestedAmount * walletData.withdrawal_fee_percentage) / 100;
  const netAmount = requestedAmount - fee;
  
  return {
    amount: requestedAmount,
    fee,
    netAmount
  };
};

export const processWithdrawal = async (
  userId: string,
  withdrawal: WithdrawalRequest
): Promise<boolean> => {
  try {
    // 1. Update wallet
    const { error: walletError } = await supabase
      .from('wallets')
      .update({
        accrued_profits: supabase.rpc('decrement_balance', { amount: withdrawal.amount }),
        balance: supabase.rpc('increment_balance', { amount: withdrawal.netAmount })
      })
      .eq('user_id', userId);
      
    if (walletError) throw walletError;
    
    // 2. Create transaction record
    const { error: transactionError } = await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        amount: withdrawal.netAmount,
        type: 'withdrawal',
        description: `Withdrawal of profits (Fee: ${formatCurrency(withdrawal.fee)})`
      });
      
    if (transactionError) throw transactionError;
    
    return true;
  } catch (error) {
    console.error("Error processing withdrawal:", error);
    return false;
  }
};

// Add ticket-related functions
export const createTicket = async (
  userId: string,
  subject: string,
  message: string,
  priority: 'low' | 'medium' | 'high' = 'medium'
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('tickets')
      .insert({
        user_id: userId,
        subject,
        message,
        priority,
        status: 'open'
      });
      
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error creating ticket:", error);
    return false;
  }
};

export const getUserTickets = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return [];
  }
};

export const getTicketDetails = async (ticketId: string) => {
  try {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('id', ticketId)
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching ticket details:", error);
    return null;
  }
};

export const updateTicket = async (
  ticketId: string,
  updates: { status?: string; message?: string }
) => {
  try {
    const { error } = await supabase
      .from('tickets')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', ticketId);
      
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error updating ticket:", error);
    return false;
  }
};
