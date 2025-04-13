
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface LoanApplicationsHeaderProps {
  onRefresh?: () => void;
  refreshing?: boolean;
}

const LoanApplicationsHeader = ({ 
  onRefresh, 
  refreshing = false 
}: LoanApplicationsHeaderProps) => {
  return (
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
  );
};

export default LoanApplicationsHeader;
