
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getUserInvestments } from "@/utils/investmentUtils";
import { Investment } from "@/types/investment";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, Home } from "lucide-react";
import StatsCards from "@/components/dashboard/investments/StatsCards";
import InvestmentsList from "@/components/dashboard/investments/InvestmentsList";
import InvestmentHeader from "@/components/dashboard/investments/InvestmentHeader";
import InvestmentTabs from "@/components/dashboard/investments/InvestmentTabs";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

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
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'pending' | 'completed'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'amount-high' | 'amount-low'>('newest');

  useEffect(() => {
    // For users with no active account yet
    if (!user || !user.id) {
      setInvestments(getDummyInvestments());
      calculateStats(getDummyInvestments());
      setLoading(false);
      return;
    }

    fetchInvestments();
  }, [user]);

  const fetchInvestments = async () => {
    try {
      setLoading(true);
      const data = await getUserInvestments(user?.id as string);
      
      setInvestments(data);
      calculateStats(data);
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching investments:", error);
      toast({
        title: "Error",
        description: "Failed to load investments data",
        variant: "destructive",
      });
      // Use dummy data on error
      setInvestments(getDummyInvestments());
      calculateStats(getDummyInvestments());
      setLoading(false);
    }
  };

  const calculateStats = (investmentsData: Investment[]) => {
    const activeInvestments = investmentsData.filter(inv => inv.status === 'active');
    const totalInvested = investmentsData.reduce((sum, inv) => sum + Number(inv.amount), 0);
    const totalReturns = investmentsData.reduce((sum, inv) => sum + Number(inv.total_return), 0);
    
    setStats({
      activeCount: activeInvestments.length,
      totalInvested,
      totalReturns,
    });
  };

  // Filter investments based on active tab
  const filteredInvestments = investments.filter(inv => {
    if (activeTab === 'all') return true;
    return inv.status === activeTab;
  });

  // Sort investments
  const sortedInvestments = [...filteredInvestments].sort((a, b) => {
    switch (sortOrder) {
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'oldest':
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case 'amount-high':
        return Number(b.amount) - Number(a.amount);
      case 'amount-low':
        return Number(a.amount) - Number(b.amount);
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Breadcrumb navigation */}
      <Breadcrumb className="mb-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/dashboard" className="text-gray-400 hover:text-unicorn-gold">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="text-unicorn-gold">Investments</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      {/* Header with title and actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <InvestmentHeader sortOrder={sortOrder} setSortOrder={setSortOrder} />
        
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button asChild variant="outline" className="text-unicorn-gold border-unicorn-gold hover:bg-unicorn-gold/20">
            <Link to="/dashboard">
              <Home className="h-4 w-4 mr-1" />
              Dashboard
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <StatsCards 
        loading={loading} 
        activeCount={stats.activeCount} 
        totalInvested={stats.totalInvested} 
        totalReturns={stats.totalReturns} 
      />
      
      {/* Tab Filters */}
      <InvestmentTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Investments List */}
      <InvestmentsList loading={loading} investments={sortedInvestments} />
    </div>
  );
};

// Helper function to generate dummy investments for development
const getDummyInvestments = (): Investment[] => {
  return [
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
    },
    {
      id: "inv-4",
      user_id: "dev-user-id",
      plan_id: "Diamond",
      amount: 25000,
      daily_return: 1.0,
      duration: 180,
      total_return: 45000,
      status: "pending",
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      start_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      end_date: new Date(Date.now() + 181 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];
};

export default Investments;
