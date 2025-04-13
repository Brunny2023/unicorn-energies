
import React from "react";
import { useDashboardData } from "./hooks/useDashboardData";
import { useTransactionActions } from "./hooks/useTransactionActions";
import StatCardsList from "./StatCardsList";
import TransactionChart from "./TransactionChart";
import RecentTransactionsPanel from "./RecentTransactionsPanel";

const DashboardContainer = () => {
  const { loading, stats, recentTransactions, chartData, fetchDashboardData } = useDashboardData();
  const { handleApproveWithdrawal, handleRejectWithdrawal, processing } = useTransactionActions(fetchDashboardData);

  // Wrapper functions to adapt the transaction actions to the expected interface
  const onApproveWithdrawal = (id: string) => {
    const transaction = recentTransactions.find(t => t.id === id);
    if (transaction) {
      handleApproveWithdrawal(id, transaction.user_id, transaction.amount);
    }
  };

  const onRejectWithdrawal = (id: string) => {
    const transaction = recentTransactions.find(t => t.id === id);
    if (transaction) {
      handleRejectWithdrawal(id, transaction.user_id, transaction.amount);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white">Admin Dashboard</h2>
      
      {/* Stats Cards */}
      <StatCardsList stats={stats} loading={loading} />
      
      {/* Transaction Chart */}
      <TransactionChart data={chartData} loading={loading} />
      
      {/* Recent Transactions */}
      <RecentTransactionsPanel 
        transactions={recentTransactions} 
        loading={loading}
        onApproveWithdrawal={onApproveWithdrawal}
        onRejectWithdrawal={onRejectWithdrawal}
        processingId={processing}
      />
    </div>
  );
};

export default DashboardContainer;
