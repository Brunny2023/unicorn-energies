
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CryptoWalletFormProps {
  values: {
    name: string;
    details: {
      network?: string;
      address?: string;
    };
  };
  onChange: (field: string, value: string) => void;
}

const CryptoWalletForm: React.FC<CryptoWalletFormProps> = ({ values, onChange }) => {
  return (
    <>
      <div className="mb-4">
        <Label htmlFor="wallet-name" className="text-white">Wallet Name</Label>
        <Input 
          id="wallet-name"
          placeholder="My Crypto Wallet"
          value={values.name || ''}
          onChange={(e) => onChange('name', e.target.value)}
          className="bg-unicorn-darkPurple/50 text-white border-unicorn-gold/30"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="crypto-network" className="text-white">Cryptocurrency</Label>
        <Select 
          value={values.details?.network || 'Bitcoin'}
          onValueChange={(value) => onChange('details.network', value)}
        >
          <SelectTrigger className="bg-unicorn-darkPurple/50 text-white border-unicorn-gold/30">
            <SelectValue placeholder="Select cryptocurrency" />
          </SelectTrigger>
          <SelectContent className="bg-unicorn-darkPurple border-unicorn-gold/30">
            <SelectItem value="Bitcoin">Bitcoin (BTC)</SelectItem>
            <SelectItem value="Ethereum">Ethereum (ETH)</SelectItem>
            <SelectItem value="USDT">Tether (USDT)</SelectItem>
            <SelectItem value="USDC">USD Coin (USDC)</SelectItem>
            <SelectItem value="BNB">Binance Coin (BNB)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4">
        <Label htmlFor="wallet-address" className="text-white">Wallet Address</Label>
        <Input 
          id="wallet-address"
          placeholder="Enter your crypto wallet address"
          value={values.details?.address || ''}
          onChange={(e) => onChange('details.address', e.target.value)}
          className="bg-unicorn-darkPurple/50 text-white border-unicorn-gold/30"
        />
      </div>
    </>
  );
};

export default CryptoWalletForm;
