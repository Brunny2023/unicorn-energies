import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, ArrowDownRight, AlertCircle, Info } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { calculateWithdrawal, processWithdrawal, formatCurrency, fetchWalletData } from "@/utils/investmentUtils";
import { WithdrawalRequest, WalletData } from "@/types/investment";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const withdrawalSchema = z.object({
  amount: z.string().min(1, "Amount is required").refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    { message: "Amount must be a positive number" }
  ),
});

const Withdraw = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [calculatingFee, setCalculatingFee] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [accruedProfits, setAccruedProfits] = useState(0);
  const [withdrawalRequest, setWithdrawalRequest] = useState<WithdrawalRequest | null>(null);

  const form = useForm<z.infer<typeof withdrawalSchema>>({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: {
      amount: "",
    },
  });

  // Fetch wallet balance when component mounts
  useEffect(() => {
    if (user) {
      fetchWalletBalance();
    }
  }, [user]);

  const fetchWalletBalance = async () => {
    try {
      if (!user) return;

      const wallet = await fetchWalletData(user.id);
      if (wallet) {
        setWalletBalance(wallet.balance);
        setAccruedProfits(wallet.accrued_profits);
      }
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
      toast({
        title: "Error",
        description: "Failed to load wallet data",
        variant: "destructive",
      });
    }
  };

  const onCalculateFee = async (values: z.infer<typeof withdrawalSchema>) => {
    if (!user) return;

    try {
      setCalculatingFee(true);
      const amount = Number(values.amount);
      
      const request = await calculateWithdrawal(user.id, amount);
      setWithdrawalRequest(request);
      
      setCalculatingFee(false);
    } catch (error) {
      console.error("Error calculating withdrawal fee:", error);
      toast({
        title: "Error",
        description: "Failed to calculate withdrawal details",
        variant: "destructive",
      });
      setCalculatingFee(false);
    }
  };

  const onSubmitWithdrawal = async () => {
    if (!user || !withdrawalRequest) return;

    try {
      setLoading(true);
      
      if (!withdrawalRequest.eligible) {
        toast({
          title: "Cannot process withdrawal",
          description: withdrawalRequest.reason,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      const success = await processWithdrawal(user.id, withdrawalRequest);
      
      if (success) {
        toast({
          title: "Withdrawal Requested",
          description: "Your withdrawal has been submitted for processing",
        });
        navigate("/dashboard");
      } else {
        throw new Error("Failed to process withdrawal");
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error processing withdrawal:", error);
      toast({
        title: "Error",
        description: "Failed to process withdrawal",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white">Withdraw Funds</h2>
        
        <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
          <CardHeader>
            <CardTitle className="text-xl text-white">Your Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <Wallet className="mr-3 h-7 w-7 text-unicorn-gold" />
              <div className="text-3xl font-bold text-white">
                {formatCurrency(walletBalance)}
              </div>
            </div>
            
            <Alert className="border-blue-500/40 bg-blue-500/10 mt-4">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertTitle className="text-blue-500">Withdrawal Information</AlertTitle>
              <AlertDescription className="text-gray-300">
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>All withdrawals incur a 5% processing fee</li>
                  <li>Funds from active investments cannot be withdrawn until maturity</li>
                  <li>Withdrawal requests are typically processed within 24 hours</li>
                </ul>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
        
        <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
          <CardHeader>
            <CardTitle className="text-xl text-white">Withdrawal Request</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onCalculateFee)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Amount to Withdraw</FormLabel>
                      <FormControl>
                        <div className="flex">
                          <span className="bg-unicorn-darkPurple px-3 py-2 border-y border-l border-gray-600 rounded-l-md">$</span>
                          <Input
                            {...field}
                            className="rounded-l-none border-gray-600 bg-unicorn-darkPurple/50 text-white"
                            placeholder="Enter amount"
                            type="number"
                            min="1"
                            max={walletBalance.toString()}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black"
                  disabled={calculatingFee}
                >
                  {calculatingFee ? "Calculating..." : "Calculate Withdrawal"}
                </Button>
              </form>
            </Form>
            
            {withdrawalRequest && (
              <div className="mt-6 p-4 border border-gray-600 rounded-lg">
                <h4 className="text-lg font-semibold text-white mb-4">Withdrawal Details</h4>
                
                {!withdrawalRequest.eligible && (
                  <Alert className="border-red-500/40 bg-red-500/10 mb-4">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <AlertTitle className="text-red-500">Cannot Process Withdrawal</AlertTitle>
                    <AlertDescription className="text-gray-300">
                      {withdrawalRequest.reason}
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Requested Amount:</span>
                    <span className="text-white font-medium">
                      {formatCurrency(withdrawalRequest.amount)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-300">Withdrawal Fee (5%):</span>
                    <span className="text-red-400 font-medium">
                      - {formatCurrency(withdrawalRequest.fee)}
                    </span>
                  </div>
                  
                  <div className="border-t border-gray-600 pt-3 flex justify-between">
                    <span className="text-gray-300">Net Amount:</span>
                    <span className="text-unicorn-gold font-bold">
                      {formatCurrency(withdrawalRequest.netAmount)}
                    </span>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4 bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black"
                  disabled={!withdrawalRequest.eligible || loading}
                  onClick={onSubmitWithdrawal}
                >
                  {loading ? "Processing..." : "Confirm Withdrawal"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Withdraw;
