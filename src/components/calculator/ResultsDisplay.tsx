
import { ArrowRight, Sparkle, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calculator } from 'lucide-react';
import { CalculationResults } from '@/types/investment';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ResultsDisplayProps {
  results: CalculationResults | null;
  selectedPlanDuration: number;
}

const ResultsDisplay = ({ results, selectedPlanDuration }: ResultsDisplayProps) => {
  if (!results) {
    return <EmptyResultsState />;
  }
  
  return <PopulatedResultsState results={results} selectedPlanDuration={selectedPlanDuration} />;
};

const EmptyResultsState = () => (
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
);

const PopulatedResultsState = ({ results, selectedPlanDuration }: { results: CalculationResults, selectedPlanDuration: number }) => (
  <div className="space-y-8">
    <div className="relative">
      <div className="text-gray-300 mb-1">Daily Profit:</div>
      <div className="text-3xl font-bold text-unicorn-gold flex items-center">
        ${results.dailyProfit.toFixed(2)}
        <Sparkle className="ml-2 h-4 w-4 text-unicorn-gold animate-pulse" />
      </div>
    </div>
    
    <div className="relative">
      <div className="text-gray-300 mb-1">Total Profit ({selectedPlanDuration} days):</div>
      <div className="text-3xl font-bold text-unicorn-gold flex items-center">
        ${results.totalProfit.toFixed(2)}
        <Sparkle className="ml-2 h-4 w-4 text-unicorn-gold animate-pulse" />
      </div>
    </div>
    
    <div className="relative">
      <div className="text-gray-300 mb-1">Annual Yield (APY):</div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="text-3xl font-bold text-unicorn-gold flex items-center cursor-help">
              {results.annualYield.toFixed(2)}%
              <TrendingUp className="ml-2 h-4 w-4 text-unicorn-gold" />
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-unicorn-darkPurple border-unicorn-gold/30 text-white">
            <p>Annual Percentage Yield if reinvested for a full year</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    
    <div className="pt-6 border-t border-unicorn-purple/30">
      <div className="text-gray-300 mb-1">Total Return (Capital + Profit):</div>
      <div className="text-4xl font-bold text-white glow-text">
        ${results.totalReturn.toFixed(2)}
      </div>
    </div>
    
    <Button asChild className="mt-8 w-full bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-bold group shadow-[0_0_15px_rgba(255,215,0,0.3)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.5)]">
      <Link to="/investment-plans">
        Invest Now <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </Button>
  </div>
);

export default ResultsDisplay;
