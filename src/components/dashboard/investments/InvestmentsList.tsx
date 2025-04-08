
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Investment } from "@/types/investment";

interface InvestmentsListProps {
  loading: boolean;
  investments: Investment[];
}

// Local utility functions to avoid dependency
const calculateDaysRemaining = (endDate: string): number => {
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

const InvestmentsList = ({ loading, investments }: InvestmentsListProps) => {
  const navigate = useNavigate();

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
                        Started on {new Date(investment.start_date).toLocaleDateString()}
                      </div>
                      {getStatusBadge(investment.status, investment.end_date)}
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
                          {investment.daily_return}%
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-400">Total Return</div>
                        <div className="font-medium text-unicorn-gold">
                          {formatCurrency(Number(investment.total_return))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-400 mb-4">No investments yet</p>
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
  );
};

export default InvestmentsList;
