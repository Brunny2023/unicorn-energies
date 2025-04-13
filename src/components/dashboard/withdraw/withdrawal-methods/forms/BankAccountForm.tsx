
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface BankAccountFormProps {
  values: {
    name: string;
    details: {
      bank_name?: string;
      account_holder?: string;
      account_number?: string;
      routing_number?: string;
      country?: string;
    };
  };
  onChange: (field: string, value: string) => void;
}

const BankAccountForm: React.FC<BankAccountFormProps> = ({ values, onChange }) => {
  return (
    <>
      <div className="mb-4">
        <Label htmlFor="bank-account-name" className="text-white">Account Name</Label>
        <Input 
          id="bank-account-name"
          placeholder="My Bank Account"
          value={values.name || ''}
          onChange={(e) => onChange('name', e.target.value)}
          className="bg-unicorn-darkPurple/50 text-white border-unicorn-gold/30"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="bank-name" className="text-white">Bank Name</Label>
        <Input 
          id="bank-name"
          placeholder="Enter your bank name"
          value={values.details?.bank_name || ''}
          onChange={(e) => onChange('details.bank_name', e.target.value)}
          className="bg-unicorn-darkPurple/50 text-white border-unicorn-gold/30"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="account-holder" className="text-white">Account Holder Name</Label>
        <Input 
          id="account-holder"
          placeholder="Enter account holder name"
          value={values.details?.account_holder || ''}
          onChange={(e) => onChange('details.account_holder', e.target.value)}
          className="bg-unicorn-darkPurple/50 text-white border-unicorn-gold/30"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="account-number" className="text-white">Account Number</Label>
        <Input 
          id="account-number"
          placeholder="Enter your account number"
          value={values.details?.account_number || ''}
          onChange={(e) => onChange('details.account_number', e.target.value)}
          className="bg-unicorn-darkPurple/50 text-white border-unicorn-gold/30"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="routing-number" className="text-white">Routing Number</Label>
        <Input 
          id="routing-number"
          placeholder="Enter your routing number"
          value={values.details?.routing_number || ''}
          onChange={(e) => onChange('details.routing_number', e.target.value)}
          className="bg-unicorn-darkPurple/50 text-white border-unicorn-gold/30"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="bank-country" className="text-white">Country</Label>
        <Input 
          id="bank-country"
          placeholder="Enter country"
          value={values.details?.country || ''}
          onChange={(e) => onChange('details.country', e.target.value)}
          className="bg-unicorn-darkPurple/50 text-white border-unicorn-gold/30"
        />
      </div>
    </>
  );
};

export default BankAccountForm;
