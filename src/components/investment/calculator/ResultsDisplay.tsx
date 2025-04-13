
import { ArrowRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CalculationResults } from '@/types/investment';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from 'react-router-dom';

interface ResultsDisplayProps {
  selectedPlan: any;
  calculationResults: CalculationResults | null;
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
  const navigate = useNavigate();
  
  if (!selectedPlan) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <h3 className="text-xl font-semibold mb-4">Select a Plan</h3>
        <p className="text-gray-300">
          Choose an investment plan from the left panel to see potential returns
        </p>
      </div>
    );
  }
  
  if (!calculationResults) {
    return (
      <div className="space-y-6">
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">{selectedPlan.name} Plan</h3>
          <p className="text-gray-300 text-sm">
            Daily Return: {selectedPlan.dailyReturn}% for {selectedPlan.duration} days
          </p>
        </div>
        
        <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-500/30">
          <p className="text-white text-sm">
            Enter your investment amount to see the potential returns calculation
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">{selectedPlan.name} Plan Results</h3>
      
      <div className="grid grid-cols-1 gap-4">
        <ResultItem 
          label="Investment Amount" 
          value={`$${investmentAmount.toLocaleString()}`}
        />
        
        <ResultItem 
          label="Daily Return" 
          value={`$${calculationResults.dailyProfit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
          subValue={`${selectedPlan.dailyReturn}%`}
        />
        
        <ResultItem 
          label="Total Profit" 
          value={`$${calculationResults.totalProfit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
          subValue={`${calculationResults.returnPercentage.toFixed(2)}%`}
          tooltip="Total returns after the investment period"
        />
        
        <ResultItem 
          label="Annual Yield (APY)" 
          value={`${calculationResults.annualYield.toFixed(2)}%`}
          tooltip="Annualized percentage yield if reinvested for a full year"
        />
        
        <div className="bg-green-900/30 rounded p-4 border border-green-500/30 mt-2">
          <div className="font-semibold mb-1">Total Return</div>
          <div className="text-2xl font-bold">
            ${calculationResults.totalReturn.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Capital + Profit after {selectedPlan.duration} days
          </div>
        </div>
      </div>
      
      <div className="pt-4">
        {user ? (
          <Button 
            onClick={onInvest} 
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Processing..." : "Invest Now"} 
            {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        ) : (
          <Button 
            onClick={() => navigate('/login')} 
            className="w-full"
          >
            Log in to Invest <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

interface ResultItemProps {
  label: string;
  value: string;
  subValue?: string;
  tooltip?: string;
}

const ResultItem = ({ label, value, subValue, tooltip }: ResultItemProps) => {
  const content = (
    <div className="border-b border-gray-700 pb-3">
      <div className="text-gray-400 text-sm">{label}</div>
      <div className="text-lg font-semibold flex items-center">
        {value}
        {tooltip && <Info className="ml-2 h-4 w-4 text-gray-400" />}
      </div>
      {subValue && <div className="text-xs text-gray-400">{subValue}</div>}
    </div>
  );
  
  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-help">{content}</div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  return content;
};

export default ResultsDisplay;
