
// Re-export all utility functions from their respective files
export * from './formatUtils';
export * from './investmentCalculationUtils';
export * from './planUtils';
export * from './walletUtils';
export * from './ticketUtils';

// Add missing exports
import { supabase } from '@/integrations/supabase/client';
import { Investment } from '@/types/investment';

// Create a new investment
export const createInvestment = async (
  userId: string,
  planId: string,
  amount: number
): Promise<Investment | null> => {
  try {
    // Get plan details to calculate returns
    const plans = await import('./planUtils').then(m => m.fetchInvestmentPlans());
    const selectedPlan = plans.find(p => p.id === planId);
    
    if (!selectedPlan) {
      throw new Error("Invalid plan selected");
    }
    
    // Calculate returns
    const { calculateInvestment } = await import('./investmentCalculationUtils');
    const results = calculateInvestment(amount, selectedPlan);
    
    // Set dates
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + selectedPlan.duration);
    
    // Create investment record
    const { data, error } = await supabase
      .from('investments')
      .insert([
        {
          user_id: userId,
          plan_id: planId,
          amount: amount,
          daily_return: selectedPlan.dailyReturn,
          duration: selectedPlan.duration,
          total_return: results.totalReturn,
          status: 'active',
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString()
        }
      ])
      .select()
      .single();
      
    if (error) throw error;
    
    // Update wallet balance (deduct invested amount)
    const { error: walletError } = await supabase
      .from('wallets')
      .update({ 
        balance: supabase.rpc('decrement_balance', { amount_to_subtract: amount }),
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);
      
    if (walletError) {
      console.error("Error updating wallet balance:", walletError);
    }
    
    return data as Investment;
  } catch (error) {
    console.error("Error creating investment:", error);
    return null;
  }
};

// Get investments for a user
export const getUserInvestments = async (userId: string): Promise<Investment[]> => {
  try {
    const { data, error } = await supabase
      .from('investments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data as Investment[];
  } catch (error) {
    console.error("Error fetching user investments:", error);
    return [];
  }
};

// Get a specific investment by ID
export const getInvestmentById = async (investmentId: string): Promise<Investment | null> => {
  try {
    const { data, error } = await supabase
      .from('investments')
      .select('*')
      .eq('id', investmentId)
      .single();
      
    if (error) throw error;
    return data as Investment;
  } catch (error) {
    console.error("Error fetching investment details:", error);
    return null;
  }
};
