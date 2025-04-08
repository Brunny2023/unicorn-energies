import React, { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { signOut } from "@/contexts/auth/authActions";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Wallet,
  LineChart,
  CreditCard,
  ArrowRightLeft,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Users,
  Settings,
  MessageSquare,
  Home,
} from "lucide-react";
import StarsBackground from "@/components/ui/StarsBackground";

interface DashboardLayoutProps {
  children: ReactNode;
  isAdmin?: boolean; // Add optional isAdmin prop
}

const DashboardLayout = ({ children, isAdmin = false }: DashboardLayoutProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut({ toast, navigate });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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

  return (
    <div className="relative h-screen flex flex-col">
      <StarsBackground />

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        className="absolute top-4 left-4 z-50 text-white md:hidden"
        onClick={toggleMenu}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Sidebar (always visible on larger screens) */}
      <aside
        className={`fixed z-40 top-0 left-0 h-full w-64 bg-unicorn-darkPurple/90 border-r border-unicorn-gold/30 overflow-y-auto transition-transform transform md:translate-x-0 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:block`}
      >
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="flex items-center text-2xl font-bold text-white">
            UnicornVest
          </Link>
          {/* Close button for mobile menu */}
          <Button variant="ghost" className="text-white md:hidden" onClick={closeMenu}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <nav className="py-6">
          {menuItems.map(
            (item) =>
              (!item.adminOnly || (item.adminOnly && isAdmin)) && (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center px-6 py-3 text-white hover:bg-unicorn-purple/20 transition-colors ${
                    location.pathname === item.path ? "bg-unicorn-purple/30 font-semibold" : ""
                  }`}
                  onClick={closeMenu}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                  {location.pathname === item.path && <ChevronRight className="ml-auto h-4 w-4" />}
                </Link>
              )
          )}
        </nav>

        <div className="p-4 mt-auto">
          <Button
            variant="ghost"
            className="flex items-center justify-start w-full text-white hover:bg-red-500/20"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:pl-64 p-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
