
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Home, 
  LineChart, 
  CreditCard, 
  Users, 
  History, 
  BarChart3, 
  LogOut, 
  ChevronDown, 
  ChevronRight,
  Menu,
  X,
  MessageSquareText
} from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive: boolean;
  adminOnly?: boolean;
  isAdmin: boolean;
}

const NavItem = ({ icon, label, to, isActive, adminOnly = false, isAdmin }: NavItemProps) => {
  if (adminOnly && !isAdmin) return null;
  
  return (
    <Link to={to}>
      <div 
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
          isActive 
            ? 'bg-unicorn-gold/20 text-unicorn-gold' 
            : 'text-gray-300 hover:bg-unicorn-purple/20 hover:text-unicorn-gold'
        }`}
      >
        {icon}
        <span className="font-medium">{label}</span>
        {isActive && (
          <div className="ml-auto">
            <ChevronRight className="h-5 w-5" />
          </div>
        )}
      </div>
    </Link>
  );
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  const isActive = (path: string) => {
    if (path === '/dashboard' || path === '/admin/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-unicorn-black to-unicorn-darkPurple">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold text-white">Dashboard</h1>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
          
          {/* Sidebar Navigation */}
          <div className={`md:w-64 flex-shrink-0 ${mobileMenuOpen ? 'block' : 'hidden md:block'}`}>
            <div className="bg-unicorn-darkPurple/80 backdrop-blur-lg rounded-xl border border-unicorn-gold/20 p-4 sticky top-24">
              {/* User Section */}
              <div className="pb-4 mb-4 border-b border-unicorn-gold/20">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-unicorn-gold/80 flex items-center justify-center text-unicorn-black font-bold">
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-white font-medium truncate">{user?.email}</div>
                    <div className="text-xs text-gray-400">{isAdmin ? 'Administrator' : 'Investor'}</div>
                  </div>
                </div>
              </div>
              
              {/* Nav Links */}
              <nav className="space-y-1">
                <NavItem 
                  icon={<Home className="h-5 w-5" />} 
                  label="Dashboard" 
                  to={isAdmin ? "/admin/dashboard" : "/dashboard"} 
                  isActive={isActive(isAdmin ? "/admin/dashboard" : "/dashboard")}
                  isAdmin={isAdmin}
                />
                
                {!isAdmin && (
                  <>
                    <NavItem 
                      icon={<LineChart className="h-5 w-5" />} 
                      label="Investments" 
                      to="/dashboard/investments" 
                      isActive={isActive("/dashboard/investments")}
                      isAdmin={isAdmin}
                    />
                    <NavItem 
                      icon={<CreditCard className="h-5 w-5" />} 
                      label="Withdraw" 
                      to="/dashboard/withdraw" 
                      isActive={isActive("/dashboard/withdraw")}
                      isAdmin={isAdmin}
                    />
                    <NavItem 
                      icon={<MessageSquareText className="h-5 w-5" />} 
                      label="Support Tickets" 
                      to="/dashboard/tickets" 
                      isActive={isActive("/dashboard/tickets")}
                      isAdmin={isAdmin}
                    />
                  </>
                )}
                
                {isAdmin && (
                  <>
                    <NavItem 
                      icon={<Users className="h-5 w-5" />} 
                      label="Users" 
                      to="/admin/users" 
                      isActive={isActive("/admin/users")}
                      adminOnly
                      isAdmin={isAdmin}
                    />
                    <NavItem 
                      icon={<History className="h-5 w-5" />} 
                      label="Transactions" 
                      to="/admin/transactions" 
                      isActive={isActive("/admin/transactions")}
                      adminOnly
                      isAdmin={isAdmin}
                    />
                    <NavItem 
                      icon={<MessageSquareText className="h-5 w-5" />} 
                      label="Support Tickets" 
                      to="/admin/tickets" 
                      isActive={isActive("/admin/tickets")}
                      adminOnly
                      isAdmin={isAdmin}
                    />
                  </>
                )}
              </nav>
              
              {/* Logout Button */}
              <div className="pt-4 mt-4 border-t border-unicorn-gold/20">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-400 hover:text-white hover:bg-unicorn-purple/20"
                  onClick={() => signOut()}
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DashboardLayout;
