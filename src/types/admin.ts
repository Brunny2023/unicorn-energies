
import { User } from "@supabase/supabase-js";

export interface TransactionItem {
  id: string;
  user_id: string;
  type: string;
  amount: number;
  status: string;
  created_at: string;
  description: string | null;
  user: {
    email: string;
    full_name: string | null;
  };
}

export interface AdminUser {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  created_at: string;
}

export interface UserWallet {
  id: string;
  balance: number;
  accrued_profits?: number;
}

export interface DashboardStats {
  totalUsers: number;
  activeInvestments: number;
  totalDeposits: number;
  totalWithdrawals: number;
  pendingWithdrawals: number;
  systemBalance: number;
}

export interface ChartDataPoint {
  date: string;
  deposits: number;
  withdrawals: number;
}
