
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LineChart, 
  ArrowUpRight, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp 
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { getUserInvestments, calculateDaysRemaining, formatCurrency } from "@/utils/investmentUtils";
import { Investment } from "@/types/investment";
import { useToast } from "@/hooks/use-toast";

const Investments = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
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
      const totalReturns = data.reduce((sum, inv) => sum + Number(inv.totalReturn), 0);
      
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

  const getStatusBadge = (status: string, endDate?: string) => {
    switch (status) {
      case 'active':
        const daysRemaining = endDate ? calculateDaysRemaining(endDate) : 0;
        return (
          <div className="flex items-center text-amber-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>{daysRemaining} days remaining</span>
          </div>
        );
      case 'completed':
        return (
          <div className="flex items-center text-green-500">
            <CheckCircle className="h-4 w-4 mr-1" />
            <span>Completed</span>
          </div>
        );
      case 'cancelled':
        return (
          <div className="flex items-center text-red-500">
            <AlertCircle className="h-4 w-4 mr-1" />
            <span>Cancelled</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white">Investment Portfolio</h2>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-300">Active Investments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <LineChart className="mr-2 h-5 w-5 text-unicorn-gold" />
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-9 w-20 bg-gray-700/50 rounded"></div>
                  </div>
                ) : (
                  <div className="text-3xl font-bold text-white">{stats.activeCount}</div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-300">Total Invested</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <ArrowUpRight className="mr-2 h-5 w-5 text-unicorn-gold" />
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-9 w-32 bg-gray-700/50 rounded"></div>
                  </div>
                ) : (
                  <div className="text-3xl font-bold text-white">
                    {formatCurrency(stats.totalInvested)}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-300">Expected Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-unicorn-gold" />
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-9 w-32 bg-gray-700/50 rounded"></div>
                  </div>
                ) : (
                  <div className="text-3xl font-bold text-white">
                    {formatCurrency(stats.totalReturns)}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Investments List */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Your Investments</h3>
            <Button 
              className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black"
              onClick={() => navigate('/investment-plans')}
            >
              New Investment
            </Button>
          </div>
          
          <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
            <CardContent className="p-0">
              {loading ? (
                <div className="p-6">
                  <div className="flex flex-col space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-24 bg-gray-700/50 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : investments.length > 0 ? (
                <div className="divide-y divide-unicorn-gold/30">
                  {investments.map((investment) => (
                    <div key={investment.id} className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <div className="font-medium text-white text-lg mb-1">
                            {investment.plan_id} Plan
                          </div>
                          <div className="text-sm text-gray-400">
                            Started on {new Date(investment.startDate).toLocaleDateString()}
                          </div>
                          {getStatusBadge(investment.status, investment.endDate)}
                        </div>
                        
                        <div className="mt-4 md:mt-0 grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div>
                            <div className="text-sm text-gray-400">Invested</div>
                            <div className="font-medium text-white">
                              {formatCurrency(Number(investment.amount))}
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-gray-400">Daily Return</div>
                            <div className="font-medium text-unicorn-gold">
                              {investment.dailyReturn}%
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-gray-400">Total Return</div>
                            <div className="font-medium text-unicorn-gold">
                              {formatCurrency(Number(investment.totalReturn))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-gray-400">No investments yet</p>
                  <Button 
                    className="mt-4 bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black"
                    onClick={() => navigate('/investment-plans')}
                  >
                    Explore Investment Plans
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

export default Investments;
