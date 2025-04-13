
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DigitalWalletFormProps {
  values: {
    name: string;
    details: {
      service_provider?: string;
      email?: string;
    };
  };
  onChange: (field: string, value: string) => void;
}

const DigitalWalletForm: React.FC<DigitalWalletFormProps> = ({ values, onChange }) => {
  return (
    <>
      <div className="mb-4">
        <Label htmlFor="wallet-name" className="text-white">Digital Wallet Name</Label>
        <Input 
          id="wallet-name"
          placeholder="My Digital Wallet"
          value={values.name || ''}
          onChange={(e) => onChange('name', e.target.value)}
          className="bg-unicorn-darkPurple/50 text-white border-unicorn-gold/30"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="wallet-provider" className="text-white">Service Provider</Label>
        <Select 
          value={values.details?.service_provider || ''}
          onValueChange={(value) => onChange('details.service_provider', value)}
        >
          <SelectTrigger className="bg-unicorn-darkPurple/50 text-white border-unicorn-gold/30">
            <SelectValue placeholder="Select provider" />
          </SelectTrigger>
          <SelectContent className="bg-unicorn-darkPurple border-unicorn-gold/30">
            <SelectItem value="PayPal">PayPal</SelectItem>
            <SelectItem value="Venmo">Venmo</SelectItem>
            <SelectItem value="Cash App">Cash App</SelectItem>
            <SelectItem value="Skrill">Skrill</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4">
        <Label htmlFor="wallet-email" className="text-white">Email or Username</Label>
        <Input 
          id="wallet-email"
          placeholder="Enter your email or username"
          value={values.details?.email || ''}
          onChange={(e) => onChange('details.email', e.target.value)}
          className="bg-unicorn-darkPurple/50 text-white border-unicorn-gold/30"
        />
      </div>
    </>
  );
};

export default DigitalWalletForm;
