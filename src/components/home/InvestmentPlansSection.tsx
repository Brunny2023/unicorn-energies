
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Define the investment plan type
type InvestmentPlan = {
  name: string;
  range: string;
  dailyReturn: number;
  duration: number;
  totalReturn: number;
  featured?: boolean;
};

// Sample investment plans data
const investmentPlans: InvestmentPlan[] = [
  {
    name: "Goldfish",
    range: "$100 - $999",
    dailyReturn: 1.2,
    duration: 15,
    totalReturn: 118
  },
  {
    name: "Dolphin",
    range: "$1,000 - $4,999",
    dailyReturn: 1.5,
    duration: 20,
    totalReturn: 130,
    featured: true
  },
  {
    name: "Shark",
    range: "$5,000 - $14,999",
    dailyReturn: 1.8,
    duration: 25,
    totalReturn: 145
  },
  {
    name: "Whales",
    range: "$15,000 - $50,000",
    dailyReturn: 2.2,
    duration: 30,
    totalReturn: 166
  }
];

const InvestmentPlansSection = () => {
  return (
    <section className="section-padding bg-investment-gray">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-lg text-investment-navy mb-4">
            Investment Plans Tailored to Your Goals
          </h2>
          <p className="text-gray-600">
            Choose from our range of carefully structured investment plans designed to match your financial objectives and risk tolerance. Each plan offers competitive returns with clear terms and transparent processes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {investmentPlans.map((plan) => (
            <div 
              key={plan.name}
              className={`bg-white rounded-lg shadow-md overflow-hidden card-hover ${
                plan.featured ? 'border-2 border-investment-gold relative' : ''
              }`}
            >
              {plan.featured && (
                <div className="absolute top-0 right-0 bg-investment-gold text-investment-navy text-xs font-bold px-3 py-1">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-investment-navy mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-investment-lightNavy mb-4">{plan.range}</div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Daily Return:</span>
                    <span className="font-semibold text-investment-navy">{plan.dailyReturn}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold text-investment-navy">{plan.duration} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Return:</span>
                    <span className="font-semibold text-investment-navy">{plan.totalReturn}%</span>
                  </div>
                </div>
                
                <Link to="/investment-plans">
                  <Button className={`w-full ${
                    plan.featured 
                      ? 'bg-investment-gold hover:bg-investment-lightGold text-investment-navy' 
                      : 'bg-investment-navy hover:bg-investment-lightNavy text-white'
                  }`}>
                    Invest Now
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/investment-plans">
            <Button variant="outline" className="border-investment-navy text-investment-navy hover:bg-investment-navy hover:text-white">
              View All Investment Plans <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InvestmentPlansSection;
