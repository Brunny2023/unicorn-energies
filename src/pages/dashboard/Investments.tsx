
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { getUserInvestments } from "@/utils/investmentUtils";
import { Investment } from "@/types/investment";
import { useToast } from "@/hooks/use-toast";
import StatsCards from "@/components/dashboard/investments/StatsCards";
import InvestmentsList from "@/components/dashboard/investments/InvestmentsList";
import { Button } from "@/components/ui/button";
import { PlusCircle, TrendingUp, AlertTriangle, Calendar, ChevronDown, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  // Calculate portfolio growth percentage (simplified for demo)
  const calculateGrowth = () => {
    if (stats.totalInvested === 0) return 0;
    return ((stats.totalReturns - stats.totalInvested) / stats.totalInvested) * 100;
  };

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  // Get next payout date
  const getNextPayoutDate = () => {
    // In a real app, this would be calculated based on actual payout schedule
    const date = new Date();
    date.setDate(date.getDate() + 1); // Next day for demo
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">Investment Portfolio</h2>
            <p className="text-gray-400 mt-1">
              Manage your active investments and track returns
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-unicorn-gold/50 text-unicorn-gold hover:bg-unicorn-gold/10">
                  <Filter className="mr-2 h-4 w-4" />
                  Sort
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-unicorn-darkPurple border-unicorn-gold/30 text-white">
                <DropdownMenuLabel>Sort Investments</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-unicorn-gold/20" />
                <DropdownMenuItem 
                  className={`cursor-pointer ${sortOrder === 'newest' ? 'bg-unicorn-purple/20 text-unicorn-gold' : ''}`}
                  onClick={() => setSortOrder('newest')}
                >
                  Newest First
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className={`cursor-pointer ${sortOrder === 'oldest' ? 'bg-unicorn-purple/20 text-unicorn-gold' : ''}`}
                  onClick={() => setSortOrder('oldest')}
                >
                  Oldest First
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className={`cursor-pointer ${sortOrder === 'amount-high' ? 'bg-unicorn-purple/20 text-unicorn-gold' : ''}`}
                  onClick={() => setSortOrder('amount-high')}
                >
                  Highest Amount
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className={`cursor-pointer ${sortOrder === 'amount-low' ? 'bg-unicorn-purple/20 text-unicorn-gold' : ''}`}
                  onClick={() => setSortOrder('amount-low')}
                >
                  Lowest Amount
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link to="/investment-plans">
              <Button className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Investment
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Portfolio Summary */}
        <div className="bg-unicorn-darkPurple/80 border border-unicorn-gold/30 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-white flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-unicorn-gold" />
                Portfolio Growth
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                Year-to-date performance of your investment portfolio
              </p>
            </div>
            <div className="mt-4 md:mt-0 px-4 py-2 bg-unicorn-gold/10 border border-unicorn-gold/20 rounded-full">
              <span className="text-unicorn-gold font-semibold">{formatPercentage(calculateGrowth())}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-unicorn-purple/20 p-4 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Next Payout</div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-unicorn-gold mr-2" />
                <span className="text-white">{getNextPayoutDate()}</span>
              </div>
            </div>
            <div className="bg-unicorn-purple/20 p-4 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Active Plans</div>
              <div className="text-xl font-semibold text-white">{stats.activeCount}</div>
            </div>
            <div className="bg-unicorn-purple/20 p-4 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Target Progress</div>
              <div className="mb-2">
                <span className="text-sm font-medium text-unicorn-gold">{formatPercentage(Math.min(calculateGrowth(), 100))}</span>
              </div>
              <Progress 
                value={Math.min(calculateGrowth(), 100)} 
                className="h-2 bg-unicorn-purple/30"
              />
            </div>
          </div>
          
          {calculateGrowth() < 10 && (
            <div className="flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-md">
              <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300">
                Your portfolio is currently growing slower than expected. Consider diversifying 
                with additional investment plans for better returns.
              </p>
            </div>
          )}
        </div>
        
        {/* Stats Cards */}
        <StatsCards 
          loading={loading} 
          activeCount={stats.activeCount} 
          totalInvested={stats.totalInvested} 
          totalReturns={stats.totalReturns} 
        />
        
        {/* Tab Filters */}
        <div className="flex overflow-x-auto pb-2 border-b border-unicorn-gold/20">
          <button 
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'all' ? 'text-unicorn-gold border-b-2 border-unicorn-gold' : 'text-gray-400 hover:text-gray-200'}`}
            onClick={() => setActiveTab('all')}
          >
            All Investments
          </button>
          <button 
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'active' ? 'text-unicorn-gold border-b-2 border-unicorn-gold' : 'text-gray-400 hover:text-gray-200'}`}
            onClick={() => setActiveTab('active')}
          >
            Active
          </button>
          <button 
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'pending' ? 'text-unicorn-gold border-b-2 border-unicorn-gold' : 'text-gray-400 hover:text-gray-200'}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending
          </button>
          <button 
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'completed' ? 'text-unicorn-gold border-b-2 border-unicorn-gold' : 'text-gray-400 hover:text-gray-200'}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </button>
        </div>
        
        {/* Investments List */}
        <InvestmentsList loading={loading} investments={sortedInvestments} />
      </div>
    </DashboardLayout>
  );
};

export default Investments;
