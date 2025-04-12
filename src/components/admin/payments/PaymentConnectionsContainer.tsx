
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle, CreditCard, Bitcoin, DollarSign, Key, Shield } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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

      {saveStatus.status === 'success' && (
        <Alert className="bg-green-500/20 border-green-500 text-white">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{saveStatus.message}</AlertDescription>
        </Alert>
      )}

      {saveStatus.status === 'error' && (
        <Alert className="bg-red-500/20 border-red-500 text-white">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{saveStatus.message}</AlertDescription>
        </Alert>
      )}

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
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-unicorn-darkPurple/60 border-unicorn-gold/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-unicorn-gold" />
                  Stripe
                </CardTitle>
                <CardDescription>Connect your Stripe account to accept credit card payments.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleSaveKeys('stripe', {
                    publishableKey: formData.get('stripePublishableKey'),
                    secretKey: formData.get('stripeSecretKey'),
                  });
                }}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="stripePublishableKey">Publishable Key</Label>
                      <Input
                        id="stripePublishableKey"
                        name="stripePublishableKey"
                        placeholder="pk_test_..."
                        className="bg-unicorn-darkPurple/30 border-unicorn-gold/20"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="stripeSecretKey">Secret Key</Label>
                      <Input
                        id="stripeSecretKey"
                        name="stripeSecretKey"
                        type="password"
                        placeholder="sk_test_..."
                        className="bg-unicorn-darkPurple/30 border-unicorn-gold/20"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        type="submit" 
                        className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black"
                        disabled={saveStatus.status === 'saving'}
                      >
                        {saveStatus.status === 'saving' ? (
                          <>Saving...</>
                        ) : (
                          <>Save Stripe Keys</>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="bg-unicorn-darkPurple/60 border-unicorn-gold/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-unicorn-gold" />
                  PayPal
                </CardTitle>
                <CardDescription>Connect PayPal to accept payments via PayPal accounts.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleSaveKeys('paypal', {
                    clientId: formData.get('paypalClientId'),
                    clientSecret: formData.get('paypalClientSecret'),
                  });
                }}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="paypalClientId">Client ID</Label>
                      <Input
                        id="paypalClientId"
                        name="paypalClientId"
                        placeholder="Client ID"
                        className="bg-unicorn-darkPurple/30 border-unicorn-gold/20"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="paypalClientSecret">Client Secret</Label>
                      <Input
                        id="paypalClientSecret"
                        name="paypalClientSecret"
                        type="password"
                        placeholder="Client Secret"
                        className="bg-unicorn-darkPurple/30 border-unicorn-gold/20"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        type="submit" 
                        className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black"
                        disabled={saveStatus.status === 'saving'}
                      >
                        {saveStatus.status === 'saving' ? (
                          <>Saving...</>
                        ) : (
                          <>Save PayPal Keys</>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Crypto Payment Connections */}
        <TabsContent value="crypto">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-unicorn-darkPurple/60 border-unicorn-gold/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bitcoin className="h-5 w-5 text-unicorn-gold" />
                  Coinbase Commerce
                </CardTitle>
                <CardDescription>Accept cryptocurrency payments via Coinbase Commerce.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleSaveKeys('coinbase', {
                    apiKey: formData.get('coinbaseApiKey'),
                    webhookSecret: formData.get('coinbaseWebhookSecret'),
                  });
                }}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="coinbaseApiKey">API Key</Label>
                      <Input
                        id="coinbaseApiKey"
                        name="coinbaseApiKey"
                        placeholder="Coinbase API Key"
                        className="bg-unicorn-darkPurple/30 border-unicorn-gold/20"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="coinbaseWebhookSecret">Webhook Secret (optional)</Label>
                      <Input
                        id="coinbaseWebhookSecret"
                        name="coinbaseWebhookSecret"
                        type="password"
                        placeholder="Webhook Secret"
                        className="bg-unicorn-darkPurple/30 border-unicorn-gold/20"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        type="submit" 
                        className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black"
                        disabled={saveStatus.status === 'saving'}
                      >
                        {saveStatus.status === 'saving' ? (
                          <>Saving...</>
                        ) : (
                          <>Save Coinbase Keys</>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="bg-unicorn-darkPurple/60 border-unicorn-gold/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-unicorn-gold" />
                  Custom Wallet Addresses
                </CardTitle>
                <CardDescription>Configure your own crypto wallet addresses to receive payments directly.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleSaveKeys('wallets', {
                    btcAddress: formData.get('btcAddress'),
                    ethAddress: formData.get('ethAddress'),
                  });
                }}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="btcAddress">Bitcoin Address</Label>
                      <Input
                        id="btcAddress"
                        name="btcAddress"
                        placeholder="Bitcoin Address"
                        className="bg-unicorn-darkPurple/30 border-unicorn-gold/20"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="ethAddress">Ethereum Address</Label>
                      <Input
                        id="ethAddress"
                        name="ethAddress"
                        placeholder="Ethereum Address"
                        className="bg-unicorn-darkPurple/30 border-unicorn-gold/20"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        type="submit" 
                        className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black"
                        disabled={saveStatus.status === 'saving'}
                      >
                        {saveStatus.status === 'saving' ? (
                          <>Saving...</>
                        ) : (
                          <>Save Wallet Addresses</>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentConnectionsContainer;
