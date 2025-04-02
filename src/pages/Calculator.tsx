
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calculator as CalculatorIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Slider } from "@/components/ui/slider";

// Define plan types
type Plan = {
  id: string;
  name: string;
  minAmount: number;
  maxAmount: number;
  dailyReturn: number;
  duration: number;
};

// Investment plans data
const plans: Plan[] = [
  { id: "goldfish", name: "Goldfish", minAmount: 100, maxAmount: 999, dailyReturn: 1.2, duration: 15 },
  { id: "dolphin", name: "Dolphin", minAmount: 1000, maxAmount: 4999, dailyReturn: 1.5, duration: 20 },
  { id: "shark", name: "Shark", minAmount: 5000, maxAmount: 14999, dailyReturn: 1.8, duration: 25 },
  { id: "whales", name: "Whales", minAmount: 15000, maxAmount: 50000, dailyReturn: 2.2, duration: 30 },
  { id: "accredited", name: "Accredited Investor", minAmount: 50000, maxAmount: 1000000, dailyReturn: 2.5, duration: 40 }
];

const Calculator = () => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>("goldfish");
  const [amount, setAmount] = useState<number>(100);
  const [dailyProfit, setDailyProfit] = useState<number>(0);
  const [totalProfit, setTotalProfit] = useState<number>(0);
  const [totalReturn, setTotalReturn] = useState<number>(0);
  const [animatedAmount, setAnimatedAmount] = useState<number>(0);
  const [animatedDailyProfit, setAnimatedDailyProfit] = useState<number>(0);
  const [animatedTotalProfit, setAnimatedTotalProfit] = useState<number>(0);
  const [animatedTotalReturn, setAnimatedTotalReturn] = useState<number>(0);
  
  const selectedPlan = plans.find(plan => plan.id === selectedPlanId) || plans[0];

  useEffect(() => {
    // Calculate profits when plan or amount changes
    calculate();
  }, [selectedPlanId, amount]);

  useEffect(() => {
    // Animate the numbers
    const animationDuration = 500; // ms
    const steps = 20;
    const interval = animationDuration / steps;
    
    const amountStep = amount / steps;
    const dailyProfitStep = dailyProfit / steps;
    const totalProfitStep = totalProfit / steps;
    const totalReturnStep = totalReturn / steps;
    
    let currentStep = 0;
    
    const animation = setInterval(() => {
      currentStep++;
      
      setAnimatedAmount(Math.min(amountStep * currentStep, amount));
      setAnimatedDailyProfit(Math.min(dailyProfitStep * currentStep, dailyProfit));
      setAnimatedTotalProfit(Math.min(totalProfitStep * currentStep, totalProfit));
      setAnimatedTotalReturn(Math.min(totalReturnStep * currentStep, totalReturn));
      
      if (currentStep >= steps) {
        clearInterval(animation);
        setAnimatedAmount(amount);
        setAnimatedDailyProfit(dailyProfit);
        setAnimatedTotalProfit(totalProfit);
        setAnimatedTotalReturn(totalReturn);
      }
    }, interval);
    
    return () => clearInterval(animation);
  }, [amount, dailyProfit, totalProfit, totalReturn]);

  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const planId = e.target.value;
    setSelectedPlanId(planId);
    
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      // Set amount to min of the selected plan
      setAmount(plan.minAmount);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;
    
    // Ensure amount is within plan limits
    const clampedValue = Math.min(
      Math.max(value, selectedPlan.minAmount),
      selectedPlan.maxAmount
    );
    
    setAmount(clampedValue);
  };

  const handleSliderChange = (value: number[]) => {
    setAmount(value[0]);
  };

  const calculate = () => {
    const dailyProfitValue = (amount * selectedPlan.dailyReturn) / 100;
    const totalProfitValue = dailyProfitValue * selectedPlan.duration;
    const totalReturnValue = amount + totalProfitValue;
    
    setDailyProfit(dailyProfitValue);
    setTotalProfit(totalProfitValue);
    setTotalReturn(totalReturnValue);
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-6">Profit Calculator</h1>
            <p className="text-xl text-gray-200">
              Calculate your potential returns based on your investment amount and selected plan.
            </p>
          </div>
        </div>
      </section>
      
      {/* Calculator Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Input Side */}
              <div className="bg-investment-gray p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-investment-navy mb-6 flex items-center">
                  <CalculatorIcon className="mr-2 h-6 w-6 text-investment-gold" />
                  Investment Calculator
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-investment-navy font-semibold mb-2">
                      Select Investment Plan
                    </label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-md text-investment-navy"
                      value={selectedPlanId}
                      onChange={handlePlanChange}
                    >
                      {plans.map((plan) => (
                        <option key={plan.id} value={plan.id}>
                          {plan.name} (${plan.minAmount.toLocaleString()} - ${plan.maxAmount === 1000000 ? "50,000+" : plan.maxAmount.toLocaleString()})
                        </option>
                      ))}
                    </select>
                    <p className="text-gray-600 mt-2">
                      <span className="font-semibold">{selectedPlan.dailyReturn}% daily for {selectedPlan.duration} days</span>
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-investment-navy font-semibold mb-2">
                      Investment Amount
                    </label>
                    
                    <div className="flex">
                      <span className="bg-investment-navy text-white p-3 rounded-l-md">$</span>
                      <input
                        type="number"
                        value={amount}
                        onChange={handleAmountChange}
                        className="w-full p-3 border-y border-r border-gray-300 rounded-r-md"
                        min={selectedPlan.minAmount}
                        max={selectedPlan.maxAmount}
                      />
                    </div>
                    
                    <div className="mt-8 mb-2">
                      <Slider
                        value={[amount]}
                        min={selectedPlan.minAmount}
                        max={selectedPlan.maxAmount}
                        step={1}
                        onValueChange={handleSliderChange}
                      />
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Min: ${selectedPlan.minAmount.toLocaleString()}</span>
                      <span>Max: ${selectedPlan.maxAmount === 1000000 ? "50,000+" : selectedPlan.maxAmount.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <p className="text-gray-600 italic mb-2">
                      Move the slider or enter an amount to see your potential returns calculated instantly.
                    </p>
                    
                    <Link to="/investment-plans">
                      <Button variant="link" className="text-investment-navy p-0 underline">
                        View all investment plans
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Results Side */}
              <div className="bg-investment-navy text-white p-8 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold mb-8 flex items-center">
                  <CalculatorIcon className="mr-2 h-6 w-6 text-investment-gold" />
                  Calculation Results
                </h2>
                
                <div className="space-y-8">
                  <div className="bg-investment-lightNavy/50 p-6 rounded-lg">
                    <div className="text-gray-300 mb-1">Selected Plan:</div>
                    <div className="text-2xl font-bold text-white">
                      {selectedPlan.name}
                    </div>
                    <div className="text-sm text-gray-300 mt-1">
                      {selectedPlan.dailyReturn}% daily return for {selectedPlan.duration} days
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-gray-300 mb-1">Initial Investment:</div>
                    <div className="text-3xl font-bold text-white">
                      ${animatedAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-gray-300 mb-1">Daily Profit:</div>
                    <div className="text-3xl font-bold text-investment-gold">
                      ${animatedDailyProfit.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      <span className="text-sm font-normal ml-2">({selectedPlan.dailyReturn}%)</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-gray-300 mb-1">Total Profit ({selectedPlan.duration} days):</div>
                    <div className="text-3xl font-bold text-investment-gold">
                      ${animatedTotalProfit.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-investment-lightNavy">
                    <div className="text-gray-300 mb-1">Total Return (Capital + Profit):</div>
                    <div className="text-4xl font-bold text-white">
                      ${animatedTotalReturn.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link to="/register">
                    <Button className="w-full bg-investment-gold hover:bg-investment-lightGold text-investment-navy font-bold py-6 text-lg">
                      Start Investing Now <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Additional Plans Section */}
      <section className="py-16 bg-investment-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="heading-lg text-investment-navy mb-4">
              Compare Investment Plans
            </h2>
            <p className="text-gray-600">
              Explore our range of investment plans designed to suit investors at every level. Each plan offers competitive returns with clear terms.
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg overflow-hidden shadow-md">
              <thead className="bg-investment-navy text-white">
                <tr>
                  <th className="py-4 px-6 text-left">Plan</th>
                  <th className="py-4 px-6 text-center">Investment Range</th>
                  <th className="py-4 px-6 text-center">Daily Return</th>
                  <th className="py-4 px-6 text-center">Duration</th>
                  <th className="py-4 px-6 text-center">Total Return</th>
                  <th className="py-4 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr key={plan.id} className="border-b border-gray-200 hover:bg-investment-gray/50">
                    <td className="py-4 px-6 font-medium text-investment-navy">
                      {plan.name}
                    </td>
                    <td className="py-4 px-6 text-center">
                      ${plan.minAmount.toLocaleString()} - ${plan.maxAmount === 1000000 ? "50,000+" : plan.maxAmount.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-center font-medium text-investment-gold">
                      {plan.dailyReturn}%
                    </td>
                    <td className="py-4 px-6 text-center">
                      {plan.duration} days
                    </td>
                    <td className="py-4 px-6 text-center font-medium">
                      {(plan.dailyReturn * plan.duration).toFixed(1)}%
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Button 
                        className="bg-investment-navy hover:bg-investment-lightNavy text-white"
                        onClick={() => {
                          setSelectedPlanId(plan.id);
                          setAmount(plan.minAmount);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        Calculate
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/investment-plans">
              <Button className="bg-investment-gold hover:bg-investment-lightGold text-investment-navy font-bold">
                View Plan Details <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-investment-navy text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-md mb-6">
              Ready to Start Growing Your Wealth?
            </h2>
            <p className="text-gray-300 mb-8">
              Create your account now and start investing in minutes. Our secure platform makes it easy to begin your journey toward financial freedom.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button className="bg-investment-gold hover:bg-investment-lightGold text-investment-navy font-bold">
                  Create Your Account <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Our Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Calculator;
