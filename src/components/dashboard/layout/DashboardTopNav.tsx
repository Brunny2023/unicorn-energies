
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Wallet, CreditCard, BarChart, DollarSign, Users, FileText, Ticket, Settings } from "lucide-react";

const DashboardTopNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    { 
      path: "/dashboard", 
      label: "Dashboard", 
      icon: <Home className="h-4 w-4 mr-1.5" /> 
    },
    { 
      path: "/dashboard/investments", 
      label: "Investments", 
      icon: <BarChart className="h-4 w-4 mr-1.5" /> 
    },
    { 
      path: "/dashboard/deposit", 
      label: "Deposit", 
      icon: <Wallet className="h-4 w-4 mr-1.5" /> 
    },
    { 
      path: "/dashboard/withdraw", 
      label: "Withdraw", 
      icon: <CreditCard className="h-4 w-4 mr-1.5" /> 
    },
    { 
      path: "/dashboard/loans", 
      label: "Loans", 
      icon: <DollarSign className="h-4 w-4 mr-1.5" /> 
    },
    { 
      path: "/dashboard/affiliates", 
      label: "Affiliates", 
      icon: <Users className="h-4 w-4 mr-1.5" /> 
    },
    { 
      path: "/dashboard/transactions", 
      label: "Transactions", 
      icon: <FileText className="h-4 w-4 mr-1.5" /> 
    },
    { 
      path: "/dashboard/tickets", 
      label: "Support", 
      icon: <Ticket className="h-4 w-4 mr-1.5" /> 
    }
  ];

  return (
    <div className="mb-6">
      {/* Desktop navigation tabs */}
      <div className="hidden md:flex space-x-1 overflow-x-auto pb-2 border-b border-unicorn-purple/30">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-2 rounded-t-lg text-sm font-medium whitespace-nowrap transition-colors ${
              currentPath === item.path
                ? "bg-unicorn-gold/20 text-unicorn-gold border-b-2 border-unicorn-gold"
                : "text-gray-400 hover:text-unicorn-gold hover:bg-unicorn-purple/20"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </div>

      {/* Mobile navigation pills */}
      <div className="flex md:hidden overflow-x-auto gap-2 py-2 mb-4">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm flex items-center ${
              currentPath === item.path
                ? "bg-unicorn-gold/20 text-unicorn-gold"
                : "bg-unicorn-purple/30 text-white hover:bg-unicorn-purple/50"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardTopNav;
