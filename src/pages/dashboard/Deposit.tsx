
import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DepositContainer from "@/components/dashboard/deposit/DepositContainer";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { ChevronRight, Wallet, Home, BarChart, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

const Deposit = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <Breadcrumb className="mb-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/dashboard" className="text-gray-400 hover:text-unicorn-gold">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-unicorn-gold">Deposit</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Deposit Funds</h1>
              <p className="text-gray-400">Add funds to your account using your preferred payment method</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex gap-2">
              <Button asChild variant="outline" className="text-unicorn-gold border-unicorn-gold hover:bg-unicorn-gold/20">
                <Link to="/dashboard">
                  <Home className="h-4 w-4 mr-1" />
                  Dashboard
                </Link>
              </Button>
              <Button asChild variant="outline" className="text-unicorn-gold border-unicorn-gold hover:bg-unicorn-gold/20">
                <Link to="/dashboard/withdraw">
                  <CreditCard className="h-4 w-4 mr-1" />
                  Withdraw
                </Link>
              </Button>
              <Button asChild className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
                <Link to="/dashboard/investments">
                  <BarChart className="h-4 w-4 mr-1" />
                  Investments
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Pills */}
          <div className="flex overflow-x-auto gap-2 py-2 md:hidden">
            <Link to="/dashboard" className="whitespace-nowrap px-3 py-1 bg-unicorn-purple/30 rounded-full text-sm text-white hover:bg-unicorn-purple/50">
              Dashboard
            </Link>
            <Link to="/dashboard/investments" className="whitespace-nowrap px-3 py-1 bg-unicorn-purple/30 rounded-full text-sm text-white hover:bg-unicorn-purple/50">
              Investments
            </Link>
            <Link to="/dashboard/withdraw" className="whitespace-nowrap px-3 py-1 bg-unicorn-purple/30 rounded-full text-sm text-white hover:bg-unicorn-purple/50">
              Withdraw
            </Link>
            <Link to="/dashboard/transactions" className="whitespace-nowrap px-3 py-1 bg-unicorn-purple/30 rounded-full text-sm text-white hover:bg-unicorn-purple/50">
              Transactions
            </Link>
          </div>
        </div>
        
        <DepositContainer />
      </div>
    </DashboardLayout>
  );
};

export default Deposit;
