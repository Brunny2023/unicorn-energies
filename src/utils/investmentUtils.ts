import { supabase } from '@/integrations/supabase/client';
import { Investment, Plan, WalletData, Ticket, WithdrawalRequest } from '@/types/investment';

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

export const fetchInvestmentPlans = async (): Promise<Plan[]> => {
  try {
    const { data, error } = await supabase
      .from('investment_plans')
      .select('*');

    if (error) {
      console.error("Error fetching investment plans:", error);
      return [];
    }

    return data as Plan[];
  } catch (error) {
    console.error("Error fetching investment plans:", error);
    return [];
  }
};

export const createInvestment = async (userId: string, planId: string, amount: number): Promise<Investment | null> => {
  try {
    // Fetch the selected investment plan
    const { data: plan, error: planError } = await supabase
      .from('investment_plans')
      .select('*')
      .eq('id', planId)
      .single();

    if (planError) {
      throw new Error(`Error fetching investment plan: ${planError.message}`);
    }

    // Ensure the plan exists
    if (!plan) {
      throw new Error('Investment plan not found');
    }

    // Calculate start and end dates
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + plan.duration * 24 * 60 * 60 * 1000); // Duration in days

    // Calculate daily return
    const dailyReturn = plan.dailyReturn;

    // Calculate total return
    const totalReturn = amount + (amount * (dailyReturn / 100) * plan.duration);

    // Create a new investment record
    const { data: investment, error: investmentError } = await supabase
      .from('investments')
      .insert([
        {
          plan_id: planId,
          user_id: userId,
          amount: amount,
          dailyReturn: dailyReturn,
          duration: plan.duration,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          totalReturn: totalReturn,
          status: 'active',
        },
      ])
      .select('*')
      .single();

    if (investmentError) {
      throw new Error(`Error creating investment: ${investmentError.message}`);
    }

    return investment as Investment;
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
      .order('startDate', { ascending: false });

    if (error) {
      console.error("Error fetching user investments:", error);
      return [];
    }

    return data as Investment[];
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
  
      return data as Investment;
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

    return data as Ticket;
  } catch (error) {
    console.error('Error creating support ticket:', error);
    return null;
  }
};

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

    // Ensure the response matches our Ticket type
    return (data as Ticket[]).map(ticket => ({
      ...ticket,
      status: ticket.status as 'open' | 'in-progress' | 'resolved' | 'closed',
      priority: ticket.priority as 'low' | 'medium' | 'high'
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
    
    // Ensure the response matches our Ticket type
    return {
      ...data,
      status: data.status as 'open' | 'in-progress' | 'resolved' | 'closed',
      priority: data.priority as 'low' | 'medium' | 'high'
    } as Ticket;
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

    // Ensure the response matches our Ticket type
    return (data as Ticket[]).map(ticket => ({
      ...ticket,
      status: ticket.status as 'open' | 'in-progress' | 'resolved' | 'closed',
      priority: ticket.priority as 'low' | 'medium' | 'high'
    }));
  } catch (error) {
    console.error('Error fetching all tickets:', error);
    return [];
  }
};
