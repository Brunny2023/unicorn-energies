
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const InvestmentsEmptyState: React.FC = () => {
  return (
    <div className="text-center py-8">
      <div className="mb-4 flex justify-center">
        <div className="rounded-full p-3 bg-unicorn-gold/10 border border-unicorn-gold/20">
          <Sparkles className="h-8 w-8 text-unicorn-gold" />
        </div>
      </div>
      <h3 className="text-white text-lg font-semibold mb-2">Start Your Investment Journey</h3>
      <p className="text-gray-400 mb-6 max-w-md mx-auto">
        Choose from our carefully curated investment plans and start growing your wealth today with UnicornVest.
      </p>
      <Button 
        className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black"
        asChild
      >
        <a href="/investment-plans">
          Explore Investment Plans
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
  );
};

export default InvestmentsEmptyState;
