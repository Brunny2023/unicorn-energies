
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
import { Calculator, ArrowRight, Sparkle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

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
                <div>
                  <label className="block text-white font-medium mb-2">Select Plan</label>
                  <Select
                    value={selectedPlan.name}
                    onValueChange={handlePlanChange}
                  >
                    <SelectTrigger className="w-full bg-white/10 border-unicorn-gold/20 text-white">
                      <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                    <SelectContent className="bg-unicorn-darkPurple text-white border-unicorn-gold/20">
                      {plans.map((plan) => (
                        <SelectItem key={plan.name} value={plan.name} className="focus:bg-unicorn-purple/20 focus:text-unicorn-gold">
                          {plan.name} (${plan.minAmount.toLocaleString()} - ${plan.maxAmount.toLocaleString()})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-unicorn-gold mt-2">
                    {selectedPlan.dailyReturn}% daily for {selectedPlan.duration} days
                  </p>
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">
                    Investment Amount (${selectedPlan.minAmount.toLocaleString()} - ${selectedPlan.maxAmount.toLocaleString()})
                  </label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    min={selectedPlan.minAmount}
                    max={selectedPlan.maxAmount}
                    className="mb-3 bg-white/10 border-unicorn-gold/20 text-white"
                  />
                  <Slider
                    value={[amount]}
                    min={selectedPlan.minAmount}
                    max={selectedPlan.maxAmount}
                    step={(selectedPlan.maxAmount - selectedPlan.minAmount) / 100}
                    onValueChange={handleSliderChange}
                    className="mt-6"
                  />
                  <div className="flex justify-between text-sm mt-2 text-gray-400">
                    <span>${selectedPlan.minAmount.toLocaleString()}</span>
                    <span>${selectedPlan.maxAmount.toLocaleString()}</span>
                  </div>
                </div>
                
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
                
                {results ? (
                  <div className="space-y-8">
                    <div className="relative">
                      <div className="text-gray-300 mb-1">Daily Profit:</div>
                      <div className="text-3xl font-bold text-unicorn-gold flex items-center">
                        ${results.dailyProfit.toFixed(2)}
                        <Sparkle className="ml-2 h-4 w-4 text-unicorn-gold animate-pulse" />
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="text-gray-300 mb-1">Total Profit ({selectedPlan.duration} days):</div>
                      <div className="text-3xl font-bold text-unicorn-gold flex items-center">
                        ${results.totalProfit.toFixed(2)}
                        <Sparkle className="ml-2 h-4 w-4 text-unicorn-gold animate-pulse" />
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-unicorn-purple/30">
                      <div className="text-gray-300 mb-1">Total Return (Capital + Profit):</div>
                      <div className="text-4xl font-bold text-white glow-text">
                        ${results.totalReturn.toFixed(2)}
                      </div>
                    </div>
                    
                    <Button className="mt-8 w-full bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-bold group shadow-[0_0_15px_rgba(255,215,0,0.3)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.5)]">
                      Invest Now <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="text-unicorn-gold text-5xl mb-6">
                      <Calculator className="h-16 w-16 mx-auto" />
                    </div>
                    <div className="max-w-sm mx-auto">
                      <p className="text-gray-300 text-lg mb-6">
                        Enter your investment details and click "Calculate Profit" to see your potential returns.
                      </p>
                      <div className="bg-unicorn-gold/10 border border-unicorn-gold/30 rounded-lg p-4 backdrop-blur-sm">
                        <p className="text-unicorn-gold font-medium">
                          Start calculating now to see how your wealth can grow with UnicornEnergies!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
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
