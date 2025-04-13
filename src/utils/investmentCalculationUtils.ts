
import { Plan, CalculationResults } from '@/types/investment';

// Investment calculation utilities
export const calculateInvestmentResults = (amount: number, plan: Plan): CalculationResults => {
  // Daily profit is calculated based on the daily return percentage
  const dailyProfit = amount * (plan.dailyReturn / 100);
  
  // Total profit is calculated by multiplying daily profit by the duration in days
  const totalProfit = dailyProfit * plan.duration;
  
  // Total return is the original investment amount plus the total profit
  const totalReturn = amount + totalProfit;

  // Calculate the return percentage (total profit as a percentage of the initial investment)
  const returnPercentage = (totalProfit / amount) * 100;

  // Calculate the annual percentage yield (APY) based on the daily return
  // Formula: APY = (1 + r)^n - 1, where r is the daily rate and n is the number of days in a year
  const dailyRate = plan.dailyReturn / 100;
  const annualYield = (Math.pow(1 + dailyRate, 365) - 1) * 100;

  return {
    dailyProfit,
    totalProfit,
    totalReturn,
    returnPercentage,
    annualYield,
    duration: plan.duration
  };
};

// Calculate the withdrawal eligibility for profits from loan-funded investments
export const calculateLoanProfitWithdrawalEligibility = async (
  userId: string,
  loanAmount: number,
  investedAmount: number
): Promise<{eligible: boolean, reason?: string}> => {
  // User must have invested at least 33.33% of the loan amount to withdraw profits
  const minimumInvestmentRequired = loanAmount / 3;
  
  if (investedAmount < minimumInvestmentRequired) {
    return {
      eligible: false,
      reason: `You need to invest at least $${minimumInvestmentRequired.toFixed(2)} (33.33% of your loan) before withdrawing profits. Currently invested: $${investedAmount.toFixed(2)}`
    };
  }
  
  return { eligible: true };
};

// Export calculateInvestment as an alias of calculateInvestmentResults
export const calculateInvestment = calculateInvestmentResults;
