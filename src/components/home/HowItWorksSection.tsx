
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserPlus, MousePointer, TrendingUp, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: "Create an Account",
    description: "Register for free in less than 2 minutes. Verify your email to activate your account and access our investment platform."
  },
  {
    icon: MousePointer,
    title: "Choose Your Investment Plan",
    description: "Select from our range of investment plans based on your financial goals and risk tolerance. Deposit funds using your preferred payment method."
  },
  {
    icon: TrendingUp,
    title: "Earn Daily Returns",
    description: "Start earning returns immediately. Track your investments in real-time through your personal dashboard and withdraw profits at your convenience."
  }
];

const HowItWorksSection = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-lg text-investment-navy mb-4">
            How It Works
          </h2>
          <p className="text-gray-600">
            Getting started with WealthHarbor is simple. Follow these three easy steps to begin your investment journey and secure your financial future.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-investment-gray rounded-lg p-8 text-center h-full card-hover">
                <div className="bg-investment-gold rounded-full p-4 inline-flex items-center justify-center mb-6">
                  <step.icon className="h-8 w-8 text-investment-navy" />
                </div>
                
                <div className="absolute -top-4 -right-4 bg-investment-navy text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                
                <h3 className="text-xl font-bold text-investment-navy mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 rotate-90 md:rotate-0">
                  <ArrowRight className="h-8 w-8 text-investment-gold" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/register">
            <Button className="bg-investment-navy hover:bg-investment-lightNavy text-white">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
