import { supabase } from "@/integrations/supabase/client";
import { Investment, WalletData, Transaction, Plan, CalculationResults, WithdrawalRequest, Ticket } from "@/types/investment";

export const getUserInvestments = async (userId: string): Promise<Investment[]> => {
  try {
    const { data, error } = await supabase
      .from('investments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
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
    const results = calculateInvestment(amount, planDetails);
    if (!results) throw new Error("Invalid calculation results");
    
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + planDetails.duration);
    
    const { error: walletError } = await supabase
      .from('wallets')
      .update({ balance: supabase.rpc('GREATEST', { x: 0, y: supabase.raw('balance - ' + amount) }) })
      .eq('user_id', userId);
      
    if (walletError) throw walletError;
    
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

export const calculateWithdrawal = async (
  userId: string,
  requestedAmount: number
): Promise<WithdrawalRequest> => {
  try {
    const wallet = await fetchWalletData(userId);
    
    if (!wallet || requestedAmount <= 0) {
      return {
        amount: requestedAmount,
        fee: 0,
        netAmount: 0,
        eligible: false,
        reason: "Invalid amount or wallet data"
      };
    }
    
    if (requestedAmount > wallet.accrued_profits) {
      return {
        amount: requestedAmount,
        fee: 0,
        netAmount: 0,
        eligible: false,
        reason: "Requested amount exceeds available profits"
      };
    }
    
    const fee = (requestedAmount * wallet.withdrawal_fee_percentage) / 100;
    const netAmount = requestedAmount - fee;
    
    return {
      amount: requestedAmount,
      fee,
      netAmount,
      eligible: true
    };
  } catch (error) {
    console.error("Error calculating withdrawal:", error);
    return {
      amount: requestedAmount,
      fee: 0,
      netAmount: 0,
      eligible: false,
      reason: "Error processing withdrawal request"
    };
  }
};

export const processWithdrawal = async (
  userId: string,
  withdrawal: WithdrawalRequest
): Promise<boolean> => {
  try {
    if (!withdrawal.eligible) return false;
    
    const { error: walletError1 } = await supabase
      .from('wallets')
      .update({ 
        accrued_profits: supabase.rpc('GREATEST', { x: 0, y: supabase.raw('accrued_profits - ' + withdrawal.amount) }) 
      })
      .eq('user_id', userId);
      
    if (walletError1) throw walletError1;
    
    const { error: walletError2 } = await supabase
      .from('wallets')
      .update({ balance: supabase.raw('balance + ' + withdrawal.netAmount) })
      .eq('user_id', userId);
      
    if (walletError2) throw walletError2;
    
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

export const getUserTickets = async (userId: string): Promise<Ticket[]> => {
  try {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    return data.map(ticket => ({
      ...ticket,
      status: ticket.status as 'open' | 'in-progress' | 'resolved' | 'closed',
      priority: ticket.priority as 'low' | 'medium' | 'high'
    })) as Ticket[];
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return [];
  }
};

export const getTicketDetails = async (ticketId: string): Promise<Ticket | null> => {
  try {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('id', ticketId)
      .single();
      
    if (error) throw error;
    
    return {
      ...data,
      status: data.status as 'open' | 'in-progress' | 'resolved' | 'closed',
      priority: data.priority as 'low' | 'medium' | 'high'
    } as Ticket;
  } catch (error) {
    console.error("Error fetching ticket details:", error);
    return null;
  }
};

export const updateTicket = async (
  ticketId: string,
  updates: { status?: string; message?: string }
): Promise<boolean> => {
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

export const getAllTickets = async (): Promise<Ticket[]> => {
  try {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    return data.map(ticket => ({
      ...ticket,
      status: ticket.status as 'open' | 'in-progress' | 'resolved' | 'closed',
      priority: ticket.priority as 'low' | 'medium' | 'high'
    })) as Ticket[];
  } catch (error) {
    console.error("Error fetching all tickets:", error);
    return [];
  }
};

export const generateAIResponse = async (
  ticketId: string,
  message: string
): Promise<boolean> => {
  try {
    const aiResponse = "Thank you for contacting our support team. We're looking into your issue and will get back to you soon.";
    
    const { error } = await supabase
      .from('tickets')
      .update({
        ai_response: aiResponse,
        ai_responded_at: new Date().toISOString(),
        status: 'in-progress'
      })
      .eq('id', ticketId);
      
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error generating AI response:", error);
    return false;
  }
};
