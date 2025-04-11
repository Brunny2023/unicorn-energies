
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { getUserInvestments } from "@/utils/investmentUtils";
import { Investment } from "@/types/investment";
import { useToast } from "@/hooks/use-toast";
import StatsCards from "@/components/dashboard/investments/StatsCards";
import InvestmentsList from "@/components/dashboard/investments/InvestmentsList";

// Development mode flag
const DEVELOPMENT_MODE = true;

// Sample dummy investments for development
const DUMMY_INVESTMENTS: Investment[] = [
  {
    id: "inv-1",
    user_id: "dev-user-id",
    plan_id: "Gold",
    amount: 5000,
    daily_return: 0.5,
    duration: 30,
    total_return: 5750,
    status: "active",
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    start_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "inv-2",
    user_id: "dev-user-id",
    plan_id: "Platinum",
    amount: 10000,
    daily_return: 0.7,
    duration: 90,
    total_return: 16300,
    status: "active",
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "inv-3",
    user_id: "dev-user-id",
    plan_id: "Silver",
    amount: 2000,
    daily_return: 0.3,
    duration: 60,
    total_return: 2360,
    status: "completed",
    created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    start_date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const Investments = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [stats, setStats] = useState({
    activeCount: 0,
    totalInvested: 0,
    totalReturns: 0,
  });

  useEffect(() => {
    // In development mode, use dummy data
    if (DEVELOPMENT_MODE) {
      setTimeout(() => {
        setInvestments(DUMMY_INVESTMENTS);
        
        // Calculate stats
        const activeInvestments = DUMMY_INVESTMENTS.filter(inv => inv.status === 'active');
        const totalInvested = DUMMY_INVESTMENTS.reduce((sum, inv) => sum + Number(inv.amount), 0);
        const totalReturns = DUMMY_INVESTMENTS.reduce((sum, inv) => sum + Number(inv.total_return), 0);
        
        setStats({
          activeCount: activeInvestments.length,
          totalInvested,
          totalReturns,
        });
        
        setLoading(false);
      }, 1000); // Add a small delay to simulate loading
      return;
    }

    // For production, fetch real data
    if (user) {
      fetchInvestments();
    }
  }, [user]);

  const fetchInvestments = async () => {
    try {
      setLoading(true);
      const data = await getUserInvestments(user?.id as string);
      
      setInvestments(data);
      
      // Calculate stats
      const activeInvestments = data.filter(inv => inv.status === 'active');
      const totalInvested = data.reduce((sum, inv) => sum + Number(inv.amount), 0);
      const totalReturns = data.reduce((sum, inv) => sum + Number(inv.total_return), 0);
      
      setStats({
        activeCount: activeInvestments.length,
        totalInvested,
        totalReturns,
      });
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching investments:", error);
      toast({
        title: "Error",
        description: "Failed to load investments data",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white">Investment Portfolio</h2>
        
        {/* Stats Cards */}
        <StatsCards 
          loading={loading} 
          activeCount={stats.activeCount} 
          totalInvested={stats.totalInvested} 
          totalReturns={stats.totalReturns} 
        />
        
        {/* Investments List */}
        <InvestmentsList loading={loading} investments={investments} />
      </div>
    </DashboardLayout>
  );
};

export default Investments;
