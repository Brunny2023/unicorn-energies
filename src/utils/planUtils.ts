
import { Plan } from '@/types/investment';

export const fetchInvestmentPlans = async (): Promise<Plan[]> => {
  try {
    // Define the investment plans with the requested specifications
    const plans: Plan[] = [
      { 
        id: "goldfish", 
        name: "Goldfish", 
        minAmount: 10, 
        maxAmount: 100, 
        dailyReturn: 0.35, 
        duration: 30 
      },
      { 
        id: "dolphin", 
        name: "Dolphin", 
        minAmount: 100, 
        maxAmount: 1000, 
        dailyReturn: 0.45, 
        duration: 30 
      },
      { 
        id: "shark", 
        name: "Shark", 
        minAmount: 1000, 
        maxAmount: 10000, 
        dailyReturn: 0.55, 
        duration: 30 
      },
      { 
        id: "whales", 
        name: "Whales", 
        minAmount: 10000, 
        maxAmount: 200000, 
        dailyReturn: 0.65, 
        duration: 30 
      },
      { 
        id: "accredited", 
        name: "Accredited Investor", 
        minAmount: 200000, 
        maxAmount: 1000000, 
        dailyReturn: 0.85, 
        duration: 30 
      }
    ];
    
    return plans;
  } catch (error) {
    console.error("Error fetching investment plans:", error);
    return [];
  }
};

// Helper function to validate if an investment amount is within a plan's limits
export const isValidInvestmentAmount = (amount: number, plan: Plan): boolean => {
  return amount >= plan.minAmount && amount <= plan.maxAmount;
};

// Get a plan by ID
export const getPlanById = async (planId: string): Promise<Plan | null> => {
  try {
    const plans = await fetchInvestmentPlans();
    return plans.find(plan => plan.id === planId) || null;
  } catch (error) {
    console.error("Error getting plan by ID:", error);
    return null;
  }
};

// Calculate the total return percentage for a plan
export const calculateTotalReturnPercentage = (plan: Plan): number => {
  return plan.dailyReturn * plan.duration;
};
