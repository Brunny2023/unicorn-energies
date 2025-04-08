
export type WalletData = {
  id: string;
  balance: number;
  accrued_profits: number;
  withdrawal_fee_percentage: number;
  user_id: string;
  created_at?: string;
  updated_at?: string;
};

export type Investment = {
  id: string;
  plan_id: string;
  user_id: string;
  amount: number;
  daily_return: number; // Database column name
  duration: number;
  start_date: string; // Database column name
  end_date: string; // Database column name
  total_return: number; // Database column name
  status: 'active' | 'completed' | 'cancelled';
  created_at: string;
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

export type Plan = {
  id: string;
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
  eligible: boolean;
  reason?: string;
};

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
