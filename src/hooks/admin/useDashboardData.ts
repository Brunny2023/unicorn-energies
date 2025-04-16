
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { DashboardStats, TransactionItem, ChartDataPoint } from '@/types/admin';
import { useSampleData } from './useSampleData';

// Separate hook for fetching user count
const useUserCount = () => {
  const fetchUserCount = async (): Promise<number> => {
    try {
      console.log("Fetching user count...");
      const { count, error } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.error("Error fetching user count:", error);
        return 0;
      }
      
      return count || 0;
    } catch (error) {
      console.error("Failed to fetch user count:", error);
      return 0;
    }
  };
  
  return { fetchUserCount };
};

// Separate hook for fetching investment data
const useInvestmentsData = () => {
  const fetchActiveInvestmentsCount = async (): Promise<number> => {
    try {
      console.log("Fetching active investments count...");
      const { count, error } = await supabase
        .from('investments')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');
      
      if (error) {
        console.error("Error fetching active investments count:", error);
        return 0;
      }
      
      return count || 0;
    } catch (error) {
      console.error("Failed to fetch active investments count:", error);
      return 0;
    }
  };
  
  return { fetchActiveInvestmentsCount };
};

// Separate hook for fetching transactions data
const useTransactionsData = () => {
  const fetchTransactionTotals = async (): Promise<{
    totalDeposits: number;
    totalWithdrawals: number;
    totalPendingWithdrawals: number;
  }> => {
    try {
      console.log("Fetching transaction totals...");
      
      // Fetch deposits
      const { data: depositsData, error: depositsError } = await supabase
        .from('transactions')
        .select('amount')
        .eq('type', 'deposit');
      
      if (depositsError) {
        console.error("Error fetching deposits:", depositsError);
        return { totalDeposits: 0, totalWithdrawals: 0, totalPendingWithdrawals: 0 };
      }
      
      // Fetch completed withdrawals
      const { data: withdrawalsData, error: withdrawalsError } = await supabase
        .from('transactions')
        .select('amount')
        .eq('type', 'withdrawal')
        .eq('status', 'completed');
      
      if (withdrawalsError) {
        console.error("Error fetching withdrawals:", withdrawalsError);
        return { 
          totalDeposits: depositsData ? depositsData.reduce((sum, item) => sum + Number(item.amount), 0) : 0, 
          totalWithdrawals: 0, 
          totalPendingWithdrawals: 0 
        };
      }
      
      // Fetch pending withdrawals
      const { data: pendingWithdrawalsData, error: pendingError } = await supabase
        .from('transactions')
        .select('amount')
        .eq('type', 'withdrawal')
        .eq('status', 'pending');
      
      if (pendingError) {
        console.error("Error fetching pending withdrawals:", pendingError);
        return { 
          totalDeposits: depositsData ? depositsData.reduce((sum, item) => sum + Number(item.amount), 0) : 0, 
          totalWithdrawals: withdrawalsData ? withdrawalsData.reduce((sum, item) => sum + Number(item.amount), 0) : 0, 
          totalPendingWithdrawals: 0 
        };
      }
      
      // Calculate totals
      const totalDeposits = depositsData ? depositsData.reduce((sum, item) => sum + Number(item.amount), 0) : 0;
      const totalWithdrawals = withdrawalsData ? withdrawalsData.reduce((sum, item) => sum + Number(item.amount), 0) : 0;
      const totalPendingWithdrawals = pendingWithdrawalsData ? pendingWithdrawalsData.reduce((sum, item) => sum + Number(item.amount), 0) : 0;
      
      return { totalDeposits, totalWithdrawals, totalPendingWithdrawals };
    } catch (error) {
      console.error("Failed to fetch transaction totals:", error);
      return { totalDeposits: 0, totalWithdrawals: 0, totalPendingWithdrawals: 0 };
    }
  };
  
  const fetchRecentTransactions = async (): Promise<TransactionItem[]> => {
    try {
      console.log("Fetching recent transactions...");
      const { data, error } = await supabase
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
      
      if (error) {
        console.error("Error fetching recent transactions:", error);
        return [];
      }
      
      return data.map(transaction => ({
        ...transaction,
        description: transaction.description || null
      })) || [];
    } catch (error) {
      console.error("Failed to fetch recent transactions:", error);
      return [];
    }
  };
  
  const fetchChartData = async (): Promise<ChartDataPoint[]> => {
    try {
      console.log("Fetching chart data...");
      const today = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 6);
      
      const { data: weekTransactions, error } = await supabase
        .from('transactions')
        .select('*')
        .gte('created_at', sevenDaysAgo.toISOString())
        .order('created_at', { ascending: true });
      
      if (error) {
        console.error("Error fetching week transactions:", error);
        return generateSampleChartData();
      }
      
      if (!weekTransactions || weekTransactions.length === 0) {
        console.log("No transaction data found for chart, using sample data");
        return generateSampleChartData();
      }
      
      const dailyData: Record<string, { deposits: number; withdrawals: number }> = {};
      
      // Initialize the data structure for the past 7 days
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - (6 - i));
        const dateStr = date.toISOString().split('T')[0];
        dailyData[dateStr] = { deposits: 0, withdrawals: 0 };
      }
      
      // Fill in the actual transaction data
      weekTransactions.forEach(transaction => {
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
      return Object.entries(dailyData).map(([date, data]) => ({
        date: date.substring(5), // Format as MM-DD
        deposits: data.deposits,
        withdrawals: data.withdrawals,
      }));
    } catch (error) {
      console.error("Error in fetchChartData:", error);
      return generateSampleChartData();
    }
  };
  
  const generateSampleChartData = (): ChartDataPoint[] => {
    const today = new Date();
    const result: ChartDataPoint[] = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      
      result.push({
        date: dateStr,
        deposits: Math.floor(Math.random() * 20000 + 10000),
        withdrawals: Math.floor(Math.random() * 10000 + 5000),
      });
    }
    
    return result;
  };
  
  return { 
    fetchTransactionTotals, 
    fetchRecentTransactions, 
    fetchChartData,
    generateSampleChartData
  };
};

