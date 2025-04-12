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
  TrendingUp,
  MessageSquare
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

// Sample data for development mode
const DEVELOPMENT_MODE = true;

const SAMPLE_DATA = {
  wallet: {
    balance: 12500,
    accrued_profits: 750,
    withdrawal_fee_percentage: 2.5
  },
  investments: {
    active_count: 3,
    total_invested: 15000,
    total_expected_return: 19500
  },
  transactions: [
    {
      id: "tx-1",
      type: "deposit",
      amount: 5000,
      status: "completed",
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "tx-2",
      type: "investment",
      amount: 3000,
      status: "completed",
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      description: "Gold Plan Investment"
    },
    {
      id: "tx-3",
      type: "withdrawal",
      amount: 1200,
      status: "pending",
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "tx-4",
      type: "credit",
      amount: 350,
      status: "completed",
      created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      description: "Referral Bonus"
    }
  ],
  tickets: {
    open_count: 2,
    latest_ticket: {
      id: "ticket-1",
      subject: "Withdrawal Query",
      status: "open",
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    }
  }
};

// Formatter function
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

const Dashboard = () => {
  console.log("Dashboard component loaded"); // Debug log
  
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [walletData, setWalletData] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [investmentStats, setInvestmentStats] = useState<any>({
    active_count: 0,
    total_invested: 0,
    total_expected_return: 0
  });
  const [ticketStats, setTicketStats] = useState<any>({
    open_count: 0,
    latest_ticket: null
  });

  useEffect(() => {
    console.log("Dashboard useEffect triggered, user:", user); // Debug log
    
    if (DEVELOPMENT_MODE) {
      console.log("Loading sample data in dev mode"); // Debug log
      // Simulate loading
      setTimeout(() => {
        setWalletData(SAMPLE_DATA.wallet);
        setTransactions(SAMPLE_DATA.transactions);
        setInvestmentStats(SAMPLE_DATA.investments);
        setTicketStats(SAMPLE_DATA.tickets);
        setLoading(false);
        console.log("Sample data loaded"); // Debug log
      }, 1000);
      return;
    }

    if (user) {
      fetchWallet();
      fetchTransactions();
      fetchInvestmentStats();
      fetchTicketStats();
    }
  }, [user]);

  const fetchWallet = async () => {
    try {
      const { data, error } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      setWalletData(data);
    } catch (error) {
      console.error('Error fetching wallet:', error);
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

  const fetchTicketStats = async () => {
    try {
      // Get open tickets count
      const { data: openTickets, error: openError } = await supabase
        .from('tickets')
        .select('*')
        .eq('user_id', user?.id)
        .eq('status', 'open')
        .order('created_at', { ascending: false });

      if (openError) throw openError;
      
      setTicketStats({
        open_count: openTickets?.length || 0,
        latest_ticket: openTickets?.[0] || null
      });
    } catch (error) {
      console.error('Error fetching ticket stats:', error);
    } finally {
      setLoading(false);
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

  console.log("Dashboard rendering with data:", { 
    walletData, 
    transactions: transactions.length,
    investmentStats,
    ticketStats
  }); // Debug log

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-3xl font-bold text-white">Dashboard Overview</h2>
          <div className="flex space-x-4">
            <Button asChild variant="outline" className="text-unicorn-gold border-unicorn-gold hover:bg-unicorn-gold/20">
              <Link to="/dashboard/deposit">Deposit Funds</Link>
            </Button>
            <Button asChild className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
              <Link to="/investment-plans">Invest Now</Link>
            </Button>
          </div>
        </div>
        
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
                    <div className="h-9 w-32 bg-unicorn-darkPurple/50 rounded"></div>
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
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-9 w-10 bg-unicorn-darkPurple/50 rounded"></div>
                  </div>
                ) : (
                  <div className="text-3xl font-bold text-white">{investmentStats.active_count}</div>
                )}
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
              <CardTitle className="text-lg text-gray-300">Support Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-unicorn-gold" />
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-9 w-10 bg-unicorn-darkPurple/50 rounded"></div>
                  </div>
                ) : (
                  <div className="text-3xl font-bold text-white">{ticketStats.open_count}</div>
                )}
              </div>
              {ticketStats.latest_ticket ? (
                <div className="mt-2 text-sm text-gray-400">
                  <span>Latest: </span>
                  <span className="text-white">{ticketStats.latest_ticket.subject}</span>
                </div>
              ) : (
                <div className="mt-2 text-sm text-gray-400">No open tickets</div>
              )}
              <div className="mt-4">
                <Button asChild className="text-unicorn-black bg-unicorn-gold hover:bg-unicorn-darkGold">
                  <Link to="/dashboard/tickets">
                    {ticketStats.open_count > 0 ? "View Tickets" : "Create Ticket"}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-gray-300">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {loading ? (
                  <div className="p-6 space-y-4">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="flex items-center justify-between animate-pulse">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-unicorn-darkPurple/50 rounded-full mr-3"></div>
                          <div>
                            <div className="h-5 bg-unicorn-darkPurple/50 rounded w-24 mb-2"></div>
                            <div className="h-4 bg-unicorn-darkPurple/50 rounded w-32"></div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="h-5 bg-unicorn-darkPurple/50 rounded w-16 mb-2"></div>
                          <div className="h-4 bg-unicorn-darkPurple/50 rounded w-12"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : transactions.length > 0 ? (
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
                            {transaction.type === 'withdrawal' || transaction.type === 'fee' ? '-' : '+'}
                            {formatCurrency(transaction.amount)}
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
                    <p className="text-gray-400 mb-4">No transactions yet</p>
                    <Button asChild className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
                      <Link to="/dashboard/deposit">Make Your First Deposit</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30 h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-gray-300">Portfolio Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-8 bg-unicorn-darkPurple/50 rounded"></div>
                    <div className="h-8 bg-unicorn-darkPurple/50 rounded"></div>
                    <div className="h-8 bg-unicorn-darkPurple/50 rounded"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Invested</span>
                      <span className="text-white font-medium">{formatCurrency(investmentStats.total_invested)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Expected Returns</span>
                      <span className="text-green-400 font-medium">{formatCurrency(investmentStats.total_expected_return)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Profit</span>
                      <span className="text-unicorn-gold font-medium">
                        {formatCurrency(investmentStats.total_expected_return - investmentStats.total_invested)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">ROI</span>
                      <span className="text-unicorn-gold font-medium">
                        {investmentStats.total_invested > 0 
                          ? `${((investmentStats.total_expected_return / investmentStats.total_invested - 1) * 100).toFixed(2)}%` 
                          : "0.00%"
                        }
                      </span>
                    </div>
                    
                    <div className="pt-4 mt-4 border-t border-unicorn-gold/30">
                      <Button asChild className="w-full text-unicorn-black bg-unicorn-gold hover:bg-unicorn-darkGold">
                        <Link to="/calculator">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Investment Calculator
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
