
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

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
    <section className="py-24 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-unicorn-purple/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-unicorn-gold/20 blur-3xl rounded-full"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Investment Plans Tailored to <span className="text-unicorn-gold">Your Goals</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Choose from our range of carefully structured investment plans designed to match your financial objectives and risk tolerance. Each plan offers competitive returns with clear terms and transparent processes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {investmentPlans.map((plan) => (
            <Card 
              key={plan.name}
              className={`bg-unicorn-darkPurple/40 backdrop-blur-md border-0 overflow-hidden transform transition-all hover:translate-y-[-8px] hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] ${
                plan.featured ? 'relative' : ''
              }`}
            >
              {plan.featured && (
                <div className="absolute top-0 right-0">
                  <div className="bg-unicorn-gold text-unicorn-black text-xs font-bold px-6 py-1 rotate-45 translate-x-5 translate-y-3 shadow-md">
                    POPULAR
                  </div>
                </div>
              )}
              
              {/* Fancy border glow effect */}
              <div className={`absolute inset-0 rounded-lg ${
                plan.featured 
                  ? 'bg-gradient-to-r from-unicorn-gold via-unicorn-purple to-unicorn-gold' 
                  : 'bg-gradient-to-r from-unicorn-purple/40 to-unicorn-gold/40'
              } p-[1px]`}>
                <div className="w-full h-full bg-unicorn-darkPurple/40 backdrop-blur-md rounded-lg"></div>
              </div>
              
              <CardHeader className="relative pb-0 pt-6">
                <CardTitle className="text-2xl font-bold text-unicorn-gold mb-1 text-center">
                  {plan.name}
                </CardTitle>
                <div className="text-3xl font-bold text-white mb-2 text-center">
                  {plan.range}
                </div>
              </CardHeader>
              
              <CardContent className="relative pt-4">
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-2 px-1 border-b border-unicorn-purple/30">
                    <span className="text-gray-300">Daily Return:</span>
                    <span className="font-semibold text-unicorn-gold">{plan.dailyReturn}%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 px-1 border-b border-unicorn-purple/30">
                    <span className="text-gray-300">Duration:</span>
                    <span className="font-semibold text-unicorn-gold">{plan.duration} days</span>
                  </div>
                  <div className="flex justify-between items-center py-2 px-1">
                    <span className="text-gray-300">Total Return:</span>
                    <span className="font-semibold text-unicorn-gold">{plan.totalReturn}%</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="relative pt-0">
                <Link to="/investment-plans" className="w-full">
                  <Button 
                    className={`w-full group ${
                      plan.featured 
                        ? 'bg-unicorn-gold hover:bg-unicorn-gold/90 text-unicorn-black' 
                        : 'border border-unicorn-gold text-unicorn-gold hover:bg-unicorn-gold hover:bg-opacity-10'
                    }`}
                  >
                    Invest Now
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/investment-plans">
            <Button variant="outline" className="border-unicorn-gold text-unicorn-gold hover:bg-unicorn-gold/20 group">
              View All Investment Plans <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InvestmentPlansSection;
