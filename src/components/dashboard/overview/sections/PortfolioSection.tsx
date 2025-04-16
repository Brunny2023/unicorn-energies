
import React from 'react';
import PortfolioSummary from '../PortfolioSummary';
import OilTradingChart from '../OilTradingChart';

interface PortfolioSectionProps {
  loading: boolean;
  investmentStats: {
    active_count: number;
    total_invested: number;
    total_expected_return: number;
  };
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ 
  loading, 
  investmentStats 
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <PortfolioSummary 
        loading={loading}
        investmentStats={investmentStats}
      />
      <OilTradingChart />
    </div>
  );
};

export default PortfolioSection;
