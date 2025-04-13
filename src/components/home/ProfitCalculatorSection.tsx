
import { useState, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Plan, CalculationResults } from '@/types/investment';
import InvestmentPlanSelector from '@/components/calculator/InvestmentPlanSelector';
import AmountInput from '@/components/calculator/AmountInput';
import ResultsDisplay from '@/components/calculator/ResultsDisplay';

const plans: Plan[] = [
  { id: "goldfish", name: "Goldfish", minAmount: 100, maxAmount: 999, dailyReturn: 1.2, duration: 15 },
  { id: "dolphin", name: "Dolphin", minAmount: 1000, maxAmount: 4999, dailyReturn: 1.5, duration: 20 },
  { id: "shark", name: "Shark", minAmount: 5000, maxAmount: 14999, dailyReturn: 1.8, duration: 25 },
  { id: "whales", name: "Whales", minAmount: 15000, maxAmount: 50000, dailyReturn: 2.2, duration: 30 }
];

const ProfitCalculatorSection = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[0]);
  const [amount, setAmount] = useState<number>(selectedPlan.minAmount);
  const [results, setResults] = useState<CalculationResults | null>(null);

  const handlePlanChange = (value: string) => {
    const plan = plans.find(p => p.name === value) || plans[0];
    setSelectedPlan(plan);
    
    // Reset amount to the min of the new plan
    setAmount(plan.minAmount);
    
    // Clear results
    setResults(null);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;
    
    const clampedValue = Math.min(
      Math.max(value, selectedPlan.minAmount),
      selectedPlan.maxAmount
    );
    
    setAmount(clampedValue);
    
    // Clear results
    setResults(null);
  };

  const handleSliderChange = (value: number[]) => {
    setAmount(value[0]);
    
    // Clear results
    setResults(null);
  };

  const calculateProfit = () => {
    const dailyProfit = (amount * selectedPlan.dailyReturn) / 100;
    const totalProfit = dailyProfit * selectedPlan.duration;
    const totalReturn = amount + totalProfit;
    const returnPercentage = (totalProfit / amount) * 100;
    const dailyRate = selectedPlan.dailyReturn / 100;
    const annualYield = (Math.pow(1 + dailyRate, 365) - 1) * 100;
    
    setResults({
      dailyProfit,
      totalProfit,
      totalReturn,
      returnPercentage,
      annualYield,
      duration: selectedPlan.duration
    });
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-unicorn-black via-unicorn-darkPurple to-unicorn-black"></div>
      
      {/* Floating particles */}
      <div className="stars-container absolute inset-0">
        <div className="particle"></div>
        <div className="particle" style={{ animationDelay: "0.3s" }}></div>
        <div className="particle" style={{ animationDelay: "0.6s" }}></div>
        <div className="particle" style={{ animationDelay: "0.9s" }}></div>
        <div className="particle" style={{ animationDelay: "1.2s" }}></div>
        <div className="particle" style={{ animationDelay: "1.5s" }}></div>
        <div className="particle" style={{ animationDelay: "1.8s" }}></div>
        <div className="particle" style={{ animationDelay: "2.1s" }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <div className="inline-block mb-4 p-2 bg-unicorn-gold/10 backdrop-blur-sm border border-unicorn-gold/20 rounded-lg">
              <Calculator className="h-6 w-6 text-unicorn-gold" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Calculate Your <span className="text-unicorn-gold">Potential Returns</span>
            </h2>
            
            <p className="text-gray-300 text-lg mb-8">
              Use our interactive calculator to estimate your potential returns based on your investment amount and selected plan. See exactly what you could earn before making any commitment.
            </p>
            
            <Card className="border-0 bg-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(255,215,0,0.1)] p-2">
              <CardHeader className="pb-0">
                <h3 className="text-xl font-semibold text-white">Investment Calculator</h3>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <InvestmentPlanSelector 
                  plans={plans}
                  selectedPlan={selectedPlan}
                  onPlanChange={handlePlanChange}
                />
                
                <AmountInput
                  amount={amount}
                  selectedPlan={selectedPlan}
                  onAmountChange={handleAmountChange}
                  onSliderChange={handleSliderChange}
                />
                
                <Button 
                  onClick={calculateProfit}
                  className="w-full bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-semibold group shadow-[0_0_15px_rgba(255,215,0,0.3)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.5)]"
                >
                  <Calculator className="mr-2 h-5 w-5" /> Calculate Profit
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="bg-gradient-to-br from-unicorn-darkPurple to-unicorn-black/90 border-0 shadow-[0_0_30px_rgba(148,0,211,0.2)] p-2">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-8 flex items-center text-white">
                  <TrendingUp className="mr-3 h-6 w-6 text-unicorn-gold" />
                  Profit Calculation Results
                </h3>
                
                <ResultsDisplay 
                  results={results}
                  selectedPlanDuration={selectedPlan.duration}
                />
              </CardContent>
            </Card>
            
            {/* Floating elements */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-unicorn-purple/5 rounded-full blur-3xl"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-unicorn-gold/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfitCalculatorSection;
