
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Investment } from "@/types/investment";
import InvestmentDetail from "./InvestmentDetail";
import InvestmentListItem from "./InvestmentListItem";
import InvestmentListSkeleton from "./InvestmentListSkeleton";
import InvestmentsEmptyState from "./InvestmentsEmptyState";

interface InvestmentsListProps {
  loading: boolean;
  investments: Investment[];
}

const InvestmentsList: React.FC<InvestmentsListProps> = ({ loading, investments }) => {
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  
  // Handle view details
  const handleViewDetails = (investment: Investment) => {
    setSelectedInvestment(investment);
  };
  
  // Close details
  const closeDetails = () => {
    setSelectedInvestment(null);
  };

  // If selected investment, show details
  if (selectedInvestment) {
    return (
      <InvestmentDetail 
        investment={selectedInvestment} 
        onClose={closeDetails} 
      />
    );
  }

  // Show investments list
  return (
    <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
      <CardHeader>
        <CardTitle className="text-white">Your Investments</CardTitle>
        <CardDescription className="text-gray-400">
          Manage your active investments and track returns
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <InvestmentListSkeleton />
        ) : investments.length === 0 ? (
          <InvestmentsEmptyState />
        ) : (
          <div className="space-y-4">
            {investments.map((investment) => (
              <InvestmentListItem 
                key={investment.id}
                investment={investment}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InvestmentsList;
