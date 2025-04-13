
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
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "lucide-react";

const formSchema = z.object({
  amount: z
    .number()
    .min(100, "Minimum loan amount is $100")
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
      amount: 1000,
      purpose: "",
    },
  });

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Loan Amount ($)</FormLabel>
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
                  "Submit Application"
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
