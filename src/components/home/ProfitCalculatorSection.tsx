
import { useState, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from '@/components/ui/input';
import { Calculator, ArrowRight } from 'lucide-react';

type Plan = {
  name: string;
  minAmount: number;
  maxAmount: number;
  dailyReturn: number;
  duration: number;
};

const plans: Plan[] = [
  { name: "Goldfish", minAmount: 100, maxAmount: 999, dailyReturn: 1.2, duration: 15 },
  { name: "Dolphin", minAmount: 1000, maxAmount: 4999, dailyReturn: 1.5, duration: 20 },
  { name: "Shark", minAmount: 5000, maxAmount: 14999, dailyReturn: 1.8, duration: 25 },
  { name: "Whales", minAmount: 15000, maxAmount: 50000, dailyReturn: 2.2, duration: 30 }
];

const ProfitCalculatorSection = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[0]);
  const [amount, setAmount] = useState<number>(selectedPlan.minAmount);
  const [results, setResults] = useState<{
    dailyProfit: number;
    totalProfit: number;
    totalReturn: number;
  } | null>(null);

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
    
    setResults({
      dailyProfit,
      totalProfit,
      totalReturn
    });
  };

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="heading-lg text-investment-navy mb-4">
              Calculate Your Potential Returns
            </h2>
            <p className="text-gray-600 mb-6">
              Use our interactive calculator to estimate your potential returns based on your investment amount and selected plan. See exactly what you could earn before making any commitment.
            </p>
            
            <div className="bg-investment-gray p-8 rounded-lg shadow-sm">
              <div className="mb-6">
                <label className="block text-investment-navy font-semibold mb-2">Select Plan</label>
                <Select
                  value={selectedPlan.name}
                  onValueChange={handlePlanChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {plans.map((plan) => (
                      <SelectItem key={plan.name} value={plan.name}>
                        {plan.name} (${plan.minAmount.toLocaleString()} - ${plan.maxAmount.toLocaleString()})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedPlan.dailyReturn}% daily for {selectedPlan.duration} days
                </p>
              </div>
              
              <div className="mb-6">
                <label className="block text-investment-navy font-semibold mb-2">
                  Investment Amount (${selectedPlan.minAmount.toLocaleString()} - ${selectedPlan.maxAmount.toLocaleString()})
                </label>
                <Input
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  min={selectedPlan.minAmount}
                  max={selectedPlan.maxAmount}
                  className="mb-3"
                />
                <Slider
                  value={[amount]}
                  min={selectedPlan.minAmount}
                  max={selectedPlan.maxAmount}
                  step={(selectedPlan.maxAmount - selectedPlan.minAmount) / 100}
                  onValueChange={handleSliderChange}
                  className="mt-6"
                />
                <div className="flex justify-between text-sm mt-2">
                  <span>${selectedPlan.minAmount.toLocaleString()}</span>
                  <span>${selectedPlan.maxAmount.toLocaleString()}</span>
                </div>
              </div>
              
              <Button 
                onClick={calculateProfit}
                className="w-full bg-investment-gold hover:bg-investment-lightGold text-investment-navy font-semibold"
              >
                <Calculator className="mr-2 h-5 w-5" /> Calculate Profit
              </Button>
            </div>
          </div>
          
          <div>
            <div className="bg-investment-navy text-white p-10 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Calculator className="mr-3 h-6 w-6 text-investment-gold" />
                Profit Calculation Results
              </h3>
              
              {results ? (
                <div className="space-y-6">
                  <div>
                    <div className="text-gray-300 mb-1">Daily Profit:</div>
                    <div className="text-3xl font-bold text-investment-gold">
                      ${results.dailyProfit.toFixed(2)}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-gray-300 mb-1">Total Profit ({selectedPlan.duration} days):</div>
                    <div className="text-3xl font-bold text-investment-gold">
                      ${results.totalProfit.toFixed(2)}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-investment-lightNavy">
                    <div className="text-gray-300 mb-1">Total Return (Capital + Profit):</div>
                    <div className="text-4xl font-bold text-white">
                      ${results.totalReturn.toFixed(2)}
                    </div>
                  </div>
                  
                  <Button className="mt-6 w-full bg-investment-gold hover:bg-investment-lightGold text-investment-navy font-bold">
                    Invest Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-investment-gold text-5xl mb-3">
                    <Calculator className="h-12 w-12 mx-auto" />
                  </div>
                  <p className="text-gray-300 text-lg">
                    Enter your investment details and click "Calculate Profit" to see your potential returns.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfitCalculatorSection;
