
import { Plan } from '@/types/investment';

export const fetchInvestmentPlans = async (): Promise<Plan[]> => {
  try {
    // Hardcoded investment plans since the table doesn't exist in Supabase
    const plans: Plan[] = [
      { id: "goldfish", name: "Goldfish", minAmount: 100, maxAmount: 999, dailyReturn: 1.2, duration: 15 },
      { id: "dolphin", name: "Dolphin", minAmount: 1000, maxAmount: 4999, dailyReturn: 1.5, duration: 20 },
      { id: "shark", name: "Shark", minAmount: 5000, maxAmount: 14999, dailyReturn: 1.8, duration: 25 },
      { id: "whales", name: "Whales", minAmount: 15000, maxAmount: 50000, dailyReturn: 2.2, duration: 30 },
      { id: "accredited", name: "Accredited Investor", minAmount: 50000, maxAmount: 1000000, dailyReturn: 2.5, duration: 40 }
    ];
    
    return plans;
  } catch (error) {
    console.error("Error fetching investment plans:", error);
    return [];
  }
};
