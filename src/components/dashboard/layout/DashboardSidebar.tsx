
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
  LogOut,
  Ticket,
  Bitcoin,
  Link as LinkIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardSidebarProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
  user: any;
  isAdmin?: boolean;
}

const DashboardSidebar = ({
  isMenuOpen,
  closeMenu,
  user,
  isAdmin = false
}: DashboardSidebarProps) => {
  const location = useLocation();
  
  const navItems = [
    {
      title: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      path: "/dashboard",
      admin: false
    },
    {
      title: "Investments",
      icon: <BarChart className="h-5 w-5" />,
      path: "/dashboard/investments",
      admin: false
    },
    {
      title: "Withdraw",
      icon: <CreditCard className="h-5 w-5" />,
      path: "/dashboard/withdraw",
      admin: false
    },
    {
      title: "Loans",
      icon: <DollarSign className="h-5 w-5" />,
      path: "/dashboard/loans",
      admin: false
    },
    {
      title: "Affiliates",
      icon: <Users className="h-5 w-5" />,
      path: "/dashboard/affiliates",
      admin: false
    },
    {
      title: "Transactions",
      icon: <FileText className="h-5 w-5" />,
      path: "/dashboard/transactions",
      admin: false
    },
    {
      title: "Support Tickets",
      icon: <Ticket className="h-5 w-5" />,
      path: "/dashboard/tickets",
      admin: false
    }
  ];
  
  const adminNavItems = [
    {
      title: "Admin Dashboard",
      icon: <Home className="h-5 w-5" />,
      path: "/admin/dashboard",
      admin: true
    },
    {
      title: "Users",
      icon: <Users className="h-5 w-5" />,
      path: "/admin/users",
      admin: true
    },
    {
      title: "Transactions",
      icon: <FileText className="h-5 w-5" />,
      path: "/admin/transactions",
      admin: true
    },
    {
      title: "Loan Applications",
      icon: <DollarSign className="h-5 w-5" />,
      path: "/admin/loan-applications",
      admin: true
    },
    {
      title: "Tickets",
      icon: <Ticket className="h-5 w-5" />,
      path: "/admin/tickets",
      admin: true
    },
    {
      title: "Payment Connections",
      icon: <Bitcoin className="h-5 w-5" />,
      path: "/admin/payment-connections",
      admin: true
    },
    {
      title: "Broadcast Messages",
      icon: <LinkIcon className="h-5 w-5" />,
      path: "/admin/broadcast",
      admin: true
    }
  ];
  
  // Choose which items to show based on the user's role
  const menuItems = isAdmin ? adminNavItems : navItems;

  return (
    <>
      {/* Mobile overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMenu}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 pt-16 left-0 z-30 h-full w-64 bg-unicorn-darkPurple transition-transform duration-300 ease-in-out transform md:translate-x-0 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:w-64 shadow-xl border-r border-unicorn-purple/20`}
      >
        <div className="h-full flex flex-col space-y-2 p-4 overflow-y-auto">
          <div className="mb-8 space-y-4">
            {/* User info */}
            <div className="flex flex-col items-center mb-4 p-4 rounded-lg bg-unicorn-darkPurple/30 border border-unicorn-gold/20">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-unicorn-purple/40 border-2 border-unicorn-gold/40 flex items-center justify-center">
                  <span className="text-xl font-bold text-unicorn-gold">
                    {user && user.email ? user.email.charAt(0).toUpperCase() : "U"}
                  </span>
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-unicorn-darkPurple"></div>
              </div>
              <div className="mt-3 text-center">
                <h3 className="text-unicorn-gold font-medium">
                  {user && user.email ? user.email.split('@')[0] : "User"}
                </h3>
                <p className="text-xs text-gray-400">
                  {isAdmin ? "Administrator" : "Investor"}
                </p>
              </div>
            </div>

            {/* Navigation */}
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
          </div>

          <div className="mt-auto pt-6 border-t border-unicorn-purple/20 space-y-2">
            <Link
              to="/settings"
              className="flex items-center px-4 py-2.5 rounded-lg text-gray-400 hover:text-unicorn-gold hover:bg-unicorn-gold/5 font-medium transition-colors"
              onClick={closeMenu}
            >
              <Settings className="h-5 w-5" />
              <span className="ml-3">Settings</span>
            </Link>
            
            <Button
              variant="outline"
              className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 border-red-500/30 justify-start font-medium"
              onClick={() => {
                // Handle logout
                closeMenu();
              }}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
