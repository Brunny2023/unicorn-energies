
import React, { ReactNode, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { signOut } from "@/contexts/auth/authActions";
import { useToast } from "@/hooks/use-toast";
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
  Bell,
  User,
  Sun,
  Moon,
  HelpCircle,
} from "lucide-react";
import StarsBackground from "@/components/ui/StarsBackground";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardLayoutProps {
  children: ReactNode;
  isAdmin?: boolean;
}

const DashboardLayout = ({ children, isAdmin = false }: DashboardLayoutProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);

  const handleSignOut = async () => {
    await signOut({ toast, navigate });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real implementation, this would toggle the theme
  };

  const formatTimeGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
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

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <StarsBackground />

      {/* Top Navigation Bar (Mobile & Desktop) */}
      <header className="sticky top-0 z-50 w-full border-b border-unicorn-gold/30 bg-unicorn-darkPurple/95 backdrop-blur-sm">
        <div className="flex h-16 items-center px-4 md:px-6">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="mr-2 text-white md:hidden"
            onClick={toggleMenu}
          >
            <Menu className="h-6 w-6" />
          </Button>
          
          {/* Logo - Only visible on mobile when sidebar is hidden */}
          <Link to="/" className="md:hidden flex items-center text-2xl font-bold text-white">
            UnicornVest
          </Link>
          
          <div className="ml-auto flex items-center gap-4">
            {/* Theme Toggle */}
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hidden md:flex"
              onClick={toggleDarkMode}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-white">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-unicorn-gold rounded-full"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-unicorn-darkPurple/95 border-unicorn-gold/30 text-white">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-unicorn-gold/20" />
                <div className="max-h-96 overflow-auto">
                  <div className="p-3 hover:bg-unicorn-purple/20 cursor-pointer border-l-2 border-unicorn-gold">
                    <div className="text-sm font-medium">New investment return</div>
                    <div className="text-xs text-gray-400">Your Gold plan generated $25 today</div>
                    <div className="text-xs text-gray-500 mt-1">2 hours ago</div>
                  </div>
                  <div className="p-3 hover:bg-unicorn-purple/20 cursor-pointer">
                    <div className="text-sm font-medium">Withdrawal processed</div>
                    <div className="text-xs text-gray-400">Your withdrawal request has been approved</div>
                    <div className="text-xs text-gray-500 mt-1">Yesterday</div>
                  </div>
                  <div className="p-3 hover:bg-unicorn-purple/20 cursor-pointer">
                    <div className="text-sm font-medium">New promotion</div>
                    <div className="text-xs text-gray-400">Platinum plan now offers 1.8% daily returns!</div>
                    <div className="text-xs text-gray-500 mt-1">3 days ago</div>
                  </div>
                </div>
                <DropdownMenuSeparator className="bg-unicorn-gold/20" />
                <DropdownMenuItem className="text-center cursor-pointer text-unicorn-gold">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="User menu">
                  <Avatar className="h-8 w-8 border border-unicorn-gold/50">
                    <AvatarFallback className="bg-unicorn-purple text-white">
                      {user?.email ? getInitials(user.email) : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-unicorn-darkPurple/95 border-unicorn-gold/30 text-white">
                <DropdownMenuLabel>
                  <div className="font-normal text-xs text-gray-400">{formatTimeGreeting()}</div>
                  <div className="font-semibold">{user?.email || "User"}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-unicorn-gold/20" />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help & Support
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-unicorn-gold/20" />
                <DropdownMenuItem className="cursor-pointer text-red-400" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Sidebar (always visible on larger screens) */}
      <aside
        className={`fixed z-40 top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-unicorn-darkPurple/90 border-r border-unicorn-gold/30 overflow-y-auto transition-transform transform md:translate-x-0 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:top-0 md:block`}
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
          <div className="p-3 rounded-lg bg-unicorn-gold/10 border border-unicorn-gold/20">
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

        <div className="px-6 py-6 mt-auto">
          <div className="p-4 rounded-lg bg-unicorn-gold/5 border border-unicorn-gold/10">
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

      {/* Main Content */}
      <main className="flex-1 md:pl-64 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