// Separate hook for fetching wallet data
const useWalletData = () => {
  const fetchWalletBalances = async (): Promise<number> => {
    try {
      console.log("Fetching wallet balances...");
      const { data, error } = await supabase
        .from('wallets')
        .select('balance');
      
      if (error) {
        console.error("Error fetching wallets:", error);
        return 0;
      }
      
      return data ? data.reduce((sum, wallet) => sum + Number(wallet.balance), 0) : 0;
    } catch (error) {
      console.error("Failed to fetch wallet balances:", error);
      return 0;
    }
  };
  
  return { fetchWalletBalances };
};

// Main dashboard data hook
export const useDashboardData = () => {
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

  // Hook imports
  const { fetchUserCount } = useUserCount();
  const { fetchActiveInvestmentsCount } = useInvestmentsData();
  const { fetchTransactionTotals, fetchRecentTransactions, fetchChartData, generateSampleChartData } = useTransactionsData();
  const { fetchWalletBalances } = useWalletData();
  const { loadSampleStats, loadSampleTransactions, loadSampleChartData } = useSampleData();

  useEffect(() => {
    console.log("useDashboardData hook running with user:", user);
    if (user) {
      fetchDashboardData();
    } else {
      console.log("No user found, loading sample data");
      loadSampleData();
    }
  }, [user]);

  const loadSampleData = () => {
    console.log("Loading sample data");
    setStats(loadSampleStats());
    setRecentTransactions(loadSampleTransactions());
    setChartData(loadSampleChartData());
    setLoading(false);
  };

  const fetchDashboardData = async () => {
    try {
      console.log("Fetching dashboard data...");
      setLoading(true);
      
      // First try to fetch the user count to check connection
      const userCount = await fetchUserCount();
      console.log("User count fetched:", userCount);
      
      if (userCount === 0) {
        console.log("Could not fetch data from Supabase, falling back to sample data");
        loadSampleData();
        return;
      }
      
      // If we got here, we can fetch the rest of the data
      const activeInvestmentsCount = await fetchActiveInvestmentsCount();
      const transactionTotals = await fetchTransactionTotals();
      const systemBalance = await fetchWalletBalances();
      const transactions = await fetchRecentTransactions();
      const chartDataArray = await fetchChartData();
      
      console.log("Data fetched successfully", {
        userCount,
        activeInvestmentsCount,
        transactionTotals,
        systemBalance,
        transactions: transactions.length,
        chartData: chartDataArray.length
      });
      
      // Set all state
      setStats({
        totalUsers: userCount,
        activeInvestments: activeInvestmentsCount,
        totalDeposits: transactionTotals.totalDeposits,
        totalWithdrawals: transactionTotals.totalWithdrawals,
        pendingWithdrawals: transactionTotals.totalPendingWithdrawals,
        systemBalance,
      });
      
      setRecentTransactions(transactions);
      setChartData(chartDataArray);
      
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
      
      // Fall back to sample data
      loadSampleData();
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    stats,
    recentTransactions,
    chartData,
    fetchDashboardData,
  };
};
