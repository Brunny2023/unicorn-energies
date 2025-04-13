
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bitcoin, Building2, Wallet } from 'lucide-react';

interface WithdrawalMethodTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  lastDepositMethod?: string | null;
}

const WithdrawalMethodTabs: React.FC<WithdrawalMethodTabsProps> = ({ 
  activeTab, 
  onTabChange,
  lastDepositMethod
}) => {
  return (
    <>
      <TabsList className="grid grid-cols-3 mb-4 bg-unicorn-darkPurple/70">
        <TabsTrigger 
          value="crypto" 
          className="data-[state=active]:bg-unicorn-gold/20 data-[state=active]:text-unicorn-gold"
        >
          <Bitcoin className="h-4 w-4 mr-2" /> Crypto
        </TabsTrigger>
        <TabsTrigger 
          value="bank" 
          className="data-[state=active]:bg-unicorn-gold/20 data-[state=active]:text-unicorn-gold"
        >
          <Building2 className="h-4 w-4 mr-2" /> Bank
        </TabsTrigger>
        <TabsTrigger 
          value="digital_wallet" 
          className="data-[state=active]:bg-unicorn-gold/20 data-[state=active]:text-unicorn-gold"
        >
          <Wallet className="h-4 w-4 mr-2" /> Digital Wallet
        </TabsTrigger>
      </TabsList>

      {lastDepositMethod && (
        <div className="bg-amber-500/10 text-amber-400 p-2 mb-4 rounded text-sm flex items-center">
          <span className="mr-1">⚠</span> You can only withdraw using the same method you deposited with ({lastDepositMethod}).
        </div>
      )}
    </>
  );
};

export default WithdrawalMethodTabs;
