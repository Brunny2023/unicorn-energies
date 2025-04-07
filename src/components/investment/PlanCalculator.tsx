
import { useState, ChangeEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart } from 'lucide-react';
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { calculateInvestment, createInvestment } from "@/utils/investmentUtils";
import { Plan, CalculationResults } from "@/types/investment";

type InvestmentPlan = {
  id: string;
  name: string;
  range: string;
  minAmount: number;
  maxAmount: number;
  dailyReturn: number;
  duration: number;
  totalReturn: number;
  features: string[];
  highlighted?: boolean;
};

interface PlanCalculatorProps {
  selectedPlan: InvestmentPlan | null;
  plans: InvestmentPlan[];
  onSelectPlan: (plan: InvestmentPlan) => void;
}

const PlanCalculator = ({ selectedPlan, plans, onSelectPlan }: PlanCalculatorProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [investmentAmount, setInvestmentAmount] = useState<number>(selectedPlan ? selectedPlan.minAmount : 0);
  const [calculationResults, setCalculationResults] = useState<CalculationResults>(null);
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  useEffect(() => {
    if (user) {
      fetchWalletBalance();
    }
  }, [user]);
  
  useEffect(() => {
    if (selectedPlan) {
      const plan: Plan = {
        name: selectedPlan.name,
        minAmount: selectedPlan.minAmount,
        maxAmount: selectedPlan.maxAmount,
        dailyReturn: selectedPlan.dailyReturn,
        duration: selectedPlan.duration
      };
      
      const results = calculateInvestment(investmentAmount, plan);
      setCalculationResults(results);
    } else {
      setCalculationResults(null);
    }
  }, [selectedPlan, investmentAmount]);
  
  const fetchWalletBalance = async () => {
    try {
      const { data, error } = await supabase
        .from('wallets')
        .select('balance')
        .eq('user_id', user?.id)
        .single();
        
      if (error) throw error;
      setWalletBalance(data.balance);
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
    }
  };
  
  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!selectedPlan) return;
    
    const value = Number(e.target.value);
    if (isNaN(value)) return;
    
    const clampedValue = Math.max(
      Math.min(value, selectedPlan.maxAmount),
      selectedPlan.minAmount
    );
    
    setInvestmentAmount(clampedValue);
  };
  
  const handlePlanChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const plan = plans.find(p => p.id === e.target.value);
    if (plan) {
      onSelectPlan(plan);
      setInvestmentAmount(plan.minAmount);
    }
  };
  
  const handleInvest = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (!selectedPlan || !calculationResults) {
      return;
    }
    
    // Check if user has enough balance
    if (investmentAmount > walletBalance) {
      toast({
        title: "Insufficient balance",
        description: "Please deposit funds before investing",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const planDetails: Plan = {
        name: selectedPlan.name,
        minAmount: selectedPlan.minAmount,
        maxAmount: selectedPlan.maxAmount,
        dailyReturn: selectedPlan.dailyReturn,
        duration: selectedPlan.duration
      };
      
      await createInvestment(
        user.id,
        selectedPlan.id,
        investmentAmount,
        planDetails
      );
      
      toast({
        title: "Investment Created",
        description: `You have successfully invested $${investmentAmount} in the ${selectedPlan.name} plan`,
      });
      
      navigate('/dashboard/investments');
    } catch (error) {
      console.error("Error creating investment:", error);
      toast({
        title: "Investment Failed",
        description: "There was an error creating your investment",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold text-investment-navy mb-4">Calculate Your Returns</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-2">Select Investment Plan</label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-md"
                value={selectedPlan?.id || ""}
                onChange={handlePlanChange}
              >
                <option value="" disabled>Select a plan</option>
                {plans.map(plan => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} ({plan.range})
                  </option>
                ))}
              </select>
            </div>
            
            {selectedPlan && (
              <div>
                <label className="block text-gray-600 mb-2">
                  Investment Amount (${selectedPlan.minAmount.toLocaleString()} - ${selectedPlan.maxAmount === 1000000 ? "50,000+" : selectedPlan.maxAmount.toLocaleString()})
                </label>
                <input
                  type="number"
                  value={investmentAmount}
                  onChange={handleAmountChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  min={selectedPlan.minAmount}
                  max={selectedPlan.maxAmount}
                />
                
                <div className="text-sm text-gray-500 mt-1">
                  Daily Return: {selectedPlan.dailyReturn}% | Duration: {selectedPlan.duration} days
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className={`bg-investment-navy text-white p-6 rounded-lg ${!selectedPlan ? 'flex items-center justify-center' : ''}`}>
          {selectedPlan && calculationResults ? (
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <BarChart className="h-5 w-5 text-investment-gold mr-2" />
                Calculation Results
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="text-gray-300 text-sm">Initial Investment:</div>
                  <div className="text-2xl font-bold">${investmentAmount.toLocaleString()}</div>
                </div>
                
                <div>
                  <div className="text-gray-300 text-sm">Daily Profit:</div>
                  <div className="text-2xl font-bold text-investment-gold">
                    ${calculationResults.dailyProfit.toFixed(2)} <span className="text-sm font-normal">({selectedPlan.dailyReturn}%)</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-gray-300 text-sm">Total Profit ({selectedPlan.duration} days):</div>
                  <div className="text-2xl font-bold text-investment-gold">
                    ${calculationResults.totalProfit.toFixed(2)}
                  </div>
                </div>
                
                <div className="pt-3 border-t border-investment-lightNavy">
                  <div className="text-gray-300 text-sm">Total Return:</div>
                  <div className="text-3xl font-bold">
                    ${calculationResults.totalReturn.toFixed(2)}
                  </div>
                </div>
              </div>
              
              {user ? (
                <Button 
                  className="w-full mt-6 bg-investment-gold hover:bg-investment-lightGold text-investment-navy font-bold"
                  onClick={handleInvest}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Invest Now"} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <Link to="/register" className="block mt-6">
                  <Button className="w-full bg-investment-gold hover:bg-investment-lightGold text-investment-navy font-bold">
                    Register to Invest <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="text-center py-6">
              <BarChart className="h-12 w-12 text-investment-gold mx-auto mb-4" />
              <p className="text-gray-300">
                Select an investment plan to calculate potential returns
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanCalculator;
