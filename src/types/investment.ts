
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

export type Investment = {
  id: string;
  plan_id: string;
  amount: number;
  dailyReturn: number;
  duration: number;
  startDate: string;
  endDate: string;
  totalReturn: number;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
};

export type WithdrawalRequest = {
  amount: number;
  fee: number;
  netAmount: number;
  eligible: boolean;
  reason?: string;
};
