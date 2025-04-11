
import React from "react";
import { Button } from "@/components/ui/button";

const InvestmentDetailActions: React.FC = () => {
  return (
    <div className="pt-4">
      <h3 className="text-lg font-medium text-unicorn-gold mb-4">Actions</h3>
      <div className="flex flex-col space-y-2">
        <Button className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
          Reinvest Profits
        </Button>
        <Button variant="outline" className="border-unicorn-gold/50 text-unicorn-gold hover:bg-unicorn-gold/10">
          Download Statement
        </Button>
      </div>
    </div>
  );
};

export default InvestmentDetailActions;
