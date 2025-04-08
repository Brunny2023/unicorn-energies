
import { supabase } from '@/integrations/supabase/client';
import { Investment, Plan, WalletData, Ticket, WithdrawalRequest } from '@/types/investment';

// Formatting utilities
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const calculateDaysRemaining = (endDate: string): number => {
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
};

// Investment calculation utilities
export const calculateInvestmentResults = (amount: number, plan: Plan) => {
  const dailyProfit = amount * (plan.dailyReturn / 100);
  const totalProfit = dailyProfit * plan.duration;
  const totalReturn = amount + totalProfit;

  return {
    dailyProfit,
    totalProfit,
    totalReturn,
  };
};

export const calculateInvestment = calculateInvestmentResults;

export const fetchInvestmentPlans = async (): Promise<Plan[]> => {
  try {
    // Since investment_plans is not in the database type, we need to handle it manually
    const { data, error } = await supabase
      .from('investment_plans')
      .select('*');

    if (error) {
      console.error("Error fetching investment plans:", error);
      return [];
    }

    // Transform the data to match our Plan type
    return data.map(plan => ({
      id: plan.id,
      name: plan.name,
      minAmount: plan.min_amount,
      maxAmount: plan.max_amount,
      dailyReturn: plan.daily_return,
      duration: plan.duration
    })) as Plan[];
  } catch (error) {
    console.error("Error fetching investment plans:", error);
    return [];
  }
};

export const createInvestment = async (userId: string, planId: string, amount: number, planDetails?: Plan): Promise<Investment | null> => {
  try {
    // Fetch the selected investment plan if not provided
    let plan = planDetails;
    if (!plan) {
      const { data: planData, error: planError } = await supabase
        .from('investment_plans')
        .select('*')
        .eq('id', planId)
        .single();

      if (planError) {
        throw new Error(`Error fetching investment plan: ${planError.message}`);
      }

      plan = {
        id: planData.id,
        name: planData.name,
        minAmount: planData.min_amount,
        maxAmount: planData.max_amount,
        dailyReturn: planData.daily_return,
        duration: planData.duration
      };
    }

    // Calculate start and end dates
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + (plan.duration * 24 * 60 * 60 * 1000)); // Duration in days

    // Calculate daily return and total return
    const dailyReturn = plan.dailyReturn;
    const totalReturn = amount + (amount * (dailyReturn / 100) * plan.duration);

    // Create a new investment record with database column names
    const { data: investment, error: investmentError } = await supabase
      .from('investments')
      .insert([
        {
          plan_id: planId,
          user_id: userId,
          amount: amount,
          daily_return: dailyReturn,
          duration: plan.duration,
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
          total_return: totalReturn,
          status: 'active',
        },
      ])
      .select('*')
      .single();

    if (investmentError) {
      throw new Error(`Error creating investment: ${investmentError.message}`);
    }

    // Transform to match our Investment type
    return {
      id: investment.id,
      plan_id: investment.plan_id,
      user_id: investment.user_id,
      amount: investment.amount,
      daily_return: investment.daily_return,
      duration: investment.duration,
      start_date: investment.start_date,
      end_date: investment.end_date,
      total_return: investment.total_return,
      status: investment.status,
      created_at: investment.created_at
    } as Investment;
  } catch (error: any) {
    console.error("Error creating investment:", error.message);
    return null;
  }
};

export const getUserInvestments = async (userId: string): Promise<Investment[]> => {
  try {
    const { data, error } = await supabase
      .from('investments')
      .select('*')
      .eq('user_id', userId)
      .order('start_date', { ascending: false });

    if (error) {
      console.error("Error fetching user investments:", error);
      return [];
    }

    // Transform to match our Investment type
    return data.map(inv => ({
      id: inv.id,
      plan_id: inv.plan_id,
      user_id: inv.user_id,
      amount: inv.amount,
      daily_return: inv.daily_return,
      duration: inv.duration,
      start_date: inv.start_date,
      end_date: inv.end_date,
      total_return: inv.total_return,
      status: inv.status,
      created_at: inv.created_at
    })) as Investment[];
  } catch (error) {
    console.error("Error fetching user investments:", error);
    return [];
  }
};

export const getInvestmentDetails = async (investmentId: string): Promise<Investment | null> => {
  try {
    const { data, error } = await supabase
      .from('investments')
      .select('*')
      .eq('id', investmentId)
      .single();

    if (error) {
      console.error("Error fetching investment details:", error);
      return null;
    }

    // Transform to match our Investment type
    return {
      id: data.id,
      plan_id: data.plan_id,
      user_id: data.user_id,
      amount: data.amount,
      daily_return: data.daily_return,
      duration: data.duration,
      start_date: data.start_date,
      end_date: data.end_date,
      total_return: data.total_return,
      status: data.status,
      created_at: data.created_at
    } as Investment;
  } catch (error) {
    console.error("Error fetching investment details:", error);
    return null;
  }
};

