
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle, CreditCard, Bitcoin, DollarSign, Key, Shield, Globe, Wallet } from "lucide-react";
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
            
            {/* Flutterwave - New Card */}
            <Card className="bg-unicorn-darkPurple/60 border-unicorn-gold/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-unicorn-gold" />
                  Flutterwave
                </CardTitle>
                <CardDescription>Connect Flutterwave to accept payments across Africa.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleSaveKeys('flutterwave', {
                    publicKey: formData.get('flutterwavePublicKey'),
                    secretKey: formData.get('flutterwaveSecretKey'),
                    encryptionKey: formData.get('flutterwaveEncryptionKey'),
                  });
                }}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="flutterwavePublicKey">Public Key</Label>
                      <Input
                        id="flutterwavePublicKey"
                        name="flutterwavePublicKey"
                        placeholder="FLWPUBK-..."
                        className="bg-unicorn-darkPurple/30 border-unicorn-gold/20"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="flutterwaveSecretKey">Secret Key</Label>
                      <Input
                        id="flutterwaveSecretKey"
                        name="flutterwaveSecretKey"
                        type="password"
                        placeholder="FLWSECK-..."
                        className="bg-unicorn-darkPurple/30 border-unicorn-gold/20"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="flutterwaveEncryptionKey">Encryption Key</Label>
                      <Input
                        id="flutterwaveEncryptionKey"
                        name="flutterwaveEncryptionKey"
                        type="password"
                        placeholder="Encryption Key"
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
                          <>Save Flutterwave Keys</>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            {/* Selar.co - New Card */}
            <Card className="bg-unicorn-darkPurple/60 border-unicorn-gold/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-unicorn-gold" />
                  Selar.co
                </CardTitle>
                <CardDescription>Connect Selar.co to sell and accept payments.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleSaveKeys('selar', {
                    apiKey: formData.get('selarApiKey'),
                    merchantId: formData.get('selarMerchantId'),
                  });
                }}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="selarApiKey">API Key</Label>
                      <Input
                        id="selarApiKey"
                        name="selarApiKey"
                        type="password"
                        placeholder="Selar API Key"
                        className="bg-unicorn-darkPurple/30 border-unicorn-gold/20"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="selarMerchantId">Merchant ID</Label>
                      <Input
                        id="selarMerchantId"
                        name="selarMerchantId"
                        placeholder="Merchant ID"
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
                          <>Save Selar Keys</>
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
            
            {/* CoinPayments - New Card */}
            <Card className="bg-unicorn-darkPurple/60 border-unicorn-gold/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bitcoin className="h-5 w-5 text-unicorn-gold" />
                  CoinPayments
                </CardTitle>
                <CardDescription>Accept multiple cryptocurrencies through CoinPayments.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleSaveKeys('coinpayments', {
                    publicKey: formData.get('coinpaymentsPublicKey'),
                    privateKey: formData.get('coinpaymentsPrivateKey'),
                    merchantId: formData.get('coinpaymentsMerchantId'),
                  });
                }}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="coinpaymentsPublicKey">Public Key</Label>
                      <Input
                        id="coinpaymentsPublicKey"
                        name="coinpaymentsPublicKey"
                        placeholder="CoinPayments Public Key"
                        className="bg-unicorn-darkPurple/30 border-unicorn-gold/20"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="coinpaymentsPrivateKey">Private Key</Label>
                      <Input
                        id="coinpaymentsPrivateKey"
                        name="coinpaymentsPrivateKey"
                        type="password"
                        placeholder="CoinPayments Private Key"
                        className="bg-unicorn-darkPurple/30 border-unicorn-gold/20"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="coinpaymentsMerchantId">Merchant ID</Label>
                      <Input
                        id="coinpaymentsMerchantId"
                        name="coinpaymentsMerchantId"
                        placeholder="CoinPayments Merchant ID"
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
                          <>Save CoinPayments Keys</>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="bg-unicorn-darkPurple/60 border-unicorn-gold/30 md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-unicorn-gold" />
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
                    usdtTrc20: formData.get('usdtTrc20Address'),
                    usdtBep20: formData.get('usdtBep20Address'),
                    usdtErc20: formData.get('usdtErc20Address'),
                    moneroAddress: formData.get('moneroAddress'),
                  });
                }}>
                  <div className="grid gap-6 md:grid-cols-2">
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
                    <div className="grid gap-2">
                      <Label htmlFor="usdtTrc20Address">USDT TRC20 Address</Label>
                      <Input
                        id="usdtTrc20Address"
                        name="usdtTrc20Address"
                        placeholder="USDT TRC20 Address"
                        className="bg-unicorn-darkPurple/30 border-unicorn-gold/20"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="usdtBep20Address">USDT BEP20 Address</Label>
                      <Input
                        id="usdtBep20Address"
                        name="usdtBep20Address"
                        placeholder="USDT BEP20 Address"
                        className="bg-unicorn-darkPurple/30 border-unicorn-gold/20"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="usdtErc20Address">USDT ERC20 Address</Label>
                      <Input
                        id="usdtErc20Address"
                        name="usdtErc20Address"
                        placeholder="USDT ERC20 Address"
                        className="bg-unicorn-darkPurple/30 border-unicorn-gold/20"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="moneroAddress">Monero (XMR) Address</Label>
                      <Input
                        id="moneroAddress"
                        name="moneroAddress"
                        placeholder="Monero Address"
                        className="bg-unicorn-darkPurple/30 border-unicorn-gold/20"
                      />
                    </div>
                    <div className="md:col-span-2 flex justify-end">
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
