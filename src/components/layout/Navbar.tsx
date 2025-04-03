
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { CircleDollarSign, ChevronDown, Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link 
    to={to} 
    className="text-white hover:text-unicorn-gold transition-colors px-3 py-2"
  >
    {children}
  </Link>
);

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut, isAdmin } = useAuth();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 bg-unicorn-darkPurple/80 backdrop-blur-lg border-b border-unicorn-gold/20 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/81643525-55e2-47f0-994e-cc903455b959.png" 
              alt="UnicornEnergies Logo" 
              className="h-10 w-10" 
            />
            <span className="text-2xl font-bold text-white">
              <span className="text-unicorn-gold">Unicorn</span>Energies
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <div className="relative group">
              <button className="text-white hover:text-unicorn-gold transition-colors px-3 py-2 flex items-center">
                Investments <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-unicorn-darkPurple/90 backdrop-blur-lg border border-unicorn-gold/20 shadow-lg rounded-md hidden group-hover:block">
                <Link to="/investment-plans" className="block px-4 py-2 text-white hover:bg-unicorn-purple/30 hover:text-unicorn-gold">Investment Plans</Link>
                <Link to="/calculator" className="block px-4 py-2 text-white hover:bg-unicorn-purple/30 hover:text-unicorn-gold">Profit Calculator</Link>
              </div>
            </div>
            <NavLink to="/how-it-works">How It Works</NavLink>
            <NavLink to="/faq">FAQ</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full flex items-center justify-center border border-unicorn-gold/30">
                    <span className="h-8 w-8 rounded-full bg-unicorn-gold/80 flex items-center justify-center text-unicorn-black font-bold">
                      {user.email?.charAt(0).toUpperCase()}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-unicorn-darkPurple/90 backdrop-blur-lg border border-unicorn-gold/30 text-white" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium text-white">Account</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-unicorn-gold/20" />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link to={isAdmin ? "/admin/dashboard" : "/dashboard"} className="flex items-center cursor-pointer hover:bg-unicorn-gold/20">
                        <User className="mr-2 h-4 w-4" />
                        <span>{isAdmin ? "Admin Dashboard" : "Dashboard"}</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-unicorn-gold/20" />
                  <DropdownMenuItem 
                    className="cursor-pointer hover:bg-unicorn-gold/20"
                    onClick={() => signOut()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-unicorn-gold text-unicorn-gold hover:bg-unicorn-gold/20">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden pt-4 pb-3 space-y-1">
            <Link to="/" className="block py-2 px-4 text-white hover:bg-unicorn-purple/30 hover:text-unicorn-gold rounded-md">Home</Link>
            <Link to="/about" className="block py-2 px-4 text-white hover:bg-unicorn-purple/30 hover:text-unicorn-gold rounded-md">About Us</Link>
            <Link to="/investment-plans" className="block py-2 px-4 text-white hover:bg-unicorn-purple/30 hover:text-unicorn-gold rounded-md">Investment Plans</Link>
            <Link to="/calculator" className="block py-2 px-4 text-white hover:bg-unicorn-purple/30 hover:text-unicorn-gold rounded-md">Profit Calculator</Link>
            <Link to="/how-it-works" className="block py-2 px-4 text-white hover:bg-unicorn-purple/30 hover:text-unicorn-gold rounded-md">How It Works</Link>
            <Link to="/faq" className="block py-2 px-4 text-white hover:bg-unicorn-purple/30 hover:text-unicorn-gold rounded-md">FAQ</Link>
            <Link to="/contact" className="block py-2 px-4 text-white hover:bg-unicorn-purple/30 hover:text-unicorn-gold rounded-md">Contact</Link>
            
            {user ? (
              <div className="pt-2 grid grid-cols-2 gap-2">
                <Link to={isAdmin ? "/admin/dashboard" : "/dashboard"} className="col-span-1">
                  <Button variant="outline" className="w-full border-unicorn-gold text-unicorn-gold">
                    {isAdmin ? "Admin Panel" : "Dashboard"}
                  </Button>
                </Link>
                <Button 
                  onClick={() => signOut()} 
                  className="w-full bg-unicorn-gold text-unicorn-black col-span-1"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="pt-2 grid grid-cols-2 gap-2">
                <Link to="/login" className="col-span-1">
                  <Button variant="outline" className="w-full border-unicorn-gold text-unicorn-gold">Login</Button>
                </Link>
                <Link to="/register" className="col-span-1">
                  <Button className="w-full bg-unicorn-gold text-unicorn-black">Register</Button>
                </Link>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
