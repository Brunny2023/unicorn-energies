
import React from "react";

interface InvestmentDetailSummaryProps {
  amount: number;
  dailyReturn: number;
  dailyProfit: number;
  totalReturn: number;
}

const InvestmentDetailSummary: React.FC<InvestmentDetailSummaryProps> = ({
  amount,
  dailyReturn,
  dailyProfit,
  totalReturn
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
      <h3 className="text-lg font-medium text-unicorn-gold mb-4">Investment Summary</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-unicorn-purple/20 p-3 rounded-lg">
          <div className="text-sm text-gray-400">Amount Invested</div>
          <div className="text-lg font-semibold">{formatCurrency(amount)}</div>
        </div>
        <div className="bg-unicorn-purple/20 p-3 rounded-lg">
          <div className="text-sm text-gray-400">Daily Return</div>
          <div className="text-lg font-semibold text-green-400">{dailyReturn}%</div>
        </div>
        <div className="bg-unicorn-purple/20 p-3 rounded-lg">
          <div className="text-sm text-gray-400">Daily Profit</div>
          <div className="text-lg font-semibold text-green-400">{formatCurrency(dailyProfit)}</div>
        </div>
        <div className="bg-unicorn-purple/20 p-3 rounded-lg">
          <div className="text-sm text-gray-400">Total Return</div>
          <div className="text-lg font-semibold">{formatCurrency(totalReturn)}</div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentDetailSummary;
