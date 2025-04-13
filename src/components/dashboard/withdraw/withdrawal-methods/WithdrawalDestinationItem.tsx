
import React from 'react';
import { Bitcoin, Building2, Wallet } from 'lucide-react';
import { WithdrawalDestination } from '@/types/investment';

interface WithdrawalDestinationItemProps {
  destination: WithdrawalDestination;
  onClick: () => void;
}

const WithdrawalDestinationItem: React.FC<WithdrawalDestinationItemProps> = ({
  destination,
  onClick
}) => {
  const getMethodIcon = (method: 'crypto' | 'bank' | 'digital_wallet') => {
    switch (method) {
      case 'crypto':
        return <Bitcoin className="h-5 w-5" />;
      case 'bank':
        return <Building2 className="h-5 w-5" />;
      case 'digital_wallet':
        return <Wallet className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div
      onClick={onClick}
      className="p-3 rounded-md border border-unicorn-gold/20 bg-unicorn-darkPurple/30 hover:bg-unicorn-purple/20 cursor-pointer transition-colors flex items-center justify-between"
    >
      <div className="flex items-center">
        {getMethodIcon(destination.method_type)}
        <div className="ml-3">
          <div className="text-white font-medium">{destination.name}</div>
          <div className="text-xs text-gray-400">
            {destination.method_type === 'crypto' && 
              `${destination.details.network || 'Crypto'} • ${destination.details.address ? destination.details.address.substring(0, 6) + '...' + destination.details.address.substring(destination.details.address.length - 4) : ''}`
            }
            {destination.method_type === 'bank' && 
              `${destination.details.bank_name || 'Bank'} • ${destination.details.account_number || ''}`
            }
            {destination.method_type === 'digital_wallet' && 
              `${destination.details.service_provider || ''} • ${destination.details.email || ''}`
            }
          </div>
        </div>
      </div>
      {destination.is_default && (
        <span className="text-xs bg-unicorn-gold/20 text-unicorn-gold px-2 py-1 rounded-full">
          Default
        </span>
      )}
    </div>
  );
};

export default WithdrawalDestinationItem;
