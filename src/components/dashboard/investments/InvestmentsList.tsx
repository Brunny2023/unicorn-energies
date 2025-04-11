
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Investment } from "@/types/investment";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  
  // Handle view details
  const handleViewDetails = (investment: Investment) => {
    setSelectedInvestment(investment);
  };
  
  // Close details
  const closeDetails = () => {
    setSelectedInvestment(null);
  };

  // Filter and sort investments
  const getFilteredInvestments = () => {
    let filtered = [...investments];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(inv => 
        inv.plan_id.toLowerCase().includes(term) || 
        inv.amount.toString().includes(term)
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(inv => inv.status === statusFilter);
    }
    
    // Apply sorting
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
        break;
      case "amount-high":
        filtered.sort((a, b) => Number(b.amount) - Number(a.amount));
        break;
      case "amount-low":
        filtered.sort((a, b) => Number(a.amount) - Number(b.amount));
        break;
      case "return-high":
        filtered.sort((a, b) => Number(b.daily_return) - Number(a.daily_return));
        break;
    }
    
    return filtered;
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

  const filteredInvestments = getFilteredInvestments();

  // Show investments list
  return (
    <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
      <CardHeader>
        <CardTitle className="text-white">Your Investments</CardTitle>
        <CardDescription className="text-gray-400">
          Manage your active investments and track returns
        </CardDescription>
        
        {!loading && investments.length > 0 && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center relative">
              <Search className="absolute left-3 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search investments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-unicorn-darkPurple/50 border-unicorn-gold/30 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
              <div className="w-full sm:w-1/2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-unicorn-darkPurple/50 border-unicorn-gold/30 text-white">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-unicorn-darkPurple border-unicorn-gold/30 text-white">
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active Only</SelectItem>
                    <SelectItem value="pending">Pending Only</SelectItem>
                    <SelectItem value="completed">Completed Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full sm:w-1/2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-unicorn-darkPurple/50 border-unicorn-gold/30 text-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-unicorn-darkPurple border-unicorn-gold/30 text-white">
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="amount-high">Highest Amount</SelectItem>
                    <SelectItem value="amount-low">Lowest Amount</SelectItem>
                    <SelectItem value="return-high">Highest Return</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        {loading ? (
          <InvestmentListSkeleton />
        ) : investments.length === 0 ? (
          <InvestmentsEmptyState />
        ) : filteredInvestments.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>No investments match your filters.</p>
            <p className="text-sm mt-2">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredInvestments.map((investment) => (
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
