
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ChartDataPoint, DashboardStats, TransactionItem } from "@/types/admin";
import StatCardsList from "./StatCardsList";
import TransactionChart from "./TransactionChart";
import RecentTransactionsPanel from "./RecentTransactionsPanel";

const DashboardContainer = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeInvestments: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
    pendingWithdrawals: 0,
    systemBalance: 0,
  });
  const [recentTransactions, setRecentTransactions] = useState<TransactionItem[]>([]);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch user count
      const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      
      // Fetch active investments count
      const { count: activeInvestmentsCount } = await supabase
        .from('investments')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');
      
      // Fetch total deposits
      const { data: deposits } = await supabase
        .from('transactions')
        .select('amount')
        .eq('type', 'deposit');
      
      const totalDeposits = deposits?.reduce((sum, item) => sum + Number(item.amount), 0) || 0;
      
      // Fetch total withdrawals
      const { data: withdrawals } = await supabase
        .from('transactions')
        .select('amount')
        .eq('type', 'withdrawal')
        .eq('status', 'completed');
      
      const totalWithdrawals = withdrawals?.reduce((sum, item) => sum + Number(item.amount), 0) || 0;
      
      // Fetch pending withdrawals
      const { data: pendingWithdrawals } = await supabase
        .from('transactions')
        .select('amount')
        .eq('type', 'withdrawal')
        .eq('status', 'pending');
      
      const totalPendingWithdrawals = pendingWithdrawals?.reduce((sum, item) => sum + Number(item.amount), 0) || 0;
      
      // Fetch system balance (sum of all wallet balances)
      const { data: wallets } = await supabase
        .from('wallets')
        .select('balance');
      
      const systemBalance = wallets?.reduce((sum, wallet) => sum + Number(wallet.balance), 0) || 0;
      
      // Fetch recent transactions
      const { data: transactions } = await supabase
        .from('transactions')
        .select(`
          id, 
          user_id, 
          type, 
          amount, 
          status, 
          created_at, 
          description, 
          created_by
        `)
        .order('created_at', { ascending: false })
        .limit(5);
      
      // Convert transactions to TransactionItem type with optional user property
      const transactionItems: TransactionItem[] = transactions?.map(transaction => ({
        ...transaction,
        description: transaction.description || null
      })) || [];
      
      // Prepare chart data (last 7 days of transactions)
      const today = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 6);
      
      const { data: weekTransactions } = await supabase
        .from('transactions')
        .select('*')
        .gte('created_at', sevenDaysAgo.toISOString())
        .order('created_at', { ascending: true });
      
      const dailyData: Record<string, { deposits: number; withdrawals: number }> = {};
      
      // Initialize the data structure for the past 7 days
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - (6 - i));
        const dateStr = date.toISOString().split('T')[0];
        dailyData[dateStr] = { deposits: 0, withdrawals: 0 };
      }
      
      // Fill in the actual transaction data
      weekTransactions?.forEach(transaction => {
        const dateStr = transaction.created_at.split('T')[0];
        if (dailyData[dateStr]) {
          if (transaction.type === 'deposit') {
            dailyData[dateStr].deposits += Number(transaction.amount);
          } else if (transaction.type === 'withdrawal') {
            dailyData[dateStr].withdrawals += Number(transaction.amount);
          }
        }
      });
      
      // Convert to array format for the chart
      const chartDataArray = Object.entries(dailyData).map(([date, data]) => ({
        date: date.substring(5), // Format as MM-DD
        deposits: data.deposits,
        withdrawals: data.withdrawals,
      }));
      
      setStats({
        totalUsers: userCount || 0,
        activeInvestments: activeInvestmentsCount || 0,
        totalDeposits,
        totalWithdrawals,
        pendingWithdrawals: totalPendingWithdrawals,
        systemBalance,
      });
      
      setRecentTransactions(transactionItems);
      setChartData(chartDataArray);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleApproveWithdrawal = async (transactionId: string) => {
    try {
      // Update transaction status
      const { error } = await supabase
        .from('transactions')
        .update({ status: 'completed' })
        .eq('id', transactionId);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Withdrawal approved successfully",
      });
      
      // Refresh data
      fetchDashboardData();
    } catch (error) {
      console.error("Error approving withdrawal:", error);
      toast({
        title: "Error",
        description: "Failed to approve withdrawal",
        variant: "destructive",
      });
    }
  };

  const handleRejectWithdrawal = async (transactionId: string) => {
    try {
      // Get transaction details
      const { data: transaction, error: fetchError } = await supabase
        .from('transactions')
        .select('*')
        .eq('id', transactionId)
        .single();
      
      if (fetchError) throw fetchError;
      
      // Update transaction status
      const { error: updateError } = await supabase
        .from('transactions')
        .update({ status: 'rejected' })
        .eq('id', transactionId);
      
      if (updateError) throw updateError;
      
      // Return funds to user's wallet
      const { data: wallet, error: walletFetchError } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', transaction.user_id)
        .single();
      
      if (walletFetchError) throw walletFetchError;
      
      const { error: walletUpdateError } = await supabase
        .from('wallets')
        .update({ 
          balance: wallet.balance + transaction.amount,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', transaction.user_id);
      
      if (walletUpdateError) throw walletUpdateError;
      
      toast({
        title: "Success",
        description: "Withdrawal rejected and funds returned to user",
      });
      
      // Refresh data
      fetchDashboardData();
    } catch (error) {
      console.error("Error rejecting withdrawal:", error);
      toast({
        title: "Error",
        description: "Failed to reject withdrawal",
        variant: "destructive",
      });
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
        onApproveWithdrawal={handleApproveWithdrawal}
        onRejectWithdrawal={handleRejectWithdrawal}
      />
    </div>
  );
};

export default DashboardContainer;
