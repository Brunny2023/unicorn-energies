
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  X,
  ChevronRight,
  Home,
  LineChart,
  Wallet,
  MessageSquare,
  Users,
  CreditCard,
  ArrowRightLeft,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface User {
  email?: string;
  id?: string;
}

interface DashboardSidebarProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
  user: User;
  isAdmin?: boolean;
}

const DashboardSidebar = ({ 
  isMenuOpen, 
  closeMenu, 
  user, 
  isAdmin = false
}: DashboardSidebarProps) => {
  // Use useLocation hook internally instead of accepting location as a prop
  const location = useLocation();
  
  const menuItems = [
    {
      label: "Dashboard",
      icon: Home,
      path: "/dashboard",
      adminOnly: false,
    },
    {
      label: "Investments",
      icon: LineChart,
      path: "/dashboard/investments",
      adminOnly: false,
    },
    {
      label: "Withdraw",
      icon: Wallet,
      path: "/dashboard/withdraw",
      adminOnly: false,
    },
    {
      label: "Tickets",
      icon: MessageSquare,
      path: "/dashboard/tickets",
      adminOnly: false,
    },
    {
      label: "Users",
      icon: Users,
      path: "/admin/users",
      adminOnly: true,
    },
    {
      label: "Transactions",
      icon: CreditCard,
      path: "/admin/transactions",
      adminOnly: true,
    },
    {
      label: "Tickets Admin",
      icon: MessageSquare,
      path: "/admin/tickets",
      adminOnly: true,
    },
  ];

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Console log the current path to debug routing issues
  console.log("Current path:", location.pathname);

  return (
    <aside
      className={`fixed z-40 top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-unicorn-darkPurple/90 border-r border-unicorn-gold/30 overflow-y-auto transition-transform transform md:translate-x-0 ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:top-0 md:block shadow-lg`}
    >
      <div className="flex items-center justify-between p-4 md:p-6">
        <Link to="/" className="hidden md:flex items-center text-2xl font-bold text-white">
          UnicornVest
        </Link>
        {/* Close button for mobile menu */}
        <Button variant="ghost" className="text-white md:hidden" onClick={closeMenu}>
          <X className="h-6 w-6" />
        </Button>
      </div>

      <div className="hidden md:block px-6 py-3">
        <div className="p-3 rounded-lg bg-unicorn-gold/10 border border-unicorn-gold/20 transition-all hover:bg-unicorn-gold/15">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-unicorn-gold/50">
              <AvatarFallback className="bg-unicorn-purple text-white">
                {user?.email ? getInitials(user.email) : "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-medium text-white">{user?.email || "User"}</div>
              <div className="text-xs text-gray-400">Gold Investor</div>
            </div>
          </div>
          <Separator className="my-3 bg-unicorn-gold/20" />
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-400">Available Balance</div>
            <div className="text-sm font-medium text-unicorn-gold">$10,500.00</div>
          </div>
        </div>
      </div>

      <nav className="py-6">
        {menuItems.map(
          (item) =>
            (!item.adminOnly || (item.adminOnly && isAdmin)) && (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center px-6 py-3 text-white hover:bg-unicorn-purple/20 transition-colors ${
                  location.pathname === item.path ? "bg-unicorn-purple/30 font-semibold border-l-4 border-unicorn-gold" : ""
                }`}
                onClick={closeMenu}
              >
                <item.icon className="h-4 w-4 mr-3" />
                {item.label}
                {location.pathname === item.path && <ChevronRight className="ml-auto h-4 w-4 text-unicorn-gold" />}
              </Link>
            )
        )}
      </nav>

      <div className="px-6 py-6 mt-auto">
        <div className="p-4 rounded-lg bg-unicorn-gold/5 border border-unicorn-gold/10 transition-all hover:bg-unicorn-gold/10">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-unicorn-gold/10 rounded-full">
              <CreditCard className="h-5 w-5 text-unicorn-gold" />
            </div>
            <div>
              <div className="text-sm font-medium text-white">Need more capital?</div>
              <div className="text-xs text-gray-400 mb-2">Deposit funds to your account</div>
              <Button 
                size="sm" 
                className="w-full text-xs bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black"
              >
                Deposit Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block p-6 text-center text-xs text-gray-500">
        <p>UnicornVest &copy; {new Date().getFullYear()}</p>
        <p className="mt-1">Version 1.0.0</p>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
