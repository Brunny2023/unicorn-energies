
import { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { calculateInvestment, createInvestment } from "@/utils/investmentUtils";
import { Plan, CalculationResults } from "@/types/investment";
import InvestmentForm from './calculator/InvestmentForm';
import ResultsDisplay from './calculator/ResultsDisplay';

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
        <InvestmentForm
          selectedPlan={selectedPlan}
          plans={plans}
          investmentAmount={investmentAmount}
          onSelectPlan={onSelectPlan}
          onAmountChange={handleAmountChange}
        />
        
        <div className={`bg-investment-navy text-white p-6 rounded-lg ${!selectedPlan ? 'flex items-center justify-center' : ''}`}>
          <ResultsDisplay
            selectedPlan={selectedPlan}
            calculationResults={calculationResults}
            investmentAmount={investmentAmount}
            user={user}
            isSubmitting={isSubmitting}
            onInvest={handleInvest}
          />
        </div>
      </div>
    </div>
  );
};

export default PlanCalculator;
