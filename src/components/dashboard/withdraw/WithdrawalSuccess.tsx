
import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WithdrawalSuccess = () => {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
        <CheckCircle2 className="h-8 w-8 text-green-500" />
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2">
        Withdrawal Request Submitted!
      </h3>
      
      <p className="text-gray-400 mb-6">
        Your funds will be processed and transferred to your account within 1-2 business days.
      </p>
      
      <div className="p-4 rounded-lg bg-unicorn-purple/30 border border-unicorn-gold/20 mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Transaction ID:</span>
          <span className="text-white font-mono">WD-{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Estimated completion:</span>
          <span className="text-white">
            {new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/dashboard/investments" className="flex-1">
          <Button variant="outline" className="w-full border-unicorn-gold/50 text-unicorn-gold hover:bg-unicorn-gold/10">
            View Investments
          </Button>
        </Link>
        <Link to="/dashboard" className="flex-1">
          <Button className="w-full bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
            Back to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default WithdrawalSuccess;
