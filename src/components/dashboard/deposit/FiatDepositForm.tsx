import React, { useState } from "react";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CreditCard, DollarSign, CheckCircle2 } from "lucide-react";
import { depositFunds } from "@/utils/wallet";
import { useToast } from "@/hooks/use-toast";

interface FiatDepositFormProps {
  onSuccessfulDeposit: (depositData: any) => void;
  userId: string;
}

const FiatDepositForm: React.FC<FiatDepositFormProps> = ({
  onSuccessfulDeposit,
  userId
}) => {
  const { toast } = useToast();
  const [amount, setAmount] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [cardBrand, setCardBrand] = useState<string>("");
  const [referenceId, setReferenceId] = useState<string>("");

  const DEVELOPMENT_MODE = true;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setAmount(value);
  };

  const formatCardNumber = (value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    const chunks = [];
    
    for (let i = 0; i < cleanValue.length; i += 4) {
      chunks.push(cleanValue.slice(i, i + 4));
    }
    
    return chunks.join(" ");
  };

  const detectCardBrand = (cardNumber: string) => {
    const cleanNumber = cardNumber.replace(/\D/g, "");
    
    if (cleanNumber.startsWith('4')) {
      setCardBrand('visa');
    } else if (/^5[1-5]/.test(cleanNumber)) {
      setCardBrand('mastercard');
    } else if (/^3[47]/.test(cleanNumber)) {
      setCardBrand('amex');
    } else if (/^6(?:011|5)/.test(cleanNumber)) {
      setCardBrand('discover');
    } else {
      setCardBrand('');
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    if (formattedValue.length <= 19) {
      setCardNumber(formattedValue);
      detectCardBrand(formattedValue);
    }
  };

  const formatExpiryDate = (value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    if (cleanValue.length > 2) {
      return `${cleanValue.slice(0, 2)}/${cleanValue.slice(2, 4)}`;
    }
    return cleanValue;
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiryDate(e.target.value);
    if (formattedValue.length <= 5) {
      setExpiryDate(formattedValue);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  const validateForm = () => {
    if (!amount || parseFloat(amount) < 100) {
      toast({
        title: "Invalid Amount",
        description: "Please enter an amount of at least $100",
        variant: "destructive",
      });
      return false;
    }
    
    if (!cardName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter the name on your card",
        variant: "destructive",
      });
      return false;
    }
    
    if (cardNumber.replace(/\s/g, "").length !== 16) {
      toast({
        title: "Invalid Card Number",
        description: "Please enter a valid 16-digit card number",
        variant: "destructive",
      });
      return false;
    }
    
    if (expiryDate.length !== 5) {
      toast({
        title: "Invalid Expiry Date",
        description: "Please enter a valid expiry date (MM/YY)",
        variant: "destructive",
      });
      return false;
    }
    
    if (cvv.length !== 3) {
      toast({
        title: "Invalid CVV",
        description: "Please enter a valid 3-digit CVV code",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      if (DEVELOPMENT_MODE) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const depositAmount = parseFloat(amount);
        
        const paymentRef = referenceId || `PAY-${Date.now().toString().substring(7)}`;
        
        const result = await depositFunds(
          userId, 
          depositAmount, 
          "card", 
          paymentRef
        );
        
        if (result) {
          setSuccess(true);
          
          onSuccessfulDeposit({
            amount: depositAmount,
            method: "card",
            cardLast4: cardNumber.slice(-4),
            cardBrand: cardBrand,
            referenceId: paymentRef,
            timestamp: new Date().toISOString()
          });
          
          setTimeout(() => {
            setAmount("");
            setCardName("");
            setCardNumber("");
            setExpiryDate("");
            setCvv("");
            setReferenceId("");
            setSuccess(false);
          }, 3000);
        } else {
          throw new Error("Failed to process deposit");
        }
      } else {
        const depositAmount = parseFloat(amount);
        const paymentRef = referenceId || `PAY-${Date.now().toString().substring(7)}`;
        
        const result = await depositFunds(
          userId, 
          depositAmount, 
          "card", 
          paymentRef
        );
        
        if (result) {
          setSuccess(true);
          
          onSuccessfulDeposit({
            amount: depositAmount,
            method: "card",
            cardLast4: cardNumber.slice(-4),
            cardBrand: cardBrand,
            referenceId: paymentRef,
            timestamp: new Date().toISOString()
          });
          
          setTimeout(() => {
            setAmount("");
            setCardName("");
            setCardNumber("");
            setExpiryDate("");
            setCvv("");
            setReferenceId("");
            setSuccess(false);
          }, 3000);
        } else {
          throw new Error("Failed to process deposit");
        }
      }
    } catch (error) {
      console.error("Error processing deposit:", error);
      toast({
        title: "Deposit Failed",
        description: "There was an error processing your deposit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[300px]">
        <div className="rounded-full bg-green-500/20 p-3 mb-4">
          <CheckCircle2 className="h-10 w-10 text-green-500" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Deposit Successful!</h3>
        <p className="text-gray-300 text-center mb-6">
          Your deposit of ${parseFloat(amount).toFixed(2)} is being processed.
        </p>
        <Button
          onClick={() => setSuccess(false)}
          className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black"
        >
          Make Another Deposit
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardHeader>
        <CardTitle className="text-white">Credit/Debit Card Deposit</CardTitle>
        <CardDescription className="text-gray-400">
          Securely deposit funds using your credit or debit card
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-white">Deposit Amount (USD)</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              id="amount"
              placeholder="Enter amount (minimum $100)"
              value={amount}
              onChange={handleAmountChange}
              className="pl-10 bg-unicorn-black/30 border-unicorn-gold/30 text-white"
              required
            />
          </div>
          <p className="text-xs text-gray-500">Minimum deposit: $100</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cardName" className="text-white">Name on Card</Label>
          <Input
            id="cardName"
            placeholder="John Doe"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            className="bg-unicorn-black/30 border-unicorn-gold/30 text-white"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cardNumber" className="text-white">Card Number</Label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={handleCardNumberChange}
              className="pl-10 bg-unicorn-black/30 border-unicorn-gold/30 text-white"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiryDate" className="text-white">Expiry Date</Label>
            <Input
              id="expiryDate"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              className="bg-unicorn-black/30 border-unicorn-gold/30 text-white"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cvv" className="text-white">CVV</Label>
            <Input
              id="cvv"
              placeholder="123"
              value={cvv}
              onChange={handleCvvChange}
              type="password"
              className="bg-unicorn-black/30 border-unicorn-gold/30 text-white"
              required
            />
          </div>
        </div>
        
        {!DEVELOPMENT_MODE && (
          <div className="space-y-2">
            <Label htmlFor="referenceId" className="text-white">Payment Reference (Optional)</Label>
            <Input
              id="referenceId"
              placeholder="Enter payment reference if available"
              value={referenceId}
              onChange={(e) => setReferenceId(e.target.value)}
              className="bg-unicorn-black/30 border-unicorn-gold/30 text-white"
            />
            <p className="text-xs text-gray-500">
              Reference ID helps track your payment if provided by your bank
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t border-unicorn-gold/20 pt-6">
        <p className="text-sm text-gray-400">
          Your payment details are secured with 256-bit encryption
        </p>
        <Button 
          type="submit" 
          className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-bold"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-unicorn-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            "Deposit Now"
          )}
        </Button>
      </CardFooter>
    </form>
  );
};

export default FiatDepositForm;
