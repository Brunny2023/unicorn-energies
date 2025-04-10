
import React from 'react';
import { DashboardStats } from '@/types/admin';
import StatCard from './StatCard';
import { ArrowUpRight, Wallet } from 'lucide-react';
import { formatCurrency } from '@/utils/investmentUtils';

interface StatCardsListProps {
  stats: DashboardStats;
  loading: boolean;
}

const StatCardsList: React.FC<StatCardsListProps> = ({ stats, loading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard
        title="Total Users"
        value={loading ? "Loading..." : stats.totalUsers}
        icon={Wallet}
        iconColor="text-unicorn-gold"
        bgColor="bg-unicorn-gold/20"
      />
      
      <StatCard
        title="Active Investments"
        value={loading ? "Loading..." : stats.activeInvestments}
        icon={Wallet}
        iconColor="text-unicorn-gold"
        bgColor="bg-unicorn-gold/20"
      />
      
      <StatCard
        title="Total Deposits"
        value={loading ? "Loading..." : formatCurrency(stats.totalDeposits)}
        icon={ArrowUpRight}
        iconColor="text-green-500"
        bgColor="bg-green-500/20"
      />
      
      <StatCard
        title="Total Withdrawals"
        value={loading ? "Loading..." : formatCurrency(stats.totalWithdrawals)}
        icon={ArrowUpRight}
        iconColor="text-red-500"
        bgColor="bg-red-500/20"
      />
      
      <StatCard
        title="Pending Withdrawals"
        value={loading ? "Loading..." : formatCurrency(stats.pendingWithdrawals)}
        icon={ArrowUpRight}
        iconColor="text-yellow-500"
        bgColor="bg-yellow-500/20"
      />
      
      <StatCard
        title="System Balance"
        value={loading ? "Loading..." : formatCurrency(stats.systemBalance)}
        icon={Wallet}
        iconColor="text-unicorn-gold"
        bgColor="bg-unicorn-gold/20"
      />
    </div>
  );
};

export default StatCardsList;
