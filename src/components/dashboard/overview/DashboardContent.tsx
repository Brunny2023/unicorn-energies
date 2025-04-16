
import React, { useState, useEffect } from "react";
import DashboardOverview from "./DashboardOverview";
import DashboardTopNav from "../layout/DashboardTopNav";
import { useAuth } from "@/contexts/AuthContext";
import { useTransactions } from "@/hooks/useTransactions";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import WalletSection from "./sections/WalletSection";
import PortfolioSection from "./sections/PortfolioSection";
import ActivitySection from "./sections/ActivitySection";

const DashboardContent = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const { transactions, loading: transactionsLoading } = useTransactions(user?.id);
  
  // Wallet and investment stats state
  const [walletData, setWalletData] = useState({
    balance: 0,
    accrued_profits: 0
  });
  
  const [investmentStats, setInvestmentStats] = useState({
    active_count: 0,
    total_invested: 0,
    total_expected_return: 0
  });
  
  const [ticketStats, setTicketStats] = useState({
    open_count: 0,
    latest_ticket: null
  });

  // Fetch data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      
      try {
        if (user) {
          // In a real application, we would fetch from Supabase
          console.log("Fetching dashboard data for user:", user.id);
          
          // Try to fetch wallet data from Supabase
          try {
            const { data: walletData, error } = await supabase
              .from('wallets')
              .select('*')
              .eq('user_id', user.id)
              .single();
              
            if (error) {
              console.error("Error fetching wallet data:", error);
              // Use placeholder data if fetch fails
              setWalletData({
                balance: 5000,
                accrued_profits: 250
              });
            } else if (walletData) {
              setWalletData(walletData);
            }
          } catch (e) {
            console.error("Error in wallet data fetch:", e);
            // Use placeholder data
            setWalletData({
              balance: 5000,
              accrued_profits: 250
            });
          }
          
          // Try to fetch investment stats from Supabase
          try {
            const { data: investments, error } = await supabase
              .from('investments')
              .select('*')
              .eq('user_id', user.id);
              
            if (error) {
              console.error("Error fetching investments:", error);
              // Use placeholder data
              setInvestmentStats({
                active_count: 2,
                total_invested: 3000,
                total_expected_return: 3600
              });
            } else if (investments) {
              // Calculate stats from actual investments
              const activeInvestments = investments.filter(inv => inv.status === 'active');
              const totalInvested = activeInvestments.reduce((sum, inv) => sum + Number(inv.amount), 0);
              const totalReturn = activeInvestments.reduce((sum, inv) => sum + Number(inv.total_return), 0);
              
              setInvestmentStats({
                active_count: activeInvestments.length,
                total_invested: totalInvested,
                total_expected_return: totalReturn
              });
            }
          } catch (e) {
            console.error("Error in investments fetch:", e);
            // Use placeholder data
            setInvestmentStats({
              active_count: 2,
              total_invested: 3000,
              total_expected_return: 3600
            });
          }
          
          // Try to fetch ticket stats from Supabase
          try {
            const { data: tickets, error } = await supabase
              .from('tickets')
              .select('*')
              .eq('user_id', user.id)
              .eq('status', 'open')
              .order('created_at', { ascending: false });
              
            if (error) {
              console.error("Error fetching tickets:", error);
              // Use placeholder data
              setTicketStats({
                open_count: 1,
                latest_ticket: { id: '1', subject: 'Account Inquiry' }
              });
            } else if (tickets) {
              setTicketStats({
                open_count: tickets.length,
                latest_ticket: tickets.length > 0 ? tickets[0] : null
              });
            }
          } catch (e) {
            console.error("Error in tickets fetch:", e);
            // Use placeholder data
            setTicketStats({
              open_count: 1,
              latest_ticket: { id: '1', subject: 'Account Inquiry' }
            });
          }
        } else {
          // If no user, use placeholder data for preview
          setWalletData({
            balance: 0,
            accrued_profits: 0
          });
          
          setInvestmentStats({
            active_count: 0,
            total_invested: 0,
            total_expected_return: 0
          });
          
          setTicketStats({
            open_count: 0,
            latest_ticket: null
          });
          
          toast({
            title: "Authentication required",
            description: "Please log in to view your dashboard data",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [user, toast]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome to your investment dashboard</p>
      </div>
      
      {/* Dashboard navigation tabs */}
      <DashboardTopNav />
      
      {/* Stats and overview cards */}
      <WalletSection 
        loading={loading}
        walletData={walletData}
        investmentStats={investmentStats}
        ticketStats={ticketStats}
      />
      
      {/* Main dashboard content */}
      <PortfolioSection 
        loading={loading}
        investmentStats={investmentStats}
      />
      
      <ActivitySection 
        loading={loading || transactionsLoading}
        transactions={transactions}
      />
      
      <DashboardOverview />
    </div>
  );
};

export default DashboardContent;
