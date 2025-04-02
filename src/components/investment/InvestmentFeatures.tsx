
import { ShieldCheck, Clock, BarChart } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const InvestmentFeatures = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="heading-lg text-investment-navy mb-8 text-center">
        Investment Plan Features
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="text-center p-6 bg-investment-gray rounded-lg">
          <ShieldCheck className="h-12 w-12 text-investment-gold mx-auto mb-4" />
          <h3 className="text-xl font-bold text-investment-navy mb-2">Secure & Protected</h3>
          <p className="text-gray-600">
            Your investments are protected by tangible assets and secured through legal frameworks.
          </p>
        </div>
        
        <div className="text-center p-6 bg-investment-gray rounded-lg">
          <Clock className="h-12 w-12 text-investment-gold mx-auto mb-4" />
          <h3 className="text-xl font-bold text-investment-navy mb-2">Daily Returns</h3>
          <p className="text-gray-600">
            Earn profits daily, with returns credited directly to your account balance.
          </p>
        </div>
        
        <div className="text-center p-6 bg-investment-gray rounded-lg">
          <BarChart className="h-12 w-12 text-investment-gold mx-auto mb-4" />
          <h3 className="text-xl font-bold text-investment-navy mb-2">Full Transparency</h3>
          <p className="text-gray-600">
            Track your investment performance in real-time through your personal dashboard.
          </p>
        </div>
      </div>
      
      <div className="bg-investment-gray p-8 rounded-lg">
        <h3 className="text-xl font-bold text-investment-navy mb-4">
          Frequently Asked Questions
        </h3>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              How do I start investing with UnicornEnergies?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              To start investing, simply create an account, select your preferred investment plan, and make a deposit using your preferred payment method. Once your deposit is confirmed, your investment will be activated, and you'll start earning returns immediately.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">
              Are my investments secure?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Yes, your investments are secured through a combination of tangible asset backing, legal protections, and our comprehensive risk management strategies. We employ industry-standard security measures to protect both your capital and personal information.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left">
              When and how can I withdraw my profits?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              You can withdraw your profits at any time through your account dashboard. Withdrawal requests are typically processed within 24 hours, and funds are sent to your registered payment method. There are no withdrawal fees for profit withdrawals.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left">
              What payment methods do you accept?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              We accept a wide range of payment methods including major cryptocurrencies (Bitcoin, Ethereum, Litecoin, etc.), bank transfers, and select e-payment systems. Cryptocurrency transactions typically offer the fastest processing times and enhanced privacy.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-left">
              Can I upgrade my investment plan?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Yes, you can upgrade to a higher-tier investment plan at any time by making additional deposits that meet the minimum requirement for the desired plan. Your account manager can assist you with the upgrade process to ensure a smooth transition.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default InvestmentFeatures;
