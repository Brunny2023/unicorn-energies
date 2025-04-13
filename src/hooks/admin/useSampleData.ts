
import { ChartDataPoint, DashboardStats, TransactionItem } from '@/types/admin';

export const useSampleData = () => {
  const loadSampleStats = (): DashboardStats => {
    console.log("Loading sample stats for development");
    return {
      totalUsers: 152,
      activeInvestments: 87,
      totalDeposits: 540000,
      totalWithdrawals: 210000,
      pendingWithdrawals: 35000,
      systemBalance: 750000,
    };
  };
  
  const loadSampleTransactions = (): TransactionItem[] => {
    console.log("Loading sample transactions for development");
    return [
      {
        id: "tx-1",
        user_id: "user-1",
        type: "deposit",
        amount: 5000,
        status: "completed",
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        description: "Sample deposit transaction",
      },
      {
        id: "tx-2",
        user_id: "user-2",
        type: "withdrawal",
        amount: 2000,
        status: "pending",
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        description: "Sample withdrawal transaction",
      },
    ];
  };
  
  const loadSampleChartData = (): ChartDataPoint[] => {
    console.log("Loading sample chart data for development");
    return [
      { date: "04-06", deposits: 25000, withdrawals: 10000 },
      { date: "04-07", deposits: 30000, withdrawals: 12000 },
      { date: "04-08", deposits: 22000, withdrawals: 8000 },
      { date: "04-09", deposits: 28000, withdrawals: 15000 },
      { date: "04-10", deposits: 35000, withdrawals: 18000 },
      { date: "04-11", deposits: 32000, withdrawals: 14000 },
      { date: "04-12", deposits: 38000, withdrawals: 16000 },
    ];
  };

  return {
    loadSampleStats,
    loadSampleTransactions,
    loadSampleChartData
  };
};
