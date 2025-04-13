
import { Plan } from '@/types/investment';

/**
 * Fetch available investment plans
 * @returns Array of investment plan options
 */
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

/**
 * Validate if an investment amount is within a plan's limits
 * @param amount The proposed investment amount
 * @param plan The selected investment plan
 * @returns Boolean indicating if the amount is valid
 */
export const isValidInvestmentAmount = (amount: number, plan: Plan): boolean => {
  return amount >= plan.minAmount && amount <= plan.maxAmount;
};

/**
 * Get a specific investment plan by its ID
 * @param planId The unique identifier of the plan
 * @returns The matching plan or null if not found
 */
export const getPlanById = async (planId: string): Promise<Plan | null> => {
  try {
    const plans = await fetchInvestmentPlans();
    return plans.find(plan => plan.id === planId) || null;
  } catch (error) {
    console.error("Error getting plan by ID:", error);
    return null;
  }
};

/**
 * Calculate the total percentage return for a plan over its full duration
 * @param plan The investment plan
 * @returns The total percentage return
 */
export const calculateTotalReturnPercentage = (plan: Plan): number => {
  return plan.dailyReturn * plan.duration;
};

/**
 * Get recommended investment plan based on investment amount
 * @param amount The amount to be invested
 * @returns The most suitable plan for the given amount
 */
export const getRecommendedPlan = async (amount: number): Promise<Plan | null> => {
  try {
    const plans = await fetchInvestmentPlans();
    
    // Sort plans by minimum amount (ascending)
    const sortedPlans = [...plans].sort((a, b) => a.minAmount - b.minAmount);
    
    // Find the highest tier plan the user qualifies for
    for (let i = sortedPlans.length - 1; i >= 0; i--) {
      if (amount >= sortedPlans[i].minAmount) {
        return sortedPlans[i];
      }
    }
    
    // If no suitable plan found, return the lowest tier plan
    return sortedPlans[0] || null;
  } catch (error) {
    console.error("Error getting recommended plan:", error);
    return null;
  }
};
