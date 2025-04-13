
import { Button } from "@/components/ui/button";
import { RefreshCw, InfoCircle } from "lucide-react";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface LoanApplicationsHeaderProps {
  onRefresh?: () => void;
  refreshing?: boolean;
}

const LoanApplicationsHeader = ({ 
  onRefresh, 
  refreshing = false 
}: LoanApplicationsHeaderProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Loan Applications Management</h1>
        
        {onRefresh && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRefresh}
            disabled={refreshing}
            className="border-unicorn-gold/30 text-unicorn-gold hover:bg-unicorn-gold/10"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        )}
      </div>
      
      <div className="bg-unicorn-darkPurple/60 border border-unicorn-gold/30 rounded-lg p-4 text-gray-300">
        <div className="flex items-center mb-2">
          <h3 className="font-medium text-unicorn-gold text-lg mr-2">Loan Approval Guidelines</h3>
          <HoverCard>
            <HoverCardTrigger asChild>
              <InfoCircle className="h-4 w-4 text-unicorn-gold cursor-help" />
            </HoverCardTrigger>
            <HoverCardContent className="w-80 bg-unicorn-darkPurple border-unicorn-gold/30 text-white">
              <p className="text-sm">
                These guidelines help maintain a responsible lending policy while promoting investment activity.
              </p>
            </HoverCardContent>
          </HoverCard>
        </div>
        
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>
            Loans must be based on users' proposed investment amount, with a maximum limit of 300% of the proposed investment.
          </li>
          <li>
            Funds from loans can only be used for investments and cannot be withdrawn directly.
          </li>
          <li>
            Users must invest at least 33.33% of their loan amount before they can withdraw any profits from loan-funded investments.
          </li>
          <li>
            The proposed investment amount can be found in the loan application purpose field.
          </li>
          <li>
            Always verify the user's investment history and wallet balance before approving large loans.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LoanApplicationsHeader;
