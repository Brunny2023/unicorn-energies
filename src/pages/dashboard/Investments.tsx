import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getUserInvestments } from "@/utils/investmentUtils";
import { Investment } from "@/types/investment";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, Home, Wallet, CreditCard, DollarSign } from "lucide-react";
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
import DashboardLayout from "@/components/dashboard/DashboardLayout";

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

  const filteredInvestments = investments.filter(inv => {
    if (activeTab === 'all') return true;
    return inv.status === activeTab;
  });

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
    <DashboardLayout>
      <div className="space-y-6">
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
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Investments</h1>
            <p className="text-gray-400">Manage your active and pending investments</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button asChild variant="outline" className="text-unicorn-gold border-unicorn-gold hover:bg-unicorn-gold/20">
              <Link to="/dashboard">
                <Home className="h-4 w-4 mr-1" />
                Dashboard
              </Link>
            </Button>
            <Button asChild variant="outline" className="text-unicorn-gold border-unicorn-gold hover:bg-unicorn-gold/20">
              <Link to="/dashboard/deposit">
                <Wallet className="h-4 w-4 mr-1" />
                Deposit
              </Link>
            </Button>
            <Button asChild variant="outline" className="text-unicorn-gold border-unicorn-gold hover:bg-unicorn-gold/20">
              <Link to="/dashboard/withdraw">
                <CreditCard className="h-4 w-4 mr-1" />
                Withdraw
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex overflow-x-auto gap-2 py-2 md:hidden">
          <Link to="/dashboard" className="whitespace-nowrap px-3 py-1 bg-unicorn-purple/30 rounded-full text-sm text-white hover:bg-unicorn-purple/50">
            Dashboard
          </Link>
          <Link to="/dashboard/deposit" className="whitespace-nowrap px-3 py-1 bg-unicorn-purple/30 rounded-full text-sm text-white hover:bg-unicorn-purple/50">
            Deposit
          </Link>
          <Link to="/dashboard/withdraw" className="whitespace-nowrap px-3 py-1 bg-unicorn-purple/30 rounded-full text-sm text-white hover:bg-unicorn-purple/50">
            Withdraw
          </Link>
          <Link to="/dashboard/loans" className="whitespace-nowrap px-3 py-1 bg-unicorn-purple/30 rounded-full text-sm text-white hover:bg-unicorn-purple/50">
            Loans
          </Link>
        </div>
        
        <StatsCards 
          loading={loading} 
          activeCount={stats.activeCount} 
          totalInvested={stats.totalInvested} 
          totalReturns={stats.totalReturns} 
        />
        
        <InvestmentTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <InvestmentsList loading={loading} investments={sortedInvestments} />
      </div>
    </DashboardLayout>
  );
};

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
