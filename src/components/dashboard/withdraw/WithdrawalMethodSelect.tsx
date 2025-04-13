
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { WithdrawalDestination } from "@/types/investment";
import WithdrawalMethodTabs from "./withdrawal-methods/WithdrawalMethodTabs";
import WithdrawalDestinationItem from "./withdrawal-methods/WithdrawalDestinationItem";
import NewDestinationForm from "./withdrawal-methods/NewDestinationForm";

interface WithdrawalMethodSelectProps {
  lastDepositMethod?: string | null;
  onSelect: (destination: WithdrawalDestination) => void;
}

const WithdrawalMethodSelect: React.FC<WithdrawalMethodSelectProps> = ({ lastDepositMethod, onSelect }) => {
  const { user } = useAuth();
  const [savedDestinations, setSavedDestinations] = useState<WithdrawalDestination[]>([]);
  const [activeTab, setActiveTab] = useState(getDefaultTab());
  const [loading, setLoading] = useState(true);
  const [showNewDestinationForm, setShowNewDestinationForm] = useState(false);
  const [newDestination, setNewDestination] = useState<Partial<WithdrawalDestination>>({
    method_type: 'crypto',
    name: '',
    details: {}
  });

  // Development mode saved destinations
  const DEV_SAVED_DESTINATIONS: WithdrawalDestination[] = [
    {
      id: "1",
      user_id: "dev-user-id",
      method_type: "crypto",
      name: "My Bitcoin Wallet",
      details: {
        address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
        network: "Bitcoin"
      },
      is_default: true
    },
    {
      id: "2",
      user_id: "dev-user-id",
      method_type: "bank",
      name: "My Bank Account",
      details: {
        bank_name: "Chase Bank",
        account_number: "****4567",
        routing_number: "****8901",
        account_holder: "John Doe",
        country: "United States"
      }
    },
    {
      id: "3",
      user_id: "dev-user-id",
      method_type: "digital_wallet",
      name: "My PayPal",
      details: {
        email: "user@example.com",
        service_provider: "PayPal"
      }
    }
  ];

  function getDefaultTab() {
    if (lastDepositMethod === 'card') return 'bank';
    if (lastDepositMethod === 'bitcoin' || lastDepositMethod === 'ethereum' || lastDepositMethod === 'usdt') return 'crypto';
    return 'crypto'; // Default
  }

  useEffect(() => {
    // In development mode, use our dummy data
    setSavedDestinations(DEV_SAVED_DESTINATIONS);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    // Select the first destination of the active tab type by default
    const defaultDestination = savedDestinations.find(d => d.method_type === activeTab && d.is_default);
    
    if (defaultDestination) {
      onSelect(defaultDestination);
    } else {
      const firstOfType = savedDestinations.find(d => d.method_type === activeTab);
      if (firstOfType) {
        onSelect(firstOfType);
      }
    }
  }, [savedDestinations, activeTab, onSelect]);

  const handleTabChange = (value: string) => {
    setActiveTab(value as 'crypto' | 'bank' | 'digital_wallet');
    setShowNewDestinationForm(false);
    
    // Reset the new destination form when switching tabs
    setNewDestination({
      method_type: value as 'crypto' | 'bank' | 'digital_wallet',
      name: '',
      details: {}
    });
    
    // Select the first destination of the new tab type
    const destination = savedDestinations.find(d => d.method_type === value);
    if (destination) {
      onSelect(destination);
    }
  };

  const handleSelectDestination = (destination: WithdrawalDestination) => {
    onSelect(destination);
  };

  const handleNewDestinationChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setNewDestination({
        ...newDestination,
        [parent]: {
          ...newDestination[parent as keyof typeof newDestination] as Record<string, string>,
          [child]: value
        }
      });
    } else {
      setNewDestination({
        ...newDestination,
        [field]: value
      });
    }
  };

  const handleAddDestination = async () => {
    if (!newDestination.name) return;
    
    const destination: WithdrawalDestination = {
      user_id: user?.id || "dev-user-id",
      method_type: newDestination.method_type as 'crypto' | 'bank' | 'digital_wallet',
      name: newDestination.name,
      details: newDestination.details || {}
    };

    // In development mode, just add to the state
    const newId = `dev-${Date.now()}`;
    const newDest = { ...destination, id: newId };
    setSavedDestinations([newDest, ...savedDestinations]);
    onSelect(newDest);

    setShowNewDestinationForm(false);
    setNewDestination({
      method_type: activeTab as 'crypto' | 'bank' | 'digital_wallet',
      name: '',
      details: {}
    });
  };

  // Filter destinations by the selected tab
  const filteredDestinations = savedDestinations.filter(
    destination => destination.method_type === activeTab
  );

  return (
    <Card className="bg-unicorn-darkPurple/50 border-unicorn-gold/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-white text-lg">Select Withdrawal Method</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <WithdrawalMethodTabs 
            activeTab={activeTab}
            onTabChange={handleTabChange}
            lastDepositMethod={lastDepositMethod}
          />

          <div className="space-y-4">
            {showNewDestinationForm ? (
              <NewDestinationForm
                methodType={activeTab as 'crypto' | 'bank' | 'digital_wallet'}
                values={{
                  ...newDestination,
                  method_type: activeTab as 'crypto' | 'bank' | 'digital_wallet'
                } as any}
                onChange={handleNewDestinationChange}
                onAdd={handleAddDestination}
                onCancel={() => setShowNewDestinationForm(false)}
              />
            ) : (
              <>
                {loading ? (
                  <div className="animate-pulse space-y-2">
                    <div className="h-12 bg-unicorn-purple/20 rounded"></div>
                    <div className="h-12 bg-unicorn-purple/20 rounded"></div>
                  </div>
                ) : filteredDestinations.length > 0 ? (
                  <div className="space-y-2">
                    {filteredDestinations.map((destination) => (
                      <WithdrawalDestinationItem
                        key={destination.id}
                        destination={destination}
                        onClick={() => handleSelectDestination(destination)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-400">
                    No saved {activeTab === 'crypto' ? 'crypto wallets' : activeTab === 'bank' ? 'bank accounts' : 'digital wallets'}.
                  </div>
                )}
                
                <Button 
                  variant="outline" 
                  onClick={() => setShowNewDestinationForm(true)}
                  className="w-full mt-2 border-dashed border-unicorn-gold/30 text-unicorn-gold hover:bg-unicorn-gold/10"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add New {activeTab === 'crypto' ? 'Crypto Wallet' : activeTab === 'bank' ? 'Bank Account' : 'Digital Wallet'}
                </Button>
              </>
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WithdrawalMethodSelect;
