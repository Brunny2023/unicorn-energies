
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ChartDataPoint, DashboardStats } from '@/types/admin';

export const useDashboardStats = () => {
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
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    console.log("useDashboardStats hook running with user:", user);
    if (user) {
      fetchDashboardStats();
    } else {
      loadSampleStats();
    }
  }, [user]);

  const loadSampleStats = () => {
    console.log("Loading sample stats data for development");
    // Sample data for dashboard
    const sampleStats = {
      totalUsers: 152,
      activeInvestments: 87,
      totalDeposits: 540000,
      totalWithdrawals: 210000,
      pendingWithdrawals: 35000,
      systemBalance: 750000,
    };
    
    const sampleChartData = [
      { date: "04-06", deposits: 25000, withdrawals: 10000 },
      { date: "04-07", deposits: 30000, withdrawals: 12000 },
      { date: "04-08", deposits: 22000, withdrawals: 8000 },
      { date: "04-09", deposits: 28000, withdrawals: 15000 },
      { date: "04-10", deposits: 35000, withdrawals: 18000 },
      { date: "04-11", deposits: 32000, withdrawals: 14000 },
      { date: "04-12", deposits: 38000, withdrawals: 16000 },
    ];
    
    setStats(sampleStats);
    setChartData(sampleChartData);
    setLoading(false);
  };

  const fetchDashboardStats = async () => {
    try {
      console.log("Fetching dashboard stats...");
      setLoading(true);
      
      // First check if we can connect to Supabase
      try {
        const { data: testConnection, error: testError } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
        if (testError) {
          console.error("Error connecting to Supabase:", testError);
          loadSampleStats();
          return;
        }
        console.log("Successfully connected to Supabase");
      } catch (connectionError) {
        console.error("Failed to connect to Supabase:", connectionError);
        loadSampleStats();
        return;
      }
      
      // Fetch user count
      let userCount = 0;
      try {
        const { count, error: userCountError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        
        if (userCountError) {
          console.error("Error fetching user count:", userCountError);
        } else {
          userCount = count || 0;
          console.log("User count:", userCount);
        }
      } catch (error) {
        console.error("Failed to fetch user count:", error);
      }
      
      // Fetch active investments count
      let activeInvestmentsCount = 0;
      try {
        const { count, error: investmentCountError } = await supabase
          .from('investments')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'active');
        
        if (investmentCountError) {
          console.error("Error fetching active investments count:", investmentCountError);
        } else {
          activeInvestmentsCount = count || 0;
          console.log("Active investments count:", activeInvestmentsCount);
        }
      } catch (error) {
        console.error("Failed to fetch active investments count:", error);
      }
      
      // Fetch transactions data
      let deposits = [];
      let withdrawals = [];
      let pendingWithdrawals = [];
      
      try {
        const { data: depositsData, error: depositsError } = await supabase
          .from('transactions')
          .select('amount')
          .eq('type', 'deposit');
        
        if (depositsError) {
          console.error("Error fetching deposits:", depositsError);
        } else {
          deposits = depositsData || [];
          console.log("Deposits data:", deposits);
        }
        
        const { data: withdrawalsData, error: withdrawalsError } = await supabase
          .from('transactions')
          .select('amount')
          .eq('type', 'withdrawal')
          .eq('status', 'completed');
        
        if (withdrawalsError) {
          console.error("Error fetching withdrawals:", withdrawalsError);
        } else {
          withdrawals = withdrawalsData || [];
          console.log("Withdrawals data:", withdrawals);
        }
        
        const { data: pendingWithdrawalsData, error: pendingError } = await supabase
          .from('transactions')
          .select('amount')
          .eq('type', 'withdrawal')
          .eq('status', 'pending');
        
        if (pendingError) {
          console.error("Error fetching pending withdrawals:", pendingError);
        } else {
          pendingWithdrawals = pendingWithdrawalsData || [];
          console.log("Pending withdrawals data:", pendingWithdrawals);
        }
      } catch (error) {
        console.error("Failed to fetch transaction data:", error);
      }
      
      // Calculate totals
      const totalDeposits = deposits?.reduce((sum, item) => sum + Number(item.amount), 0) || 0;
      const totalWithdrawals = withdrawals?.reduce((sum, item) => sum + Number(item.amount), 0) || 0;
      const totalPendingWithdrawals = pendingWithdrawals?.reduce((sum, item) => sum + Number(item.amount), 0) || 0;
      
      // Fetch system balance
      let wallets = [];
      try {
        const { data: walletsData, error: walletsError } = await supabase
          .from('wallets')
          .select('balance');
        
        if (walletsError) {
          console.error("Error fetching wallets:", walletsError);
        } else {
          wallets = walletsData || [];
          console.log("Wallets data:", wallets);
        }
      } catch (error) {
        console.error("Failed to fetch wallets data:", error);
      }
      
      const systemBalance = wallets?.reduce((sum, wallet) => sum + Number(wallet.balance), 0) || 0;
      
      // Prepare chart data (last 7 days of transactions)
      const chartDataArray = await fetchChartData();
      
      // Set all state
      setStats({
        totalUsers: userCount,
        activeInvestments: activeInvestmentsCount,
        totalDeposits,
        totalWithdrawals,
        pendingWithdrawals: totalPendingWithdrawals,
        systemBalance,
      });
      
      setChartData(chartDataArray);
      
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
      loadSampleStats();
    } finally {
      setLoading(false);
    }
  };

  const fetchChartData = async (): Promise<ChartDataPoint[]> => {
    try {
      const today = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 6);
      
      try {
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
        return Object.entries(dailyData).map(([date, data]) => ({
          date: date.substring(5), // Format as MM-DD
          deposits: data.deposits,
          withdrawals: data.withdrawals,
        }));
      } catch (error) {
        console.error("Error processing chart data:", error);
        return generateSampleChartData();
      }
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
    loading,
    stats,
    chartData,
    fetchDashboardStats
  };
};
