
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  BarChart,
  CheckCircle2
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Define the investment plan type
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

// Investment plans data
const investmentPlans: InvestmentPlan[] = [
  {
    id: "goldfish",
    name: "Goldfish",
    range: "$100 - $999",
    minAmount: 100,
    maxAmount: 999,
    dailyReturn: 1.2,
    duration: 15,
    totalReturn: 118,
    features: [
      "Secure Investment",
      "Full Principal Return",
      "Daily Profit Accrual",
      "Withdraw Anytime"
    ]
  },
  {
    id: "dolphin",
    name: "Dolphin",
    range: "$1,000 - $4,999",
    minAmount: 1000,
    maxAmount: 4999,
    dailyReturn: 1.5,
    duration: 20,
    totalReturn: 130,
    features: [
      "Secure Investment",
      "Full Principal Return",
      "Daily Profit Accrual",
      "Withdraw Anytime",
      "Priority Support"
    ],
    highlighted: true
  },
  {
    id: "shark",
    name: "Shark",
    range: "$5,000 - $14,999",
    minAmount: 5000,
    maxAmount: 14999,
    dailyReturn: 1.8,
    duration: 25,
    totalReturn: 145,
    features: [
      "Secure Investment",
      "Full Principal Return",
      "Daily Profit Accrual",
      "Withdraw Anytime",
      "Priority Support",
      "Personal Account Manager"
    ]
  },
  {
    id: "whales",
    name: "Whales",
    range: "$15,000 - $50,000",
    minAmount: 15000,
    maxAmount: 50000,
    dailyReturn: 2.2,
    duration: 30,
    totalReturn: 166,
    features: [
      "Secure Investment",
      "Full Principal Return",
      "Daily Profit Accrual",
      "Withdraw Anytime",
      "Priority Support",
      "Personal Account Manager",
      "Custom Investment Strategy"
    ]
  },
  {
    id: "accredited",
    name: "Accredited Investor",
    range: "$50,000+",
    minAmount: 50000,
    maxAmount: 1000000,
    dailyReturn: 2.5,
    duration: 40,
    totalReturn: 200,
    features: [
      "Secure Investment",
      "Full Principal Return",
      "Daily Profit Accrual",
      "Withdraw Anytime",
      "VIP Support",
      "Executive Account Manager",
      "Custom Investment Strategy",
      "Direct Project Access",
      "Quarterly Investment Reports"
    ]
  }
];

const InvestmentPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState<InvestmentPlan | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);
  
  const handleCalculate = (plan: InvestmentPlan) => {
    setSelectedPlan(plan);
    setInvestmentAmount(plan.minAmount);
    
    // Scroll to calculator section
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const dailyProfit = selectedPlan ? (investmentAmount * selectedPlan.dailyReturn) / 100 : 0;
  const totalProfit = selectedPlan ? dailyProfit * selectedPlan.duration : 0;
  const totalReturn = investmentAmount + totalProfit;

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-6">Investment Plans</h1>
            <p className="text-xl text-gray-200">
              Choose from our range of carefully structured investment plans designed to match your financial goals and risk tolerance.
            </p>
          </div>
        </div>
      </section>
      
      {/* Investment Plans Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-3 mb-8 text-center">
              <h2 className="heading-lg text-investment-navy mb-4">Find the Perfect Plan for Your Financial Goals</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our investment plans are designed to provide consistent returns from the oil and gas market. Each plan offers a balance of security, liquidity, and profit potential tailored to different investment capacities.
              </p>
            </div>
            
            {investmentPlans.map((plan) => (
              <div 
                key={plan.id} 
                className={`rounded-lg overflow-hidden shadow-lg transition-transform hover:translate-y-[-5px] ${
                  plan.highlighted ? 'border-2 border-investment-gold' : 'border border-gray-200'
                }`}
              >
                <div className={`p-6 ${plan.highlighted ? 'bg-investment-gold text-investment-navy' : 'bg-investment-navy text-white'}`}>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold mb-2">{plan.range}</div>
                  <p className={plan.highlighted ? 'text-investment-navy/80' : 'text-gray-300'}>
                    {plan.dailyReturn}% daily for {plan.duration} days
                  </p>
                </div>
                
                <div className="p-6 bg-white">
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                      <span className="text-gray-600">Minimum:</span>
                      <span className="font-semibold text-investment-navy">${plan.minAmount.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                      <span className="text-gray-600">Maximum:</span>
                      <span className="font-semibold text-investment-navy">${plan.maxAmount === 1000000 ? "50,000+" : plan.maxAmount.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                      <span className="text-gray-600">Daily Profit:</span>
                      <span className="font-semibold text-investment-navy">{plan.dailyReturn}%</span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-semibold text-investment-navy">{plan.duration} days</span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                      <span className="text-gray-600">Total Return:</span>
                      <span className="font-bold text-investment-navy">{plan.totalReturn}%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <h4 className="font-bold text-investment-navy">Features:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle2 className="h-5 w-5 text-investment-gold mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Link to="/register">
                      <Button className={`w-full ${
                        plan.highlighted 
                          ? 'bg-investment-gold hover:bg-investment-lightGold text-investment-navy' 
                          : 'bg-investment-navy hover:bg-investment-lightNavy text-white'
                      }`}>
                        Invest Now
                      </Button>
                    </Link>
                    <Button 
                      variant="outline"
                      className="w-full border-investment-navy text-investment-navy"
                      onClick={() => handleCalculate(plan)}
                    >
                      Calculate
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Calculator Section */}
      <section id="calculator" className="py-16 bg-investment-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-lg text-investment-navy mb-6 text-center">
              Investment Calculator
            </h2>
            
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
                        onChange={(e) => {
                          const plan = investmentPlans.find(p => p.id === e.target.value);
                          if (plan) {
                            setSelectedPlan(plan);
                            setInvestmentAmount(plan.minAmount);
                          }
                        }}
                      >
                        <option value="" disabled>Select a plan</option>
                        {investmentPlans.map(plan => (
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
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            if (isNaN(value)) return;
                            
                            const clampedValue = Math.max(
                              Math.min(value, selectedPlan.maxAmount),
                              selectedPlan.minAmount
                            );
                            
                            setInvestmentAmount(clampedValue);
                          }}
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
                  {selectedPlan ? (
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
                            ${dailyProfit.toFixed(2)} <span className="text-sm font-normal">({selectedPlan.dailyReturn}%)</span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-gray-300 text-sm">Total Profit ({selectedPlan.duration} days):</div>
                          <div className="text-2xl font-bold text-investment-gold">
                            ${totalProfit.toFixed(2)}
                          </div>
                        </div>
                        
                        <div className="pt-3 border-t border-investment-lightNavy">
                          <div className="text-gray-300 text-sm">Total Return:</div>
                          <div className="text-3xl font-bold">
                            ${totalReturn.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      
                      <Link to="/register" className="block mt-6">
                        <Button className="w-full bg-investment-gold hover:bg-investment-lightGold text-investment-navy font-bold">
                          Start Investing Now <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
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
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-lg text-investment-navy mb-8 text-center">
              Investment Plan Features
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="text-center p-6 bg-investment-gray rounded-lg">
                <ShieldCheck className="h-12 w-12 text-investment-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold text-investment-navy mb-2">Secure & Protected</h3>
                <p className="text-gray-600">
                  Your investments are protected by tangible assets and secured through legal frameworks.
                </p>
              </div>
              
              <div className="text-center p-6 bg-investment-gray rounded-lg">
                <Clock className="h-12 w-12 text-investment-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold text-investment-navy mb-2">Daily Returns</h3>
                <p className="text-gray-600">
                  Earn profits daily, with returns credited directly to your account balance.
                </p>
              </div>
              
              <div className="text-center p-6 bg-investment-gray rounded-lg">
                <BarChart className="h-12 w-12 text-investment-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold text-investment-navy mb-2">Full Transparency</h3>
                <p className="text-gray-600">
                  Track your investment performance in real-time through your personal dashboard.
                </p>
              </div>
            </div>
            
            <div className="bg-investment-gray p-8 rounded-lg">
              <h3 className="text-xl font-bold text-investment-navy mb-4">
                Frequently Asked Questions
              </h3>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    How do I start investing with WealthHarbor?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    To start investing, simply create an account, select your preferred investment plan, and make a deposit using your preferred payment method. Once your deposit is confirmed, your investment will be activated, and you'll start earning returns immediately.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    Are my investments secure?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Yes, your investments are secured through a combination of tangible asset backing, legal protections, and our comprehensive risk management strategies. We employ industry-standard security measures to protect both your capital and personal information.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    When and how can I withdraw my profits?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    You can withdraw your profits at any time through your account dashboard. Withdrawal requests are typically processed within 24 hours, and funds are sent to your registered payment method. There are no withdrawal fees for profit withdrawals.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">
                    What payment methods do you accept?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    We accept a wide range of payment methods including major cryptocurrencies (Bitcoin, Ethereum, Litecoin, etc.), bank transfers, and select e-payment systems. Cryptocurrency transactions typically offer the fastest processing times and enhanced privacy.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">
                    Can I upgrade my investment plan?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Yes, you can upgrade to a higher-tier investment plan at any time by making additional deposits that meet the minimum requirement for the desired plan. Your account manager can assist you with the upgrade process to ensure a smooth transition.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-investment-navy text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-md mb-6">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="text-gray-300 mb-8">
              Join thousands of satisfied investors who are already benefiting from our reliable and profitable investment plans.
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

export default InvestmentPlans;
