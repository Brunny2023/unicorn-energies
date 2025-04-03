
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Home,
  CreditCard,
  BarChart3,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon, label, active, onClick }) => (
  <Link
    to={href}
    onClick={onClick}
    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
      active ? "bg-unicorn-gold text-unicorn-black" : "text-gray-300 hover:bg-unicorn-gold/20"
    }`}
  >
    {icon}
    {label}
  </Link>
);

interface DashboardLayoutProps {
  children: React.ReactNode;
  isAdmin?: boolean;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, isAdmin = false }) => {
  const { signOut, user } = useAuth();
  const location = useLocation();
  const [showMobileNav, setShowMobileNav] = useState(false);

  const toggleMobileNav = () => {
    setShowMobileNav(!showMobileNav);
  };

  const closeMobileNav = () => {
    setShowMobileNav(false);
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="min-h-screen bg-unicorn-darkPurple/90 flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-unicorn-darkPurple/90 border-unicorn-gold/30">
        <div className="flex h-16 items-center border-b border-unicorn-gold/30 px-6">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/lovable-uploads/81643525-55e2-47f0-994e-cc903455b959.png"
              alt="UnicornEnergies Logo"
              className="h-8 w-8"
            />
            <span className="text-lg font-semibold text-white">
              <span className="text-unicorn-gold">Unicorn</span>Energies
            </span>
          </Link>
        </div>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-500 uppercase">General</h4>
              <div className="space-y-1">
                {isAdmin ? (
                  <>
                    <NavLink
                      href="/admin/dashboard"
                      icon={<Home size={16} />}
                      label="Dashboard"
                      active={location.pathname === "/admin/dashboard"}
                    />
                    <NavLink
                      href="/admin/users"
                      icon={<Users size={16} />}
                      label="Users"
                      active={location.pathname === "/admin/users"}
                    />
                    <NavLink
                      href="/admin/transactions"
                      icon={<CreditCard size={16} />}
                      label="Transactions"
                      active={location.pathname === "/admin/transactions"}
                    />
                  </>
                ) : (
                  <>
                    <NavLink
                      href="/dashboard"
                      icon={<Home size={16} />}
                      label="Dashboard"
                      active={location.pathname === "/dashboard"}
                    />
                    <NavLink
                      href="/dashboard/transactions"
                      icon={<CreditCard size={16} />}
                      label="Transactions"
                      active={location.pathname === "/dashboard/transactions"}
                    />
                    <NavLink
                      href="/dashboard/investments"
                      icon={<BarChart3 size={16} />}
                      label="Investments"
                      active={location.pathname === "/dashboard/investments"}
                    />
                  </>
                )}
              </div>
            </div>
            <Separator className="border-unicorn-gold/30" />
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-500 uppercase">Account</h4>
              <div className="space-y-1">
                <NavLink
                  href={isAdmin ? "/admin/profile" : "/dashboard/profile"}
                  icon={<User size={16} />}
                  label="Profile"
                  active={location.pathname === (isAdmin ? "/admin/profile" : "/dashboard/profile")}
                />
                <NavLink
                  href={isAdmin ? "/admin/settings" : "/dashboard/settings"}
                  icon={<Settings size={16} />}
                  label="Settings"
                  active={location.pathname === (isAdmin ? "/admin/settings" : "/dashboard/settings")}
                />
                <Button
                  variant="ghost"
                  onClick={handleSignOut}
                  className="w-full justify-start text-gray-300 hover:bg-unicorn-gold/20 hover:text-unicorn-gold"
                >
                  <LogOut size={16} className="mr-3" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </aside>

      {/* Mobile sidebar */}
      {showMobileNav && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/70" onClick={closeMobileNav} />
          <div className="fixed top-0 bottom-0 left-0 w-72 bg-unicorn-darkPurple/95 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <Link to="/" className="flex items-center gap-2" onClick={closeMobileNav}>
                <img
                  src="/lovable-uploads/81643525-55e2-47f0-994e-cc903455b959.png"
                  alt="UnicornEnergies Logo"
                  className="h-8 w-8"
                />
                <span className="text-lg font-semibold text-white">
                  <span className="text-unicorn-gold">Unicorn</span>Energies
                </span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeMobileNav}
                className="text-white hover:bg-unicorn-gold/20"
              >
                <X size={18} />
              </Button>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-500 uppercase">General</h4>
                <div className="space-y-1">
                  {isAdmin ? (
                    <>
                      <NavLink
                        href="/admin/dashboard"
                        icon={<Home size={16} />}
                        label="Dashboard"
                        active={location.pathname === "/admin/dashboard"}
                        onClick={closeMobileNav}
                      />
                      <NavLink
                        href="/admin/users"
                        icon={<Users size={16} />}
                        label="Users"
                        active={location.pathname === "/admin/users"}
                        onClick={closeMobileNav}
                      />
                      <NavLink
                        href="/admin/transactions"
                        icon={<CreditCard size={16} />}
                        label="Transactions"
                        active={location.pathname === "/admin/transactions"}
                        onClick={closeMobileNav}
                      />
                    </>
                  ) : (
                    <>
                      <NavLink
                        href="/dashboard"
                        icon={<Home size={16} />}
                        label="Dashboard"
                        active={location.pathname === "/dashboard"}
                        onClick={closeMobileNav}
                      />
                      <NavLink
                        href="/dashboard/transactions"
                        icon={<CreditCard size={16} />}
                        label="Transactions"
                        active={location.pathname === "/dashboard/transactions"}
                        onClick={closeMobileNav}
                      />
                      <NavLink
                        href="/dashboard/investments"
                        icon={<BarChart3 size={16} />}
                        label="Investments"
                        active={location.pathname === "/dashboard/investments"}
                        onClick={closeMobileNav}
                      />
                    </>
                  )}
                </div>
              </div>
              <Separator className="border-unicorn-gold/30" />
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-500 uppercase">Account</h4>
                <div className="space-y-1">
                  <NavLink
                    href={isAdmin ? "/admin/profile" : "/dashboard/profile"}
                    icon={<User size={16} />}
                    label="Profile"
                    active={location.pathname === (isAdmin ? "/admin/profile" : "/dashboard/profile")}
                    onClick={closeMobileNav}
                  />
                  <NavLink
                    href={isAdmin ? "/admin/settings" : "/dashboard/settings"}
                    icon={<Settings size={16} />}
                    label="Settings"
                    active={location.pathname === (isAdmin ? "/admin/settings" : "/dashboard/settings")}
                    onClick={closeMobileNav}
                  />
                  <Button
                    variant="ghost"
                    onClick={handleSignOut}
                    className="w-full justify-start text-gray-300 hover:bg-unicorn-gold/20 hover:text-unicorn-gold"
                  >
                    <LogOut size={16} className="mr-3" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 flex items-center border-b border-unicorn-gold/30 px-6">
          <Button
            variant="ghost"
            className="md:hidden text-white hover:bg-unicorn-gold/20 mr-2"
            onClick={toggleMobileNav}
          >
            <Menu size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-white">
              {isAdmin ? "Admin Dashboard" : "Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <p className="text-sm text-gray-300">Welcome, {user?.email}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-unicorn-gold/80 flex items-center justify-center text-unicorn-black font-bold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
