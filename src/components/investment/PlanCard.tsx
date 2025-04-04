
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

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

interface PlanCardProps {
  plan: InvestmentPlan;
  onCalculateClick: (plan: InvestmentPlan) => void;
}

const PlanCard = ({ plan, onCalculateClick }: PlanCardProps) => {
  return (
    <div 
      className={`rounded-lg overflow-hidden shadow-lg transition-transform hover:translate-y-[-5px] ${
        plan.highlighted ? 'border-2 border-investment-gold' : 'border border-gray-200'
      }`}
    >
      <div className={`p-6 text-white ${plan.highlighted ? 'bg-investment-gold text-investment-navy' : 'bg-investment-navy'}`}>
        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
        <div className="text-3xl font-bold mb-2 text-white">{plan.range}</div>
        <p className={`font-medium ${plan.highlighted ? 'text-investment-navy/90' : 'text-white'}`}>
          {plan.dailyReturn}% daily for {plan.duration} days
        </p>
      </div>
      
      <div className="p-6 bg-white">
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <span className="text-gray-700 font-medium">Minimum:</span>
            <span className="font-bold text-investment-navy">${plan.minAmount.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <span className="text-gray-700 font-medium">Maximum:</span>
            <span className="font-bold text-investment-navy">${plan.maxAmount === 1000000 ? "50,000+" : plan.maxAmount.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <span className="text-gray-700 font-medium">Daily Profit:</span>
            <span className="font-bold text-investment-navy">{plan.dailyReturn}%</span>
          </div>
          
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <span className="text-gray-700 font-medium">Duration:</span>
            <span className="font-bold text-investment-navy">{plan.duration} days</span>
          </div>
          
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <span className="text-gray-700 font-medium">Total Return:</span>
            <span className="font-bold text-lg text-investment-navy">{plan.totalReturn}%</span>
          </div>
        </div>
        
        <div className="space-y-2 mb-6">
          <h4 className="font-bold text-investment-navy mb-3">Features:</h4>
          <ul className="space-y-2">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-investment-gold mr-2 shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link to="/register" className="w-full">
            <Button className={`w-full font-bold ${
              plan.highlighted 
                ? 'bg-investment-gold hover:bg-investment-lightGold text-investment-navy' 
                : 'bg-investment-navy hover:bg-investment-lightNavy text-white'
            }`}>
              Invest Now
            </Button>
          </Link>
          <Button 
            variant="outline"
            className="w-full border-investment-navy text-investment-navy font-bold hover:bg-investment-navy/5"
            onClick={() => onCalculateClick(plan)}
          >
            Calculate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
