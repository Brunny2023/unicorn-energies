
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ChartDataPoint, TransactionItem } from '@/types/admin';

export const useTransactionData = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const fetchTransactionTotals = async () => {
    setLoading(true);
    try {
      console.log("Fetching transaction totals...");
      
      // Try to connect to Supabase
      try {
        const { error: testError } = await supabase.from('transactions').select('count', { count: 'exact', head: true });
        if (testError) {
          console.error("Error connecting to Supabase for transactions:", testError);
          return { totalDeposits: 0, totalWithdrawals: 0, totalPendingWithdrawals: 0 };
        }
        console.log("Successfully connected to Supabase for transactions");
      } catch (connectionError) {
        console.error("Failed to connect to Supabase for transactions:", connectionError);
        return { totalDeposits: 0, totalWithdrawals: 0, totalPendingWithdrawals: 0 };
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
      
      return { totalDeposits, totalWithdrawals, totalPendingWithdrawals };
    } catch (error) {
      console.error("Error in fetchTransactionTotals:", error);
      toast({
        title: "Error",
        description: "Failed to fetch transaction data",
        variant: "destructive",
      });
      return { totalDeposits: 0, totalWithdrawals: 0, totalPendingWithdrawals: 0 };
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentTransactions = async () => {
    setLoading(true);
    try {
      console.log("Fetching recent transactions...");
      
      // Try to connect to Supabase
      try {
        const { error: testError } = await supabase.from('transactions').select('count', { count: 'exact', head: true });
        if (testError) {
          console.error("Error connecting to Supabase for transactions:", testError);
          return [];
        }
        console.log("Successfully connected to Supabase for recent transactions");
      } catch (connectionError) {
        console.error("Failed to connect to Supabase for recent transactions:", connectionError);
        return [];
      }
      
      // Fetch recent transactions
      let transactions = [];
      try {
        const { data: transactionsData, error: transactionsError } = await supabase
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
        
        if (transactionsError) {
          console.error("Error fetching transactions:", transactionsError);
          return [];
        } else {
          transactions = transactionsData || [];
          console.log("Recent transactions:", transactions);
        }
      } catch (error) {
        console.error("Failed to fetch recent transactions:", error);
        return [];
      }
      
      // Convert transactions to TransactionItem type
      const transactionItems: TransactionItem[] = transactions?.map(transaction => ({
        ...transaction,
        description: transaction.description || null
      })) || [];
      
      return transactionItems;
    } catch (error) {
      console.error("Error in fetchRecentTransactions:", error);
      toast({
        title: "Error",
        description: "Failed to fetch recent transactions",
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchChartData = async (): Promise<ChartDataPoint[]> => {
    setLoading(true);
    try {
      console.log("Fetching chart data...");
      const today = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 6);
      
      // Try to fetch transaction data for the chart
      try {
        const { data: weekTransactions, error } = await supabase
          .from('transactions')
          .select('*')
          .gte('created_at', sevenDaysAgo.toISOString())
          .order('created_at', { ascending: true });
        
        if (error) {
          console.error("Error fetching week transactions:", error);
          // Return sample data if there's an error
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
    } finally {
      setLoading(false);
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
    fetchTransactionTotals,
    fetchRecentTransactions,
    fetchChartData
  };
};
