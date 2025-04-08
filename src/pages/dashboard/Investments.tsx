
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { getUserInvestments } from "@/utils/investmentUtils";
import { Investment } from "@/types/investment";
import { useToast } from "@/hooks/use-toast";
import StatsCards from "@/components/dashboard/investments/StatsCards";
import InvestmentsList from "@/components/dashboard/investments/InvestmentsList";

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
