
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
  Link as LinkIcon
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
  
  // Choose which items to show based on the user's role
  const menuItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <nav className="space-y-1">
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex items-center px-4 py-2.5 rounded-lg font-medium transition-colors ${
            location.pathname === item.path
              ? "bg-unicorn-gold/10 text-unicorn-gold border-l-2 border-unicorn-gold"
              : "text-gray-400 hover:text-unicorn-gold hover:bg-unicorn-gold/5"
          }`}
          onClick={closeMenu}
        >
          {item.icon}
          <span className="ml-3">{item.title}</span>
        </Link>
      ))}
    </nav>
  );
};

export default DashboardNavLinks;
