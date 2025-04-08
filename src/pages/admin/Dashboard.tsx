import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, CreditCard, ArrowUpRight, Wallet } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import AdminRoute from "@/components/auth/AdminRoute";

interface WalletSummary {
  totalBalance: number;
  walletCount: number;
}

interface UsersSummary {
  totalUsers: number;
  admins: number;
}

interface TransactionsSummary {
  totalTransactions: number;
  totalVolume: number;
  deposits: number;
  withdrawals: number;
  credits: number;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [walletSummary, setWalletSummary] = useState<WalletSummary>({
    totalBalance: 0,
    walletCount: 0,
  });
  const [usersSummary, setUsersSummary] = useState<UsersSummary>({
    totalUsers: 0,
    admins: 0,
  });
  const [transactionsSummary, setTransactionsSummary] = useState<TransactionsSummary>({
    totalTransactions: 0,
    totalVolume: 0,
    deposits: 0,
    withdrawals: 0,
    credits: 0,
  });

  const chartData = [
    { name: "Jan", deposits: 5000, withdrawals: 1000 },
    { name: "Feb", deposits: 7000, withdrawals: 2000 },
    { name: "Mar", deposits: 8500, withdrawals: 2500 },
    { name: "Apr", deposits: 10000, withdrawals: 3000 },
    { name: "May", deposits: 12000, withdrawals: 3500 },
    { name: "Jun", deposits: 16000, withdrawals: 4000 },
    { name: "Jul", deposits: 18000, withdrawals: 4200 },
  ];

  useEffect(() => {
    fetchAdminDashboardData();
  }, []);

  const fetchAdminDashboardData = async () => {
    setLoading(true);
    try {
      const { data: wallets, error: walletsError } = await supabase
        .from('wallets')
        .select('balance');

      if (walletsError) throw walletsError;
      
      const totalBalance = wallets?.reduce((sum, wallet) => sum + wallet.balance, 0) || 0;

      setWalletSummary({
        totalBalance,
        walletCount: wallets?.length || 0,
      });

      const { data: users, error: usersError } = await supabase
        .from('profiles')
        .select('role');

      if (usersError) throw usersError;

      const admins = users?.filter(user => user.role === 'admin').length || 0;

      setUsersSummary({
        totalUsers: users?.length || 0,
        admins,
      });

      const { data: transactions, error: transactionsError } = await supabase
        .from('transactions')
        .select('type, amount');

      if (transactionsError) throw transactionsError;

      const deposits = transactions?.filter(t => t.type === 'deposit').length || 0;
      const withdrawals = transactions?.filter(t => t.type === 'withdrawal').length || 0;
      const credits = transactions?.filter(t => t.type === 'credit').length || 0;
      const totalVolume = transactions?.reduce((sum, t) => sum + t.amount, 0) || 0;

      setTransactionsSummary({
        totalTransactions: transactions?.length || 0,
        totalVolume,
        deposits,
        withdrawals,
        credits,
      });
      
    } catch (error) {
      console.error('Error fetching admin dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout isAdmin>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-white">Admin Dashboard</h2>
          <Button onClick={fetchAdminDashboardData} variant="outline" className="border-unicorn-gold text-unicorn-gold hover:bg-unicorn-gold/20">
            Refresh Data
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-300">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-unicorn-gold" />
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-9 w-20 bg-gray-700/50 rounded"></div>
                  </div>
                ) : (
                  <div className="text-3xl font-bold text-white">{usersSummary.totalUsers}</div>
                )}
              </div>
              <div className="mt-2 text-sm text-gray-400">
                Including {usersSummary.admins} admin{usersSummary.admins !== 1 ? 's' : ''}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-300">Total Wallet Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Wallet className="mr-2 h-5 w-5 text-unicorn-gold" />
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-9 w-28 bg-gray-700/50 rounded"></div>
                  </div>
                ) : (
                  <div className="text-3xl font-bold text-white">
                    ${walletSummary.totalBalance.toFixed(2)}
                  </div>
                )}
              </div>
              <div className="mt-2 text-sm text-gray-400">
                Across {walletSummary.walletCount} wallet{walletSummary.walletCount !== 1 ? 's' : ''}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-300">Transaction Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-unicorn-gold" />
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-9 w-28 bg-gray-700/50 rounded"></div>
                  </div>
                ) : (
                  <div className="text-3xl font-bold text-white">
                    ${transactionsSummary.totalVolume.toFixed(2)}
                  </div>
                )}
              </div>
              <div className="mt-2 text-sm text-gray-400">
                {transactionsSummary.totalTransactions} transaction{transactionsSummary.totalTransactions !== 1 ? 's' : ''}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
          <CardHeader>
            <CardTitle className="text-white">Transactions Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f1445',
                      borderColor: '#C9A854',
                      color: '#ffffff',
                    }} 
                  />
                  <Line type="monotone" dataKey="deposits" stroke="#C9A854" strokeWidth={2} />
                  <Line type="monotone" dataKey="withdrawals" stroke="#EF4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-300">
                <div className="flex items-center">
                  <ArrowUpRight className="mr-2 h-4 w-4 text-green-500" />
                  Deposits
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-9 w-16 bg-gray-700/50 rounded"></div>
                  </div>
                ) : (
                  transactionsSummary.deposits
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-300">
                <div className="flex items-center">
                  <ArrowUpRight className="mr-2 h-4 w-4 text-red-500 rotate-180" />
                  Withdrawals
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-9 w-16 bg-gray-700/50 rounded"></div>
                  </div>
                ) : (
                  transactionsSummary.withdrawals
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-300">
                <div className="flex items-center">
                  <CreditCard className="mr-2 h-4 w-4 text-blue-500" />
                  Admin Credits
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-9 w-16 bg-gray-700/50 rounded"></div>
                  </div>
                ) : (
                  transactionsSummary.credits
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
