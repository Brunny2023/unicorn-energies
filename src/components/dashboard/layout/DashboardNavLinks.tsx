
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BarChart,
  CreditCard,
  Users,
  FileText,
  DollarSign,
  Settings,
  Ticket,
  Bitcoin,
  Link as LinkIcon,
  Wallet
} from "lucide-react";

interface DashboardNavLinksProps {
  isAdmin: boolean;
  closeMenu: () => void;
}

const DashboardNavLinks = ({ isAdmin, closeMenu }: DashboardNavLinksProps) => {
  const location = useLocation();
  
  const userNavItems = [
    {
      title: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      path: "/dashboard",
    },
    {
      title: "Investments",
      icon: <BarChart className="h-5 w-5" />,
      path: "/dashboard/investments",
    },
    {
      title: "Deposit",
      icon: <Wallet className="h-5 w-5" />,
      path: "/dashboard/deposit",
    },
    {
      title: "Withdraw",
      icon: <CreditCard className="h-5 w-5" />,
      path: "/dashboard/withdraw",
    },
    {
      title: "Loans",
      icon: <DollarSign className="h-5 w-5" />,
      path: "/dashboard/loans",
    },
    {
      title: "Affiliates",
      icon: <Users className="h-5 w-5" />,
      path: "/dashboard/affiliates",
    },
    {
      title: "Transactions",
      icon: <FileText className="h-5 w-5" />,
      path: "/dashboard/transactions",
    },
    {
      title: "Support Tickets",
      icon: <Ticket className="h-5 w-5" />,
      path: "/dashboard/tickets",
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      path: "/dashboard/settings",
    }
  ];
  
  const adminNavItems = [
    {
      title: "Admin Dashboard",
      icon: <Home className="h-5 w-5" />,
      path: "/admin/dashboard",
    },
    {
      title: "Users",
      icon: <Users className="h-5 w-5" />,
      path: "/admin/users",
    },
    {
      title: "Transactions",
      icon: <FileText className="h-5 w-5" />,
      path: "/admin/transactions",
    },
    {
      title: "Loan Applications",
      icon: <DollarSign className="h-5 w-5" />,
      path: "/admin/loan-applications",
    },
    {
      title: "Tickets",
      icon: <Ticket className="h-5 w-5" />,
      path: "/admin/tickets",
    },
    {
      title: "Payment Connections",
      icon: <Bitcoin className="h-5 w-5" />,
      path: "/admin/payment-connections",
    },
    {
      title: "Broadcast Messages",
      icon: <LinkIcon className="h-5 w-5" />,
      path: "/admin/broadcast",
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      path: "/admin/settings",
    }
  ];
  
  const menuItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <nav className="space-y-1">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">
        Navigation
      </h3>
      
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-2.5 rounded-lg font-medium transition-colors ${
              isActive
                ? "bg-unicorn-gold/10 text-unicorn-gold border-l-2 border-unicorn-gold"
                : "text-gray-400 hover:text-unicorn-gold hover:bg-unicorn-gold/5"
            }`}
            onClick={closeMenu}
            aria-current={isActive ? "page" : undefined}
          >
            {item.icon}
            <span className="ml-3">{item.title}</span>
            
            {isActive && (
              <span className="ml-auto bg-unicorn-gold/20 text-unicorn-gold text-xs py-0.5 px-1.5 rounded-md">
                Active
              </span>
            )}
          </Link>
        );
      })}
      
      <div className="pt-4 mt-4 border-t border-unicorn-purple/20 px-4">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Quick Links
        </span>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <Link
            to="/dashboard"
            className="flex items-center justify-center py-1.5 rounded-md bg-unicorn-purple/30 text-xs text-gray-300 hover:bg-unicorn-purple/50"
            onClick={closeMenu}
          >
            <Home className="h-3 w-3 mr-1" />
            Home
          </Link>
          <Link
            to="/dashboard/investments"
            className="flex items-center justify-center py-1.5 rounded-md bg-unicorn-purple/30 text-xs text-gray-300 hover:bg-unicorn-purple/50"
            onClick={closeMenu}
          >
            <BarChart className="h-3 w-3 mr-1" />
            Invest
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavLinks;
