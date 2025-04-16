
import React, { useEffect } from "react";
import { useDashboardData } from "./hooks/useDashboardData";
import { useTransactionActions } from "./hooks/useTransactionActions";
import StatCardsList from "./StatCardsList";
import TransactionChart from "./TransactionChart";
import RecentTransactionsPanel from "./RecentTransactionsPanel";

const DashboardContainer = () => {
  const { loading, stats, recentTransactions, chartData, fetchDashboardData } = useDashboardData();
  const { handleApproveWithdrawal, handleRejectWithdrawal, processing } = useTransactionActions(fetchDashboardData);

  useEffect(() => {
    console.log("Admin DashboardContainer rendered", { 
      loading, 
      statsLoaded: !!stats, 
      transactionsLoaded: recentTransactions.length,
      chartDataLoaded: chartData.length 
    });
  }, [loading, stats, recentTransactions, chartData]);

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

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white">Admin Dashboard</h2>
        <div className="flex items-center justify-center py-12">
          <div className="h-12 w-12 border-t-4 border-unicorn-gold border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

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
