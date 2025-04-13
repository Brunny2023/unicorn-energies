
import React, { useState } from "react";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bitcoin, Copy, DollarSign, ExternalLink, CheckCircle2 } from "lucide-react";
import { depositFunds } from "@/utils/wallet";
import { useToast } from "@/hooks/use-toast";
import QRCodeDisplay from "./QRCodeDisplay";

interface CryptoDepositFormProps {
  onSuccessfulDeposit: (depositData: any) => void;
  userId: string;
}

interface CryptoCurrency {
  id: string;
  name: string;
  shortName: string;
  address: string;
  logo: React.ReactNode;
  network?: string;
  usdValue: number;
}

const CryptoDepositForm: React.FC<CryptoDepositFormProps> = ({
  onSuccessfulDeposit,
  userId
}) => {
  const { toast } = useToast();
  const [amount, setAmount] = useState<string>("");
  const [selectedCrypto, setSelectedCrypto] = useState<string>("bitcoin");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [cryptoAmount, setCryptoAmount] = useState<string>("0");
  
  // Simulated payment processor
  const DEVELOPMENT_MODE = true;
  
  // Available cryptocurrencies (in a real app, these would come from an API or database)
  const cryptocurrencies: CryptoCurrency[] = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      shortName: "BTC",
      address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      logo: <Bitcoin className="h-5 w-5" />,
      usdValue: 68750.42
    },
    {
      id: "ethereum",
      name: "Ethereum",
      shortName: "ETH",
      address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
      logo: <svg className="h-5 w-5" viewBox="0 0 784.37 1277.39" xmlns="http://www.w3.org/2000/svg">
              <path fill="#8A92B2" d="M392.07 0l-8.57 29.11v844.63l8.57 8.55 392.06-231.75z"/>
              <path fill="#62688F" d="M392.07 0L0 650.54l392.07 231.75V472.33z"/>
              <path fill="#62688F" d="M392.07 956.52l-4.83 5.89v300.87l4.83 14.1 392.3-552.49z"/>
              <path fill="#8A92B2" d="M392.07 1277.38V956.52L0 724.89z"/>
              <path fill="#454A75" d="M392.07 882.29l392.06-231.75-392.06-178.21z"/>
              <path fill="#8A92B2" d="M0 650.54l392.07 231.75V472.33z"/>
            </svg>,
      network: "ERC-20",
      usdValue: 3478.21
    },
    {
      id: "usdt",
      name: "Tether",
      shortName: "USDT",
      address: "TG9CMU8aJT1ksXAqNXtxgR9eJPHMShgVCN",
      logo: <svg className="h-5 w-5" viewBox="0 0 2000 2000" xmlns="http://www.w3.org/2000/svg">
              <path fill="#50AF95" d="M1000,0c552.26,0,1000,447.74,1000,1000S1552.25,2000,1000,2000,0,1552.25,0,1000,447.75,0,1000,0"/>
              <path fill="#FFFFFF" d="M1123.44,866.19c-16.81-8.76-35.55-11.63-53.68-13.77V827.99h139.27v-84.42H789.72v84.42h139.92v24.72c-17.86,2.14-35.97,5.01-53.41,13.77-40.92,20.67-55.32,61.87-55.32,112.56,0,59.15,15.49,106.64,103.17,111.67,20.67,1.34,41.34,2.01,62.54,2.01v157.92h136.01v-157.92c20.67,0,41.87-.67,62.01-2.01,87.94-5.03,103.43-52.12,103.43-111.67C1288.06,927.79,1173.09,891.23,1123.44,866.19Z"/>
              <path fill="#50AF95" d="M973.7,1024.76h54.11v-84.46H973.7Z"/>
            </svg>,
      network: "TRC-20",
      usdValue: 1.00
    },
  ];
  
  const selectedCryptoCurrency = cryptocurrencies.find(c => c.id === selectedCrypto) || cryptocurrencies[0];
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setAmount(value);
    
    // Calculate equivalent crypto amount
    if (value && selectedCryptoCurrency) {
      const usdAmount = parseFloat(value);
      const cryptoValue = usdAmount / selectedCryptoCurrency.usdValue;
      setCryptoAmount(cryptoValue.toFixed(8));
    } else {
      setCryptoAmount("0");
    }
  };
  
  const handleCryptoChange = (value: string) => {
    setSelectedCrypto(value);
    
    // Recalculate crypto amount when currency changes
    if (amount) {
      const selectedCrypto = cryptocurrencies.find(c => c.id === value);
      if (selectedCrypto) {
        const usdAmount = parseFloat(amount);
        const cryptoValue = usdAmount / selectedCrypto.usdValue;
        setCryptoAmount(cryptoValue.toFixed(8));
      }
    }
  };
  
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(selectedCryptoCurrency.address);
    toast({
      title: "Address Copied",
      description: "Cryptocurrency address copied to clipboard",
    });
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
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // In development mode, simulate a successful deposit
      if (DEVELOPMENT_MODE) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Process the deposit by updating the wallet balance
        const depositAmount = parseFloat(amount);
        
        // Use the depositFunds utility to update the balance
        const result = await depositFunds(userId, depositAmount);
        
        if (result) {
          setSuccess(true);
          
          // Pass deposit info to parent component
          onSuccessfulDeposit({
            amount: depositAmount,
            method: selectedCryptoCurrency.id,
            currency: selectedCryptoCurrency.shortName,
            cryptoAmount: parseFloat(cryptoAmount),
            timestamp: new Date().toISOString()
          });
          
          // Reset form after a delay
          setTimeout(() => {
            setAmount("");
            setCryptoAmount("0");
            setSuccess(false);
          }, 3000);
        } else {
          throw new Error("Failed to process deposit");
        }
      } else {
        // In production, you would integrate with a crypto payment processor here
        throw new Error("Crypto payment processing not implemented in production");
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
  
  // Dev mode allows automating the crypto deposit without actual transfer
  const handleManualConfirm = async () => {
    if (DEVELOPMENT_MODE && amount) {
      setLoading(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Process the deposit by updating the wallet balance
        const depositAmount = parseFloat(amount);
        
        // Use the depositFunds utility to update the balance
        const result = await depositFunds(userId, depositAmount);
        
        if (result) {
          setSuccess(true);
          
          // Pass deposit info to parent component
          onSuccessfulDeposit({
            amount: depositAmount,
            method: selectedCryptoCurrency.id,
            currency: selectedCryptoCurrency.shortName,
            cryptoAmount: parseFloat(cryptoAmount),
            timestamp: new Date().toISOString()
          });
          
          // Reset form after a delay
          setTimeout(() => {
            setAmount("");
            setCryptoAmount("0");
            setSuccess(false);
          }, 3000);
        } else {
          throw new Error("Failed to process deposit");
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
    }
  };
  
  if (success) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[300px]">
        <div className="rounded-full bg-green-500/20 p-3 mb-4">
          <CheckCircle2 className="h-10 w-10 text-green-500" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Deposit Confirmed!</h3>
        <p className="text-gray-300 text-center mb-6">
          Your deposit of ${parseFloat(amount).toFixed(2)} ({cryptoAmount} {selectedCryptoCurrency.shortName}) has been processed.
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
        <CardTitle className="text-white">Cryptocurrency Deposit</CardTitle>
        <CardDescription className="text-gray-400">
          Deposit funds using your preferred cryptocurrency
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="crypto" className="text-white">Select Cryptocurrency</Label>
            <Select value={selectedCrypto} onValueChange={handleCryptoChange}>
              <SelectTrigger className="bg-unicorn-black/30 border-unicorn-gold/30 text-white">
                <SelectValue placeholder="Select a cryptocurrency" />
              </SelectTrigger>
              <SelectContent className="bg-unicorn-darkPurple border-unicorn-gold/30">
                {cryptocurrencies.map((crypto) => (
                  <SelectItem key={crypto.id} value={crypto.id} className="text-white">
                    <div className="flex items-center">
                      {crypto.logo}
                      <span className="ml-2">{crypto.name} ({crypto.shortName})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
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
            <p className="text-xs text-gray-500">
              ≈ {cryptoAmount} {selectedCryptoCurrency.shortName}
            </p>
          </div>
        </div>
        
        <div className="bg-unicorn-black/50 rounded-lg p-4 border border-unicorn-gold/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              {selectedCryptoCurrency.logo}
              <span className="ml-2 text-white font-medium">
                {selectedCryptoCurrency.name} Address
              </span>
            </div>
            {selectedCryptoCurrency.network && (
              <span className="text-xs py-1 px-2 bg-unicorn-gold/20 text-unicorn-gold rounded">
                {selectedCryptoCurrency.network}
              </span>
            )}
          </div>
          
          <div className="flex items-center mb-4">
            <div className="flex-1 bg-unicorn-black/80 rounded p-2 border border-unicorn-gold/20 text-gray-300 text-sm font-mono truncate">
              {selectedCryptoCurrency.address}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="ml-2 border-unicorn-gold/30 text-unicorn-gold"
              onClick={handleCopyAddress}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex justify-center">
            <QRCodeDisplay value={selectedCryptoCurrency.address} size={150} />
          </div>
          
          <div className="text-center mt-4 text-sm text-gray-400">
            Send exactly <span className="text-unicorn-gold font-medium">{cryptoAmount} {selectedCryptoCurrency.shortName}</span> to this address
          </div>
        </div>
        
        <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-4 text-amber-300 text-sm">
          <div className="flex items-start space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mt-0.5">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <div>
              <p className="font-medium">Important:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Send only {selectedCryptoCurrency.shortName} to this address</li>
                <li>The minimum deposit amount is equivalent to $100 USD</li>
                <li>Deposits typically appear after 3 network confirmations</li>
              </ul>
            </div>
          </div>
        </div>
        
        {DEVELOPMENT_MODE && (
          <div className="border border-dashed border-unicorn-gold/40 rounded-lg p-3 bg-unicorn-gold/5">
            <p className="text-xs text-unicorn-gold mb-2">Development Mode: Click button below to simulate a deposit</p>
            <Button
              type="button"
              className="w-full bg-unicorn-gold/30 hover:bg-unicorn-gold/40 text-unicorn-gold"
              onClick={handleManualConfirm}
              disabled={loading || !amount}
            >
              {loading ? "Processing..." : "Simulate Deposit Confirmation"}
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t border-unicorn-gold/20 pt-6">
        <Button 
          variant="outline"
          type="button"
          className="border-unicorn-gold/30 text-unicorn-gold"
          onClick={() => window.open(`https://blockchain.com/explorer`, '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Track Transaction
        </Button>
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
            "I've Sent the Funds"
          )}
        </Button>
      </CardFooter>
    </form>
  );
};

export default CryptoDepositForm;
