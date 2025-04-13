export interface WalletData {
  id: string;
  user_id: string;
  balance: number;
  accrued_profits: number;
  withdrawal_fee_percentage: number;
  total_deposits?: number;
  total_withdrawals?: number;
  updated_at?: string;
  created_at?: string;
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
  returnPercentage: number;
  annualYield: number;
  duration: number;
}

export interface Ticket {
  id: string;
  user_id: string;
  subject: string;
  message: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed' | 'replied';
  priority: 'low' | 'medium' | 'high';
  category: string;
  created_at: string;
  updated_at?: string;
  ai_response?: string;
  ai_responded_at?: string;
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

export interface LoanApplication {
  id: string;
  user_id: string;
  amount: number;
  purpose?: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes?: string;
  created_at: string;
  updated_at: string;
  approved_by?: string;
  approved_at?: string;
}

export interface AffiliateReward {
  id: string;
  user_id: string;
  source_investment_id: string;
  amount: number;
  level: number;
  status: 'pending' | 'processed';
  created_at: string;
  processed_at?: string;
}

export interface NotificationPreferences {
  id: string;
  user_id: string;
  interest_payments: boolean;
  loan_updates: boolean;
  affiliate_rewards: boolean;
  created_at: string;
  updated_at: string;
}
