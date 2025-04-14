
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ChevronRight, Home, Wallet, BarChart } from "lucide-react";

const LoanHeader = () => {
  return (
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
            <BreadcrumbPage className="text-unicorn-gold">Loans</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Investment Loans</h1>
          <p className="text-gray-400">Apply for loans to boost your investment portfolio</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button asChild variant="outline" className="text-unicorn-gold border-unicorn-gold hover:bg-unicorn-gold/20">
            <Link to="/dashboard">
              <Home className="h-4 w-4 mr-1" />
              Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline" className="text-unicorn-gold border-unicorn-gold hover:bg-unicorn-gold/20">
            <Link to="/dashboard/investments">
              <BarChart className="h-4 w-4 mr-1" />
              Investments
            </Link>
          </Button>
          <Button asChild variant="outline" className="text-unicorn-gold border-unicorn-gold hover:bg-unicorn-gold/20">
            <Link to="/dashboard/deposit">
              <Wallet className="h-4 w-4 mr-1" />
              Deposit
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
        <Link to="/dashboard/deposit" className="whitespace-nowrap px-3 py-1 bg-unicorn-purple/30 rounded-full text-sm text-white hover:bg-unicorn-purple/50">
          Deposit
        </Link>
        <Link to="/dashboard/withdraw" className="whitespace-nowrap px-3 py-1 bg-unicorn-purple/30 rounded-full text-sm text-white hover:bg-unicorn-purple/50">
          Withdraw
        </Link>
      </div>
    </div>
  );
};

export default LoanHeader;
