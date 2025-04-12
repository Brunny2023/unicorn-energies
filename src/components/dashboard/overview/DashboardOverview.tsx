
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DashboardOverview = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <h2 className="text-3xl font-bold text-white">Dashboard Overview</h2>
      <div className="flex space-x-4">
        <Button asChild variant="outline" className="text-unicorn-gold border-unicorn-gold hover:bg-unicorn-gold/20">
          <Link to="/dashboard/withdraw">Withdraw Funds</Link>
        </Button>
        <Button asChild className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
          <Link to="/dashboard/investments">Invest Now</Link>
        </Button>
      </div>
    </div>
  );
};

export default DashboardOverview;
