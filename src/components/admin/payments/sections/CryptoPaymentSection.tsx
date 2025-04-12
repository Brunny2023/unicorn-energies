
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Bitcoin, Wallet } from "lucide-react";
import PaymentConnectionCard from "../PaymentConnectionCard";

interface CryptoPaymentSectionProps {
  handleSaveKeys: (paymentType: string, formData: any) => void;
  saveStatus: {status: 'idle' | 'saving' | 'success' | 'error', message?: string};
}

const CryptoPaymentSection: React.FC<CryptoPaymentSectionProps> = ({ handleSaveKeys, saveStatus }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <PaymentConnectionCard
        title="Coinbase Commerce"
        description="Accept cryptocurrency payments via Coinbase Commerce."
        icon={<Bitcoin className="h-5 w-5 text-unicorn-gold" />}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleSaveKeys('coinbase', {
            apiKey: formData.get('coinbaseApiKey'),
            webhookSecret: formData.get('coinbaseWebhookSecret'),
          });
        }}
        isLoading={saveStatus.status === 'saving'}
        buttonText="Save Coinbase Keys"
      >
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
      </PaymentConnectionCard>
      
      {/* CoinPayments */}
      <PaymentConnectionCard
        title="CoinPayments"
        description="Accept multiple cryptocurrencies through CoinPayments."
        icon={<Bitcoin className="h-5 w-5 text-unicorn-gold" />}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleSaveKeys('coinpayments', {
            publicKey: formData.get('coinpaymentsPublicKey'),
            privateKey: formData.get('coinpaymentsPrivateKey'),
            merchantId: formData.get('coinpaymentsMerchantId'),
          });
        }}
        isLoading={saveStatus.status === 'saving'}
        buttonText="Save CoinPayments Keys"
      >
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
      </PaymentConnectionCard>

      <PaymentConnectionCard
        title="Custom Wallet Addresses"
        description="Configure your own crypto wallet addresses to receive payments directly."
        icon={<Wallet className="h-5 w-5 text-unicorn-gold" />}
        onSubmit={(e) => {
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
        }}
        isLoading={saveStatus.status === 'saving'}
        buttonText="Save Wallet Addresses"
        fullWidth
      >
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
        </div>
      </PaymentConnectionCard>
    </div>
  );
};

export default CryptoPaymentSection;
