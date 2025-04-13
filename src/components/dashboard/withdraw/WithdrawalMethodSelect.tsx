
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, CreditCard, BitcoinIcon, WalletCards } from "lucide-react";
import { WithdrawalDestination } from "@/types/investment";
import { supabase } from "@/integrations/supabase/client";

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
        routing_number: "****8901"
      }
    },
    {
      id: "3",
      user_id: "dev-user-id",
      method_type: "digital_wallet",
      name: "My PayPal",
      details: {
        email: "user@example.com"
      }
    }
  ];

  function getDefaultTab() {
    if (lastDepositMethod === 'card') return 'bank';
    if (lastDepositMethod === 'bitcoin' || lastDepositMethod === 'ethereum' || lastDepositMethod === 'usdt') return 'crypto';
    return 'crypto'; // Default
  }

  useEffect(() => {
    if (!user?.id) {
      setSavedDestinations(DEV_SAVED_DESTINATIONS);
      setLoading(false);
      return;
    }

    const fetchDestinations = async () => {
      try {
        const { data, error } = await supabase
          .from('withdrawal_destinations')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setSavedDestinations(data || []);
      } catch (error) {
        console.error("Error fetching withdrawal destinations:", error);
        // Fallback to dev data
        setSavedDestinations(DEV_SAVED_DESTINATIONS);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
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
  }, [savedDestinations, activeTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value as 'crypto' | 'bank' | 'digital_wallet');
    setShowNewDestinationForm(false);
    
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

    // In a real app, we would save to the database here
    if (user?.id) {
      // Save to Supabase
      try {
        const { data, error } = await supabase
          .from('withdrawal_destinations')
          .insert([destination])
          .select()
          .single();

        if (error) throw error;
        
        setSavedDestinations([data, ...savedDestinations]);
        onSelect(data);
      } catch (error) {
        console.error("Error saving withdrawal destination:", error);
        // Fallback for development
        const newId = `dev-${Date.now()}`;
        const newDest = { ...destination, id: newId };
        setSavedDestinations([newDest, ...savedDestinations]);
        onSelect(newDest);
      }
    } else {
      // Development mode
      const newId = `dev-${Date.now()}`;
      const newDest = { ...destination, id: newId };
      setSavedDestinations([newDest, ...savedDestinations]);
      onSelect(newDest);
    }

    setShowNewDestinationForm(false);
    setNewDestination({
      method_type: activeTab as 'crypto' | 'bank' | 'digital_wallet',
      name: '',
      details: {}
    });
  };

  // Render different form fields based on the method type
  const renderNewDestinationFields = () => {
    switch (newDestination.method_type) {
      case 'crypto':
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="wallet-name" className="text-white">Wallet Name</Label>
              <Input 
                id="wallet-name"
                placeholder="My Bitcoin Wallet"
                value={newDestination.name || ''}
                onChange={(e) => handleNewDestinationChange('name', e.target.value)}
                className="bg-unicorn-darkPurple/50 text-white border-unicorn-gold/30"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="wallet-address" className="text-white">Wallet Address</Label>
              <Input 
                id="wallet-address"
                placeholder="Enter your crypto wallet address"
                value={newDestination.details?.address || ''}
                onChange={(e) => handleNewDestinationChange('details.address', e.target.value)}
                className="bg-unicorn-darkPurple/50 text-white border-unicorn-gold/30"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="wallet-network" className="text-white">Network</Label>
              <Input 
                id="wallet-network"
                placeholder="Bitcoin, Ethereum, etc."
                value={newDestination.details?.network || ''}
                onChange={(e) => handleNewDestinationChange('details.network', e.target.value)}
                className="bg-unicorn-darkPurple/50 text-white border-unicorn-gold/30"
              />
            </div>
          </>
        );
      case 'bank':
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="bank-name" className="text-white">Account Name</Label>
              <Input 
                id="bank-name"
                placeholder="My Bank Account"
                value={newDestination.name || ''}
                onChange={(e) => handleNewDestinationChange('name', e.target.value)}
                className="bg-unicorn-darkPurple/50 text-white border-unicorn-gold/30"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="bank-institution" className="text-white">Bank Name</Label>
              <Input 
                id="bank-institution"
                placeholder="Enter your bank name"
                value={newDestination.details?.bank_name || ''}
                onChange={(e) => handleNewDestinationChange('details.bank_name', e.target.value)}
                className="bg-unicorn-darkPurple/50 text-white border-unicorn-gold/30"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="account-number" className="text-white">Account Number</Label>
              <Input 
                id="account-number"
                placeholder="Enter your account number"
                value={newDestination.details?.account_number || ''}
                onChange={(e) => handleNewDestinationChange('details.account_number', e.target.value)}
                className="bg-unicorn-darkPurple/50 text-white border-unicorn-gold/30"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="routing-number" className="text-white">Routing Number</Label>
              <Input 
                id="routing-number"
                placeholder="Enter your routing number"
                value={newDestination.details?.routing_number || ''}
                onChange={(e) => handleNewDestinationChange('details.routing_number', e.target.value)}
                className="bg-unicorn-darkPurple/50 text-white border-unicorn-gold/30"
              />
            </div>
          </>
        );
      case 'digital_wallet':
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="wallet-name" className="text-white">Digital Wallet Name</Label>
              <Input 
                id="wallet-name"
                placeholder="My PayPal"
                value={newDestination.name || ''}
                onChange={(e) => handleNewDestinationChange('name', e.target.value)}
                className="bg-unicorn-darkPurple/50 text-white border-unicorn-gold/30"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="wallet-email" className="text-white">Email or Username</Label>
              <Input 
                id="wallet-email"
                placeholder="Enter your email or username"
                value={newDestination.details?.email || ''}
                onChange={(e) => handleNewDestinationChange('details.email', e.target.value)}
                className="bg-unicorn-darkPurple/50 text-white border-unicorn-gold/30"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const getMethodIcon = (method: 'crypto' | 'bank' | 'digital_wallet') => {
    switch (method) {
      case 'crypto':
        return <BitcoinIcon className="h-5 w-5" />;
      case 'bank':
        return <CreditCard className="h-5 w-5" />;
      case 'digital_wallet':
        return <WalletCards className="h-5 w-5" />;
      default:
        return null;
    }
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
          <TabsList className="grid grid-cols-3 mb-4 bg-unicorn-darkPurple/70">
            <TabsTrigger value="crypto" className="data-[state=active]:bg-unicorn-gold/20 data-[state=active]:text-unicorn-gold">
              <BitcoinIcon className="h-4 w-4 mr-2" /> Crypto
            </TabsTrigger>
            <TabsTrigger value="bank" className="data-[state=active]:bg-unicorn-gold/20 data-[state=active]:text-unicorn-gold">
              <CreditCard className="h-4 w-4 mr-2" /> Bank
            </TabsTrigger>
            <TabsTrigger value="digital_wallet" className="data-[state=active]:bg-unicorn-gold/20 data-[state=active]:text-unicorn-gold">
              <WalletCards className="h-4 w-4 mr-2" /> Digital Wallet
            </TabsTrigger>
          </TabsList>

          {lastDepositMethod && (
            <div className="bg-amber-500/10 text-amber-400 p-2 mb-4 rounded text-sm flex items-center">
              <span className="mr-1">⚠</span> You can only withdraw using the same method you deposited with ({lastDepositMethod}).
            </div>
          )}

          <div className="space-y-4">
            {showNewDestinationForm ? (
              <div className="bg-unicorn-purple/10 p-4 rounded-md border border-unicorn-purple/30">
                <h4 className="text-white font-medium mb-3">Add New {activeTab === 'crypto' ? 'Crypto Wallet' : activeTab === 'bank' ? 'Bank Account' : 'Digital Wallet'}</h4>
                
                {renderNewDestinationFields()}
                
                <div className="flex space-x-2">
                  <Button 
                    onClick={handleAddDestination}
                    className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black"
                    disabled={!newDestination.name}
                  >
                    Add
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowNewDestinationForm(false)}
                    className="border-unicorn-gold/30 text-unicorn-gold hover:bg-unicorn-gold/10"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
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
                      <div
                        key={destination.id}
                        onClick={() => handleSelectDestination(destination)}
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
                                `${destination.details.email || 'Email/Username'}`
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
