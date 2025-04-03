
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PlanCard from '@/components/investment/PlanCard';
import PlanCalculator from '@/components/investment/PlanCalculator';
import InvestmentFeatures from '@/components/investment/InvestmentFeatures';

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
  
  const handleCalculate = (plan: InvestmentPlan) => {
    setSelectedPlan(plan);
    
    // Scroll to calculator section
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

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
              <h2 className="heading-lg text-unicorn-darkPurple mb-4 font-bold">Find the Perfect Plan for Your Financial Goals</h2>
              <p className="text-gray-800 max-w-3xl mx-auto text-lg">
                Our investment plans are designed to provide consistent returns from the oil and gas market. Each plan offers a balance of security, liquidity, and profit potential tailored to different investment capacities.
              </p>
            </div>
            
            {investmentPlans.map((plan) => (
              <PlanCard 
                key={plan.id} 
                plan={plan} 
                onCalculateClick={handleCalculate} 
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Calculator Section */}
      <section id="calculator" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-lg text-unicorn-darkPurple mb-6 text-center font-bold">
              Investment Calculator
            </h2>
            
            <PlanCalculator 
              selectedPlan={selectedPlan} 
              plans={investmentPlans}
              onSelectPlan={setSelectedPlan}
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <InvestmentFeatures />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-unicorn-darkPurple text-white">
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
                <Button className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-bold text-lg">
                  Create Your Account <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg">
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
