
export type WalletData = {
  id: string;
  balance: number;
  accrued_profits: number;
  withdrawal_fee_percentage: number;
};

export type Investment = {
  id: string;
  plan_id: string;
  user_id: string;
  amount: number;
  dailyReturn: number;
  duration: number;
  startDate: string;
  endDate: string;
  totalReturn: number;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
};

export type Transaction = {
  id: string;
  user_id: string;
  amount: number;
  type: string;
  status: string;
  description?: string;
  created_at: string;
};

// Add missing types referenced by other components
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

export type WithdrawalRequest = {
  amount: number;
  fee: number;
  netAmount: number;
};

// Add ticket types
export type Ticket = {
  id: string;
  user_id: string;
  subject: string;
  message: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
  ai_response?: string;
  ai_responded_at?: string;
};
