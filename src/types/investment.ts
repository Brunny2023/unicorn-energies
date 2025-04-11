export interface WalletData {
  id: string;
  balance: number;
  accrued_profits: number;
  withdrawal_fee_percentage: number;
  user_id: string;
}

export interface WithdrawalRequest {
  eligible: boolean;
  reason?: string;
  amount: number;
  fee: number;
  netAmount: number;
}

export interface Investment {
  id: string;
  user_id: string;
  plan_id: string;
  amount: number;
  daily_return: number;
  duration: number;
  total_return: number;
  status: string;
  created_at: string;
  start_date: string;
  end_date: string;
}
