
import React, { useState, useEffect } from "react";
import DashboardOverview from "./DashboardOverview";
import StatCards from "./StatCards";
import TransactionsPanel from "./TransactionsPanel";
import PortfolioSummary from "./PortfolioSummary";
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

const DashboardContent = () => {
  console.log("DashboardContent component loaded");
  
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
    console.log("DashboardContent useEffect triggered, user:", user);
    
    if (DEVELOPMENT_MODE) {
      console.log("Loading sample data in dev mode");
      // Simulate loading
      setTimeout(() => {
        setWalletData(SAMPLE_DATA.wallet);
        setTransactions(SAMPLE_DATA.transactions);
        setInvestmentStats(SAMPLE_DATA.investments);
        setTicketStats(SAMPLE_DATA.tickets);
        setLoading(false);
        console.log("Sample data loaded");
      }, 1000);
      return;
    }

    if (user) {
      fetchDashboardData();
    }
  }, [user]);
  
  const fetchDashboardData = async () => {
    try {
      await Promise.all([
        fetchWallet(),
        fetchTransactions(),
        fetchInvestmentStats(),
        fetchTicketStats()
      ]);
    } finally {
      setLoading(false);
    }
  };

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
    }
  };

  console.log("DashboardContent rendering with data:", { 
    walletData, 
    transactions: transactions.length,
    investmentStats,
    ticketStats
  });

  return (
    <div className="space-y-6">
      <DashboardOverview />
      
      <StatCards 
        loading={loading}
        walletData={walletData}
        investmentStats={investmentStats}
        ticketStats={ticketStats}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <TransactionsPanel 
            loading={loading}
            transactions={transactions}
          />
        </div>

        <div className="md:col-span-1">
          <PortfolioSummary 
            loading={loading}
            investmentStats={investmentStats}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
