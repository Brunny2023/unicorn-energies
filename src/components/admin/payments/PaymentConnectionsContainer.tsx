
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertContainer } from "./alerts/AlertContainer";
import FiatPaymentSection from "./sections/FiatPaymentSection";
import CryptoPaymentSection from "./sections/CryptoPaymentSection";
import { CreditCard, Bitcoin } from "lucide-react";

const PaymentConnectionsContainer = () => {
  const [activeTab, setActiveTab] = useState("fiat");
  const [saveStatus, setSaveStatus] = useState<{status: 'idle' | 'saving' | 'success' | 'error', message?: string}>({
    status: 'idle'
  });

  // Simulated save function
  const handleSaveKeys = (paymentType: string, formData: any) => {
    console.log(`Saving ${paymentType} keys:`, formData);
    setSaveStatus({ status: 'saving' });
    
    // Simulate API call
    setTimeout(() => {
      setSaveStatus({ 
        status: 'success', 
        message: `${paymentType.charAt(0).toUpperCase() + paymentType.slice(1)} payment configuration saved successfully!` 
      });
      
      // Reset status after a few seconds
      setTimeout(() => setSaveStatus({ status: 'idle' }), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Payment Connections</h2>
      </div>

      <AlertContainer saveStatus={saveStatus} />

      <Tabs defaultValue="fiat" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-[400px] mb-4">
          <TabsTrigger value="fiat" className="data-[state=active]:bg-unicorn-gold data-[state=active]:text-unicorn-black">
            <CreditCard className="mr-2 h-4 w-4" />
            Fiat Payments
          </TabsTrigger>
          <TabsTrigger value="crypto" className="data-[state=active]:bg-unicorn-gold data-[state=active]:text-unicorn-black">
            <Bitcoin className="mr-2 h-4 w-4" />
            Crypto Payments
          </TabsTrigger>
        </TabsList>
        
        {/* Fiat Payment Connections */}
        <TabsContent value="fiat">
          <FiatPaymentSection handleSaveKeys={handleSaveKeys} saveStatus={saveStatus} />
        </TabsContent>
        
        {/* Crypto Payment Connections */}
        <TabsContent value="crypto">
          <CryptoPaymentSection handleSaveKeys={handleSaveKeys} saveStatus={saveStatus} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentConnectionsContainer;
