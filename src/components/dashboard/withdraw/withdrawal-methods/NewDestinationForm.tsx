
import React from 'react';
import { Button } from "@/components/ui/button";
import CryptoWalletForm from './forms/CryptoWalletForm';
import BankAccountForm from './forms/BankAccountForm';
import DigitalWalletForm from './forms/DigitalWalletForm';

interface NewDestinationFormProps {
  methodType: 'crypto' | 'bank' | 'digital_wallet';
  values: {
    name: string;
    details: Record<string, string>;
    method_type: 'crypto' | 'bank' | 'digital_wallet';
  };
  onChange: (field: string, value: string) => void;
  onAdd: () => void;
  onCancel: () => void;
}

const NewDestinationForm: React.FC<NewDestinationFormProps> = ({
  methodType,
  values,
  onChange,
  onAdd,
  onCancel
}) => {
  const renderFormFields = () => {
    switch (methodType) {
      case 'crypto':
        return <CryptoWalletForm values={values} onChange={onChange} />;
      case 'bank':
        return <BankAccountForm values={values} onChange={onChange} />;
      case 'digital_wallet':
        return <DigitalWalletForm values={values} onChange={onChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-unicorn-purple/10 p-4 rounded-md border border-unicorn-purple/30">
      <h4 className="text-white font-medium mb-3">
        Add New {methodType === 'crypto' ? 'Crypto Wallet' : methodType === 'bank' ? 'Bank Account' : 'Digital Wallet'}
      </h4>
      
      {renderFormFields()}
      
      <div className="flex space-x-2">
        <Button 
          onClick={onAdd}
          className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black"
          disabled={!values.name}
        >
          Add
        </Button>
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="border-unicorn-gold/30 text-unicorn-gold hover:bg-unicorn-gold/10"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default NewDestinationForm;
