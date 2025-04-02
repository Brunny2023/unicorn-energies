
export type Plan = {
  name: string;
  minAmount: number;
  maxAmount: number;
  dailyReturn: number;
  duration: number;
};

export type CalculationResults = {
  dailyProfit: number;
  totalProfit: number;
  totalReturn: number;
} | null;
