
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Wallet, CreditCard, BarChart, DollarSign, Users, FileText, Ticket, Settings } from "lucide-react";

const DashboardOverview = () => {
  // Define navigation options for quick access
  const navOptions = [
    { title: "Investments", icon: <BarChart className="h-5 w-5 mr-2" />, path: "/dashboard/investments", primary: true },
    { title: "Deposit Funds", icon: <Wallet className="h-5 w-5 mr-2" />, path: "/dashboard/deposit" },
    { title: "Withdraw Funds", icon: <CreditCard className="h-5 w-5 mr-2" />, path: "/dashboard/withdraw" },
    { title: "Loans", icon: <DollarSign className="h-5 w-5 mr-2" />, path: "/dashboard/loans" },
    { title: "Affiliates", icon: <Users className="h-5 w-5 mr-2" />, path: "/dashboard/affiliates" },
    { title: "Transactions", icon: <FileText className="h-5 w-5 mr-2" />, path: "/dashboard/transactions" },
    { title: "Support", icon: <Ticket className="h-5 w-5 mr-2" />, path: "/dashboard/tickets" },
    { title: "Settings", icon: <Settings className="h-5 w-5 mr-2" />, path: "/dashboard/settings" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-3xl font-bold text-white">Dashboard Overview</h2>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" className="text-unicorn-gold border-unicorn-gold hover:bg-unicorn-gold/20">
            <Link to="/dashboard/deposit">Deposit Funds</Link>
          </Button>
          <Button asChild variant="outline" className="text-unicorn-gold border-unicorn-gold hover:bg-unicorn-gold/20">
            <Link to="/dashboard/withdraw">Withdraw Funds</Link>
          </Button>
          <Button asChild className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
            <Link to="/dashboard/investments">Invest Now</Link>
          </Button>
        </div>
      </div>

      {/* Navigation Grid - Quick access to all dashboard sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {navOptions.map((option) => (
          <Link 
            key={option.path} 
            to={option.path}
            className={`flex items-center p-4 rounded-lg border transition-all ${
              option.primary 
                ? "bg-unicorn-gold/20 border-unicorn-gold text-unicorn-gold hover:bg-unicorn-gold/30" 
                : "bg-unicorn-purple/20 border-unicorn-purple/30 text-white hover:bg-unicorn-purple/30"
            }`}
          >
            {option.icon}
            <span className="font-medium">{option.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;
