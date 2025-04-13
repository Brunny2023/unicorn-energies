
import { ChartDataPoint, DashboardStats, TransactionItem } from '@/types/admin';

export const useSampleData = () => {
  const loadSampleStats = (): DashboardStats => {
    console.log("Loading sample stats for development");
    return {
      totalUsers: 352,
      activeInvestments: 187,
      totalDeposits: 1540000,
      totalWithdrawals: 710000,
      pendingWithdrawals: 85000,
      systemBalance: 2350000,
    };
  };
  
  const loadSampleTransactions = (): TransactionItem[] => {
    console.log("Loading sample transactions for development");
    return [
      {
        id: "tx-1",
        user_id: "user-1",
        type: "deposit",
        amount: 15000,
        status: "completed",
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        description: "Sample deposit transaction",
      },
      {
        id: "tx-2",
        user_id: "user-2",
        type: "withdrawal",
        amount: 6000,
        status: "pending",
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        description: "Sample withdrawal transaction",
      },
    ];
  };
  
  const loadSampleChartData = (): ChartDataPoint[] => {
    console.log("Loading sample chart data for development");
    return [
      { date: "04-06", deposits: 125000, withdrawals: 60000 },
      { date: "04-07", deposits: 130000, withdrawals: 72000 },
      { date: "04-08", deposits: 122000, withdrawals: 68000 },
      { date: "04-09", deposits: 128000, withdrawals: 75000 },
      { date: "04-10", deposits: 135000, withdrawals: 78000 },
      { date: "04-11", deposits: 132000, withdrawals: 74000 },
      { date: "04-12", deposits: 138000, withdrawals: 76000 },
    ];
  };

  return {
    loadSampleStats,
    loadSampleTransactions,
    loadSampleChartData
  };
};
