
import { Plan, CalculationResults } from '@/types/investment';

// Investment calculation utilities
export const calculateInvestmentResults = (amount: number, plan: Plan): CalculationResults => {
  const dailyProfit = amount * (plan.dailyReturn / 100);
  const totalProfit = dailyProfit * plan.duration;
  const totalReturn = amount + totalProfit;

  return {
    dailyProfit,
    totalProfit,
    totalReturn,
  };
};

// Export calculateInvestment as an alias of calculateInvestmentResults
export const calculateInvestment = calculateInvestmentResults;