export const cancelInvestment = async (investmentId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('investments')
      .update({ status: 'cancelled' })
      .eq('id', investmentId);

    if (error) {
      console.error("Error cancelling investment:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error cancelling investment:", error);
    return false;
  }
};

export const fetchWalletData = async (userId: string): Promise<WalletData | null> => {
  try {
    const { data, error } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error("Error fetching wallet data:", error);
      return null;
    }

    return data as WalletData;
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    return null;
  }
};

export const processWithdrawal = async (userId: string, amount: number): Promise<boolean> => {
  try {
    // Get wallet data
    const { data: wallet, error: walletError } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (walletError || !wallet) {
      throw new Error('Could not fetch wallet data');
    }

    // Check if wallet has enough balance
    if (wallet.balance < amount) {
      throw new Error('Insufficient balance');
    }

    // Calculate fee
    const fee = (amount * wallet.withdrawal_fee_percentage) / 100;
    const netAmount = amount - fee;

    // Update wallet balance
    const { error: updateError } = await supabase
      .from('wallets')
      .update({ balance: wallet.balance - amount })
      .eq('user_id', userId);

    if (updateError) {
      throw updateError;
    }

    // Record transaction
    const { error: txError } = await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        amount: amount,
        type: 'withdrawal',
        status: 'completed',
        description: `Withdrawal with ${fee.toFixed(2)} fee. Net: ${netAmount.toFixed(2)}`,
      });

    if (txError) {
      throw txError;
    }

    return true;
  } catch (error) {
    console.error('Error processing withdrawal:', error);
    return false;
  }
};

export const createSupportTicket = async (userId: string, subject: string, message: string, priority: string): Promise<Ticket | null> => {
  try {
    const { data, error } = await supabase
      .from('tickets')
      .insert([
        {
          user_id: userId,
          subject: subject,
          message: message,
          status: 'open',
          priority: priority,
        },
      ])
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    return {
      id: data.id,
      user_id: data.user_id,
      subject: data.subject,
      message: data.message,
      status: data.status as 'open' | 'in-progress' | 'resolved' | 'closed',
      priority: data.priority as 'low' | 'medium' | 'high',
      created_at: data.created_at,
      updated_at: data.updated_at,
      ai_response: data.ai_response,
      ai_responded_at: data.ai_responded_at
    };
  } catch (error) {
    console.error('Error creating support ticket:', error);
    return null;
  }
};

// Alias for compatibility with component usage
export const createTicket = createSupportTicket;

export const calculateWithdrawalFee = (walletData: WalletData | null, amount: number): WithdrawalRequest => {
  if (!walletData) {
    return {
      amount,
      fee: 0,
      netAmount: 0,
      eligible: false,
      reason: 'Wallet not found'
    };
  }

  if (walletData.balance < amount) {
    return {
      amount,
      fee: 0,
      netAmount: 0,
      eligible: false,
      reason: 'Insufficient balance'
    };
  }

  const fee = (amount * walletData.withdrawal_fee_percentage) / 100;
  const netAmount = amount - fee;

  return {
    amount,
    fee,
    netAmount,
    eligible: true
  };
};

export const getUserTickets = async (userId: string): Promise<Ticket[]> => {
  try {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Transform to match our Ticket type
    return data.map(ticket => ({
      id: ticket.id,
      user_id: ticket.user_id,
      subject: ticket.subject,
      message: ticket.message,
      status: ticket.status as 'open' | 'in-progress' | 'resolved' | 'closed',
      priority: ticket.priority as 'low' | 'medium' | 'high',
      created_at: ticket.created_at,
      updated_at: ticket.updated_at,
      ai_response: ticket.ai_response,
      ai_responded_at: ticket.ai_responded_at
    }));
  } catch (error) {
    console.error('Error fetching tickets:', error);
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
    
    // Transform to match our Ticket type
    return {
      id: data.id,
      user_id: data.user_id,
      subject: data.subject,
      message: data.message,
      status: data.status as 'open' | 'in-progress' | 'resolved' | 'closed',
      priority: data.priority as 'low' | 'medium' | 'high',
      created_at: data.created_at,
      updated_at: data.updated_at,
      ai_response: data.ai_response,
      ai_responded_at: data.ai_responded_at
    };
  } catch (error) {
    console.error('Error fetching ticket details:', error);
    return null;
  }
};

export const updateTicket = async (ticketId: string, updateData: Partial<Ticket>): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('tickets')
      .update(updateData)
      .eq('id', ticketId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating ticket:', error);
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

    // Transform to match our Ticket type
    return data.map(ticket => ({
      id: ticket.id,
      user_id: ticket.user_id,
      subject: ticket.subject,
      message: ticket.message,
      status: ticket.status as 'open' | 'in-progress' | 'resolved' | 'closed',
      priority: ticket.priority as 'low' | 'medium' | 'high',
      created_at: ticket.created_at,
      updated_at: ticket.updated_at,
      ai_response: ticket.ai_response,
      ai_responded_at: ticket.ai_responded_at
    }));
  } catch (error) {
    console.error('Error fetching all tickets:', error);
    return [];
  }
};
