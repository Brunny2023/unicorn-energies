
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { DashboardStats, TransactionItem, ChartDataPoint } from '@/types/admin';
import { useUserData } from './useUserData';
import { useInvestmentData } from './useInvestmentData';
import { useTransactionData } from './useTransactionData';
import { useWalletData } from './useWalletData';
import { useSampleData } from './useSampleData';

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
  const { fetchUserCount } = useUserData();
  const { fetchActiveInvestmentsCount } = useInvestmentData();
  const { fetchTransactionTotals, fetchRecentTransactions, fetchChartData } = useTransactionData();
  const { fetchWalletBalances } = useWalletData();
  const { loadSampleStats, loadSampleTransactions, loadSampleChartData } = useSampleData();

  useEffect(() => {
    console.log("useDashboardData hook running with user:", user);
    if (user) {
      fetchDashboardData();
    } else {
      // For development, load sample data if no user
      loadSampleData();
    }
  }, [user]);

  const loadSampleData = () => {
    setStats(loadSampleStats());
    setRecentTransactions(loadSampleTransactions());
    setChartData(loadSampleChartData());
    setLoading(false);
  };

  const fetchDashboardData = async () => {
    try {
      console.log("Fetching dashboard data...");
      setLoading(true);
      
      // Check if we can connect to Supabase
      try {
        const userCount = await fetchUserCount();
        
        if (userCount === 0) {
          // Fall back to sample data if can't fetch user count
          console.log("Could not fetch user count, falling back to sample data");
          loadSampleData();
          return;
        }
        
        // Fetch all data in parallel
        const [
          activeInvestmentsCount,
          transactionTotals,
          systemBalance,
          transactions,
          chartDataArray
        ] = await Promise.all([
          fetchActiveInvestmentsCount(),
          fetchTransactionTotals(),
          fetchWalletBalances(),
          fetchRecentTransactions(),
          fetchChartData()
        ]);
        
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
        console.error("Error connecting to Supabase:", error);
        // Fall back to sample data if there's an error
        loadSampleData();
        return;
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
      // Fall back to sample data if there's an error
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
    fetchDashboardData
  };
};
