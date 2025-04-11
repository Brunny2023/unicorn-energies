
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Zap, Clock, DollarSign, AlertTriangle } from "lucide-react";

interface InvestmentDetailProgressProps {
  progress: number;
  earnedSoFar: number;
  daysRemaining: number;
  status: string;
}

const InvestmentDetailProgress: React.FC<InvestmentDetailProgressProps> = ({
  progress,
  earnedSoFar,
  daysRemaining,
  status
}) => {
  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-unicorn-gold mb-4">Progress</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Completion</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-unicorn-purple/30" />
        </div>
        
        <div className="bg-unicorn-purple/20 p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <div className="flex items-center">
              <Zap className="h-4 w-4 text-unicorn-gold mr-2" />
              <span className="text-gray-400">Profit Generated</span>
            </div>
            <span className="text-green-400">{formatCurrency(earnedSoFar)}</span>
          </div>
          <Separator className="bg-unicorn-gold/20 my-2" />
          <div className="flex justify-between">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-unicorn-gold mr-2" />
              <span className="text-gray-400">Time Remaining</span>
            </div>
            <span>{daysRemaining} days</span>
          </div>
        </div>
        
        {status === 'active' && daysRemaining > 0 && (
          <div className="bg-unicorn-gold/10 border border-unicorn-gold/20 p-4 rounded-lg">
            <div className="flex">
              <DollarSign className="h-5 w-5 text-unicorn-gold mr-2 flex-shrink-0" />
              <div>
                <p className="text-sm">Your investment is actively generating returns.</p>
                <p className="text-xs text-gray-400 mt-1">Daily profits are being added to your account balance.</p>
              </div>
            </div>
          </div>
        )}
        
        {status === 'pending' && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
              <div>
                <p className="text-sm">Your investment is pending activation.</p>
                <p className="text-xs text-gray-400 mt-1">It will be activated within 24 hours.</p>
              </div>
            </div>
          </div>
        )}
        
        {status === 'completed' && (
          <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
            <div className="flex">
              <Zap className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <div>
                <p className="text-sm">This investment has been completed successfully.</p>
                <p className="text-xs text-gray-400 mt-1">All profits have been added to your wallet.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestmentDetailProgress;
