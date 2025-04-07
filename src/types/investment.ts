
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
