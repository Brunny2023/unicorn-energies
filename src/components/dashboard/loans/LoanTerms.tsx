
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const LoanTerms = () => {
  return (
    <Alert className="bg-blue-500/10 text-blue-400 border-blue-500/30">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        <strong>Loan Terms:</strong>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Minimum loan amount: $3,500</li>
          <li>A commitment fee of 5% will be charged when submitting your application</li>
          <li>Loan amount cannot exceed 300% of your proposed investment</li>
          <li>You must double your loan amount through daily interests before withdrawing any profits</li>
          <li>Refer other loan applicants and earn $250 for each referred person who pays at least $688 in commitment fees</li>
        </ul>
      </AlertDescription>
    </Alert>
  );
};

export default LoanTerms;
