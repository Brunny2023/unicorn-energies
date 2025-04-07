
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart } from 'lucide-react';
import { CalculationResults } from '@/types/investment';

interface ResultsDisplayProps {
  selectedPlan: any;
  calculationResults: CalculationResults;
  investmentAmount: number;
  user: any;
  isSubmitting: boolean;
  onInvest: () => void;
}

const ResultsDisplay = ({ 
  selectedPlan, 
  calculationResults, 
  investmentAmount, 
  user, 
  isSubmitting, 
  onInvest 
}: ResultsDisplayProps) => {
  if (!selectedPlan || !calculationResults) {
    return (
      <div className="text-center py-6">
        <BarChart className="h-12 w-12 text-investment-gold mx-auto mb-4" />
        <p className="text-gray-300">
          Select an investment plan to calculate potential returns
        </p>
      </div>
    );
  }

  return (
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
            ${calculationResults.dailyProfit.toFixed(2)} <span className="text-sm font-normal">({selectedPlan.dailyReturn}%)</span>
          </div>
        </div>
        
        <div>
          <div className="text-gray-300 text-sm">Total Profit ({selectedPlan.duration} days):</div>
          <div className="text-2xl font-bold text-investment-gold">
            ${calculationResults.totalProfit.toFixed(2)}
          </div>
        </div>
        
        <div className="pt-3 border-t border-investment-lightNavy">
          <div className="text-gray-300 text-sm">Total Return:</div>
          <div className="text-3xl font-bold">
            ${calculationResults.totalReturn.toFixed(2)}
          </div>
        </div>
      </div>
      
      {user ? (
        <Button 
          className="w-full mt-6 bg-investment-gold hover:bg-investment-lightGold text-investment-navy font-bold"
          onClick={onInvest}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Invest Now"} <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      ) : (
        <Link to="/register" className="block mt-6">
          <Button className="w-full bg-investment-gold hover:bg-investment-lightGold text-investment-navy font-bold">
            Register to Invest <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export default ResultsDisplay;
