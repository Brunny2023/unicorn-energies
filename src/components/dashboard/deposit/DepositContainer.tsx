
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import FiatDepositForm from "./FiatDepositForm";
import CryptoDepositForm from "./CryptoDepositForm";
import WalletSummary from "@/components/dashboard/withdraw/WalletSummary";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { fetchWalletData } from "@/utils/wallet";
import { WalletData } from "@/types/investment";

const DepositContainer = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Track deposit method for "same method" withdrawal functionality
  const [lastDepositMethod, setLastDepositMethod] = useState<string | null>(null);
  
  React.useEffect(() => {
    const getWalletData = async () => {
      if (!user?.id) return;
      
      try {
        setLoading(true);
        const data = await fetchWalletData(user.id);
        setWalletData(data);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
        toast({
          title: "Error",
          description: "Failed to load wallet data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    getWalletData();
  }, [user, toast]);
  
  const handleSuccessfulDeposit = (depositData: any) => {
    // Store the deposit method for future withdrawals
    if (depositData.method) {
      setLastDepositMethod(depositData.method);
      // In a real app, you would also store this in the database
      localStorage.setItem("lastDepositMethod", depositData.method);
    }
    
    // Refresh wallet data
    if (user?.id) {
      fetchWalletData(user.id).then(data => {
        setWalletData(data);
      });
    }
    
    toast({
      title: "Deposit Successful",
      description: `Your deposit of $${depositData.amount.toFixed(2)} has been processed successfully.`,
    });
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Tabs defaultValue="fiat" className="w-full">
          <TabsList className="bg-unicorn-darkPurple/30 border border-unicorn-gold/20 w-full mb-6">
            <TabsTrigger 
              value="fiat" 
              className="w-1/2 data-[state=active]:bg-unicorn-gold/20 data-[state=active]:text-unicorn-gold"
            >
              Credit/Debit Card
            </TabsTrigger>
            <TabsTrigger 
              value="crypto" 
              className="w-1/2 data-[state=active]:bg-unicorn-gold/20 data-[state=active]:text-unicorn-gold"
            >
              Cryptocurrency
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="fiat">
            <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30 overflow-hidden">
              <FiatDepositForm 
                onSuccessfulDeposit={handleSuccessfulDeposit} 
                userId={user?.id || ''} 
              />
            </Card>
          </TabsContent>
          
          <TabsContent value="crypto">
            <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30 overflow-hidden">
              <CryptoDepositForm 
                onSuccessfulDeposit={handleSuccessfulDeposit}
                userId={user?.id || ''}
              />
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Important Information</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start">
              <span className="text-unicorn-gold mr-2">•</span>
              <span>Deposits are typically processed within 1 business day for card payments and after 3 confirmations for crypto.</span>
            </li>
            <li className="flex items-start">
              <span className="text-unicorn-gold mr-2">•</span>
              <span>You can only withdraw funds using the same payment method used for deposits (card or specific cryptocurrency).</span>
            </li>
            <li className="flex items-start">
              <span className="text-unicorn-gold mr-2">•</span>
              <span>Minimum deposit amount is $100 for card payments and equivalent for cryptocurrencies.</span>
            </li>
            <li className="flex items-start">
              <span className="text-unicorn-gold mr-2">•</span>
              <span>For questions about deposits, please contact our support team.</span>
            </li>
          </ul>
        </Card>
      </div>
      
      <div>
        <WalletSummary 
          walletData={walletData} 
          loading={loading} 
          lastDepositMethod={lastDepositMethod || localStorage.getItem("lastDepositMethod")}
        />
        
        <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30 p-6 mt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Deposit History</h3>
          <p className="text-gray-400 text-sm">
            View your recent deposit transactions in the Transactions tab
          </p>
        </Card>
      </div>
    </div>
  );
};

export default DepositContainer;
