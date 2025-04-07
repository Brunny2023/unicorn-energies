
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CircleDollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  LineChart, 
  Wallet, 
  Clock,
  TrendingUp
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency } from "@/utils/investmentUtils";

interface Transaction {
  id: string;
  type: string;
  amount: number;
  status: string;
  created_at: string;
  description: string | null;
}

interface WalletData {
  id: string;
  balance: number;
  accrued_profits: number;
  withdrawal_fee_percentage: number;
}

interface InvestmentStats {
  active_count: number;
  total_invested: number;
  total_expected_return: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [investmentStats, setInvestmentStats] = useState<InvestmentStats>({
    active_count: 0,
    total_invested: 0,
    total_expected_return: 0
  });

  useEffect(() => {
    if (user) {
      fetchWallet();
      fetchTransactions();
      fetchInvestmentStats();
    }
  }, [user]);

  const fetchWallet = async () => {
    try {
      const { data, error } = await supabase
        .from('wallets')
        .select('id, balance, accrued_profits, withdrawal_fee_percentage')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      setWalletData(data);
    } catch (error) {
      console.error('Error fetching wallet:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchInvestmentStats = async () => {
    try {
      // Get active investments count
      const { data: activeInvestments, error: activeError } = await supabase
        .from('investments')
        .select('amount, total_return')
        .eq('user_id', user?.id)
        .eq('status', 'active');

      if (activeError) throw activeError;
      
      // Calculate statistics
      const activeCount = activeInvestments?.length || 0;
      const totalInvested = activeInvestments?.reduce((sum, inv) => sum + Number(inv.amount), 0) || 0;
      const totalExpectedReturn = activeInvestments?.reduce((sum, inv) => sum + Number(inv.total_return), 0) || 0;
      
      setInvestmentStats({
        active_count: activeCount,
        total_invested: totalInvested,
        total_expected_return: totalExpectedReturn
      });
    } catch (error) {
      console.error('Error fetching investment stats:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getTransactionStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-500';
      case 'pending':
        return 'text-yellow-500';
      case 'failed':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'deposit':
        return <ArrowUpRight className="h-4 w-4 text-green-500" />;
      case 'withdrawal':
        return <ArrowDownRight className="h-4 w-4 text-red-500" />;
      case 'investment':
        return <LineChart className="h-4 w-4 text-blue-500" />;
      case 'credit':
        return <CircleDollarSign className="h-4 w-4 text-green-500" />;
      case 'fee':
        return <CircleDollarSign className="h-4 w-4 text-orange-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white">Welcome to Your Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-300">Available Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Wallet className="mr-2 h-5 w-5 text-unicorn-gold" />
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-9 w-32 bg-gray-700/50 rounded"></div>
                  </div>
                ) : (
                  <div className="text-3xl font-bold text-white">
                    {formatCurrency(walletData?.balance || 0)}
                  </div>
                )}
              </div>
              <div className="mt-2 flex text-sm text-gray-400">
                <span>Accrued Profits: </span>
                <span className="ml-1 text-unicorn-gold">
                  {formatCurrency(walletData?.accrued_profits || 0)}
                </span>
              </div>
              <div className="mt-4 flex space-x-3">
                <Button asChild variant="outline" className="text-unicorn-gold border-unicorn-gold hover:bg-unicorn-gold/20">
                  <Link to="/dashboard/deposit">Deposit</Link>
                </Button>
                <Button asChild variant="outline" className="text-unicorn-gold border-unicorn-gold hover:bg-unicorn-gold/20">
                  <Link to="/dashboard/withdraw">Withdraw</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-300">Active Investments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <LineChart className="mr-2 h-5 w-5 text-unicorn-gold" />
                <div className="text-3xl font-bold text-white">{investmentStats.active_count}</div>
              </div>
              <div className="mt-2 flex text-sm text-gray-400">
                <span>Total Invested: </span>
                <span className="ml-1 text-unicorn-gold">
                  {formatCurrency(investmentStats.total_invested)}
                </span>
              </div>
              <div className="mt-4">
                {investmentStats.active_count > 0 ? (
                  <Button asChild className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
                    <Link to="/dashboard/investments">View Investments</Link>
                  </Button>
                ) : (
                  <Button asChild className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
                    <Link to="/investment-plans">Explore Plans</Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-300">Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-unicorn-gold" />
                <div className="text-3xl font-bold text-white">
                  {formatCurrency(investmentStats.total_expected_return)}
                </div>
              </div>
              <div className="mt-2 flex text-sm text-gray-400">
                <span>Expected Return: </span>
                <span className="ml-1 text-unicorn-gold">
                  {investmentStats.total_invested > 0 
                    ? `${((investmentStats.total_expected_return / investmentStats.total_invested - 1) * 100).toFixed(2)}%` 
                    : "0.00%"
                  }
                </span>
              </div>
              <div className="mt-4">
                <Button asChild variant="outline" className="text-unicorn-gold border-unicorn-gold hover:bg-unicorn-gold/20">
                  <Link to="/calculator">Profit Calculator</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold text-white mb-4">Recent Transactions</h3>
          <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
            <CardContent className="p-0">
              {transactions.length > 0 ? (
                <div className="divide-y divide-unicorn-gold/30">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-3 rounded-full bg-unicorn-darkPurple/80 p-2">
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div>
                          <div className="font-medium text-white capitalize">{transaction.type}</div>
                          <div className="text-sm text-gray-400">
                            {formatDate(transaction.created_at)}
                          </div>
                          {transaction.description && (
                            <div className="text-xs text-gray-500 mt-1">{transaction.description}</div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-white">
                          {transaction.type === 'withdrawal' || transaction.type === 'fee' ? '-' : '+'}${transaction.amount.toFixed(2)}
                        </div>
                        <div className={`text-xs ${getTransactionStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-gray-400">No transactions yet</p>
                  <Button asChild className="mt-4 bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
                    <Link to="/dashboard/deposit">Make Your First Deposit</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
