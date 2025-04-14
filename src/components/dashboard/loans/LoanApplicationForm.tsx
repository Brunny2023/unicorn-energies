
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader, AlertCircle, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Updated form schema with minimum loan amount of $3,500 and without proposed investment
const formSchema = z.object({
  amount: z
    .number()
    .min(3500, "Minimum loan amount is $3,500")
    .max(50000, "Maximum loan amount is $50,000"),
  purpose: z
    .string()
    .min(10, "Please provide at least 10 characters")
    .max(500, "Maximum 500 characters allowed"),
});

interface LoanApplicationFormProps {
  onSubmit: (amount: number, purpose: string) => Promise<void>;
  submitting: boolean;
}

const LoanApplicationForm = ({ onSubmit, submitting }: LoanApplicationFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 3500,
      purpose: "",
    },
  });

  const watchAmount = form.watch("amount");
  
  // Calculate commitment fee (5% of loan amount)
  const commitmentFee = (watchAmount * 0.05).toFixed(2);
  const canEarnReferralBonus = Number(commitmentFee) >= 688;

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await onSubmit(values.amount, values.purpose);
    form.reset();
  };

  return (
    <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">Apply for Investment Loan</CardTitle>
        <CardDescription className="text-gray-400">
          Request funds to boost your investment portfolio. Approved loans can only be used for investments.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4 bg-amber-500/10 text-amber-500 border-amber-500/30">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Loans can only be used for investments and cannot be withdrawn. You must double your loan amount 
            through daily interests before you can withdraw any profits earned from your investments.
          </AlertDescription>
        </Alert>
        
        <Alert className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/30">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Loan Terms:</strong> A commitment fee of 5% (${commitmentFee}) will be required before your loan can be approved. 
            This fee will be automatically deducted from your wallet balance when you submit your application.
            {canEarnReferralBonus && (
              <p className="mt-2">
                <strong>Referral Bonus:</strong> Refer others to apply for loans and earn $250 for each person when they deposit at least $688!
              </p>
            )}
          </AlertDescription>
        </Alert>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Loan Amount ($)</FormLabel>
                  <FormDescription className="text-gray-400">
                    Enter the amount you'd like to borrow (minimum $3,500)
                  </FormDescription>
                  <FormControl>
                    <Input 
                      type="number"
                      className="bg-unicorn-darkPurple border-unicorn-gold/30 text-white"
                      placeholder="Enter loan amount" 
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      disabled={submitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Purpose</FormLabel>
                  <FormDescription className="text-gray-400">
                    Explain how you plan to use the investment funds
                  </FormDescription>
                  <FormControl>
                    <Textarea 
                      className="bg-unicorn-darkPurple border-unicorn-gold/30 text-white min-h-24"
                      placeholder="Explain the purpose of this loan and how you plan to use the investment" 
                      {...field}
                      disabled={submitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-2">
              <Button 
                type="submit" 
                className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-bold w-full"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  `Submit Application (Commitment Fee: $${commitmentFee})`
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoanApplicationForm;
