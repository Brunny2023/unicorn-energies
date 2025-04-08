import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { 
  Button,
  Card, 
  CardContent,
  ArrowUpRight,
  Wallet 
} from "@/components/admin/AdminImports";
import AdminLayout from "@/components/layout/AdminLayout";
import { formatCurrency } from "@/utils/investmentUtils";
import { useToast } from "@/hooks/use-toast";
import { WalletData, Transaction } from "@/types/investment";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeInvestments: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
    pendingWithdrawals: 0,
    systemBalance: 0,
  });
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

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
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      
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
      
      setRecentTransactions(transactions || []);
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
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white">Admin Dashboard</h2>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-unicorn-darkPurple/50 border-unicorn-gold/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Users</p>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    {loading ? "Loading..." : stats.totalUsers}
                  </h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-unicorn-gold/20 flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-unicorn-gold" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-unicorn-darkPurple/50 border-unicorn-gold/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Active Investments</p>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    {loading ? "Loading..." : stats.activeInvestments}
                  </h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-unicorn-gold/20 flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-unicorn-gold" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-unicorn-darkPurple/50 border-unicorn-gold/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Deposits</p>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    {loading ? "Loading..." : formatCurrency(stats.totalDeposits)}
                  </h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <ArrowUpRight className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-unicorn-darkPurple/50 border-unicorn-gold/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Withdrawals</p>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    {loading ? "Loading..." : formatCurrency(stats.totalWithdrawals)}
                  </h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <ArrowUpRight className="h-6 w-6 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-unicorn-darkPurple/50 border-unicorn-gold/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Pending Withdrawals</p>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    {loading ? "Loading..." : formatCurrency(stats.pendingWithdrawals)}
                  </h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <ArrowUpRight className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-unicorn-darkPurple/50 border-unicorn-gold/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">System Balance</p>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    {loading ? "Loading..." : formatCurrency(stats.systemBalance)}
                  </h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-unicorn-gold/20 flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-unicorn-gold" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Transaction Chart */}
        <Card className="bg-unicorn-darkPurple/50 border-unicorn-gold/30">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Transaction Overview (Last 7 Days)</h3>
            <div className="h-80">
              {loading ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-400">Loading chart data...</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="date" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1a2e', 
                        borderColor: '#444',
                        color: '#fff'
                      }} 
                    />
                    <Bar dataKey="deposits" name="Deposits" fill="#10B981" />
                    <Bar dataKey="withdrawals" name="Withdrawals" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Transactions */}
        <Card className="bg-unicorn-darkPurple/50 border-unicorn-gold/30">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Recent Transactions</h3>
            
            {loading ? (
              <div className="text-center py-4">
                <p className="text-gray-400">Loading transactions...</p>
              </div>
            ) : recentTransactions.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-gray-400">No recent transactions found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">User</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Amount</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                      <th className="text-right py-3 px-4 text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b border-gray-700/50 hover:bg-gray-800/20">
                        <td className="py-3 px-4 text-white">{transaction.user_id.substring(0, 8)}...</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            transaction.type === 'deposit' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-white">{formatCurrency(transaction.amount)}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            transaction.status === 'completed' 
                              ? 'bg-green-500/20 text-green-400' 
                              : transaction.status === 'pending'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-red-500/20 text-red-400'
                          }`}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-300">
                          {new Date(transaction.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {transaction.type === 'withdrawal' && transaction.status === 'pending' && (
                            <div className="flex justify-end space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-green-500 text-green-400 hover:bg-green-500/20"
                                onClick={() => handleApproveWithdrawal(transaction.id)}
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-500 text-red-400 hover:bg-red-500/20"
                                onClick={() => handleRejectWithdrawal(transaction.id)}
                              >
                                Reject
                              </Button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            <div className="mt-4 text-right">
              <Button variant="outline" className="border-unicorn-gold/50 text-unicorn-gold hover:bg-unicorn-gold/20">
                View All Transactions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
