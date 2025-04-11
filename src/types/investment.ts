
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

// Adding the missing types that are being referenced
export interface Plan {
  id: string;
  name: string;
  minAmount: number;
  maxAmount: number;
  dailyReturn: number;
  duration: number;
}

export interface CalculationResults {
  dailyProfit: number;
  totalProfit: number;
  totalReturn: number;
}

export interface Ticket {
  id: string;
  user_id: string;
  subject: string;
  status: string;
  priority: string;
  created_at: string;
  category: string;
  last_reply_at?: string;
  closed_at?: string;
}

export interface TicketMessage {
  id: string;
  ticket_id: string;
  user_id: string;
  is_admin: boolean;
  content: string;
  created_at: string;
  attachments?: string[];
}
