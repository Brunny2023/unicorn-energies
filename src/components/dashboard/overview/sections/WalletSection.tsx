
import React from 'react';
import StatCards from '../StatCards';

interface WalletSectionProps {
  loading: boolean;
  walletData: {
    balance: number;
    accrued_profits: number;
  };
  investmentStats: {
    active_count: number;
    total_invested: number;
    total_expected_return: number;
  };
  ticketStats: {
    open_count: number;
    latest_ticket: any | null;
  };
}

const WalletSection: React.FC<WalletSectionProps> = ({ 
  loading, 
  walletData, 
  investmentStats, 
  ticketStats 
}) => {
  return (
    <StatCards 
      loading={loading}
      walletData={walletData}
      investmentStats={investmentStats}
      ticketStats={ticketStats}
    />
  );
};

export default WalletSection;
