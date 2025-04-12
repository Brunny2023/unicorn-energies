
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, DollarSign, Globe } from "lucide-react";
import PaymentConnectionCard from "../PaymentConnectionCard";

interface FiatPaymentSectionProps {
  handleSaveKeys: (paymentType: string, formData: any) => void;
  saveStatus: {status: 'idle' | 'saving' | 'success' | 'error', message?: string};
}

const FiatPaymentSection: React.FC<FiatPaymentSectionProps> = ({ handleSaveKeys, saveStatus }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <PaymentConnectionCard
        title="Stripe"
        description="Connect your Stripe account to accept credit card payments."
        icon={<CreditCard className="h-5 w-5 text-unicorn-gold" />}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleSaveKeys('stripe', {
            publishableKey: formData.get('stripePublishableKey'),
            secretKey: formData.get('stripeSecretKey'),
          });
        }}
        isLoading={saveStatus.status === 'saving'}
        buttonText="Save Stripe Keys"
      >
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
      </PaymentConnectionCard>

      <PaymentConnectionCard
        title="PayPal"
        description="Connect PayPal to accept payments via PayPal accounts."
        icon={<DollarSign className="h-5 w-5 text-unicorn-gold" />}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleSaveKeys('paypal', {
            clientId: formData.get('paypalClientId'),
            clientSecret: formData.get('paypalClientSecret'),
          });
        }}
        isLoading={saveStatus.status === 'saving'}
        buttonText="Save PayPal Keys"
      >
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
      </PaymentConnectionCard>
      
      {/* Flutterwave */}
      <PaymentConnectionCard
        title="Flutterwave"
        description="Connect Flutterwave to accept payments across Africa."
        icon={<Globe className="h-5 w-5 text-unicorn-gold" />}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleSaveKeys('flutterwave', {
            publicKey: formData.get('flutterwavePublicKey'),
            secretKey: formData.get('flutterwaveSecretKey'),
            encryptionKey: formData.get('flutterwaveEncryptionKey'),
          });
        }}
        isLoading={saveStatus.status === 'saving'}
        buttonText="Save Flutterwave Keys"
      >
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
      </PaymentConnectionCard>
      
      {/* Selar.co */}
      <PaymentConnectionCard
        title="Selar.co"
        description="Connect Selar.co to sell and accept payments."
        icon={<Globe className="h-5 w-5 text-unicorn-gold" />}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleSaveKeys('selar', {
            apiKey: formData.get('selarApiKey'),
            merchantId: formData.get('selarMerchantId'),
          });
        }}
        isLoading={saveStatus.status === 'saving'}
        buttonText="Save Selar Keys"
      >
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
      </PaymentConnectionCard>
    </div>
  );
};

export default FiatPaymentSection;
