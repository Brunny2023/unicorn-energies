
export interface WalletData {
  id: string;
  user_id: string;
  balance: number;
  accrued_profits: number;
  withdrawal_fee_percentage: number;
  total_deposits: number;
  total_withdrawals: number;
  updated_at?: string;
  created_at?: string;
}

export interface WithdrawalRequest {
  eligible: boolean;
  reason?: string;
  amount: number;
  fee: number;
  netAmount: number;
  method?: string;
  destination?: string;
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

export interface WithdrawalMethod {
  type: 'crypto' | 'bank' | 'digital_wallet';
  name: string;
  details: {
    [key: string]: string;
  };
  required_fields: string[];
}

export interface WithdrawalDestination {
  id?: string;
  user_id: string;
  method_type: 'crypto' | 'bank' | 'digital_wallet';
  name: string;
  details: {
    [key: string]: string;
  };
  is_default?: boolean;
  created_at?: string;
}

// Add this new table schema
export interface WithdrawalDestinationTable {
  id?: string;
  user_id: string;
  method_type: 'crypto' | 'bank' | 'digital_wallet';
  name: string;
  details: {
    [key: string]: string;
  };
  is_default?: boolean;
  created_at?: string;
}

// Add this for transaction metadata
export interface TransactionMetadata {
  destination?: WithdrawalDestination;
  [key: string]: any;
}

// Add this for notifications table
export interface Notification {
  id: string;
  user_id: string;
  type: string;
  message: string;
  metadata?: any;
  read: boolean;
  created_at: string;
}
