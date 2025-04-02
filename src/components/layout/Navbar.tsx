
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { CircleDollarSign, ChevronDown, Menu, X } from 'lucide-react';

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link 
    to={to} 
    className="text-investment-navy hover:text-investment-gold transition-colors px-3 py-2"
  >
    {children}
  </Link>
);

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <CircleDollarSign className="h-8 w-8 text-investment-gold" />
            <span className="text-2xl font-bold text-investment-navy">WealthHarbor</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <div className="relative group">
              <button className="text-investment-navy hover:text-investment-gold transition-colors px-3 py-2 flex items-center">
                Investments <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md hidden group-hover:block">
                <Link to="/investment-plans" className="block px-4 py-2 text-investment-navy hover:bg-investment-gray hover:text-investment-gold">Investment Plans</Link>
                <Link to="/calculator" className="block px-4 py-2 text-investment-navy hover:bg-investment-gray hover:text-investment-gold">Profit Calculator</Link>
              </div>
            </div>
            <NavLink to="/how-it-works">How It Works</NavLink>
            <NavLink to="/faq">FAQ</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" className="border-investment-navy text-investment-navy hover:bg-investment-navy hover:text-white">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-investment-gold hover:bg-investment-lightGold text-investment-navy">
                Register
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-investment-navy"
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
            <Link to="/" className="block py-2 px-4 text-investment-navy hover:bg-investment-gray rounded-md" onClick={toggleMobileMenu}>Home</Link>
            <Link to="/about" className="block py-2 px-4 text-investment-navy hover:bg-investment-gray rounded-md" onClick={toggleMobileMenu}>About Us</Link>
            <Link to="/investment-plans" className="block py-2 px-4 text-investment-navy hover:bg-investment-gray rounded-md" onClick={toggleMobileMenu}>Investment Plans</Link>
            <Link to="/calculator" className="block py-2 px-4 text-investment-navy hover:bg-investment-gray rounded-md" onClick={toggleMobileMenu}>Profit Calculator</Link>
            <Link to="/how-it-works" className="block py-2 px-4 text-investment-navy hover:bg-investment-gray rounded-md" onClick={toggleMobileMenu}>How It Works</Link>
            <Link to="/faq" className="block py-2 px-4 text-investment-navy hover:bg-investment-gray rounded-md" onClick={toggleMobileMenu}>FAQ</Link>
            <Link to="/contact" className="block py-2 px-4 text-investment-navy hover:bg-investment-gray rounded-md" onClick={toggleMobileMenu}>Contact</Link>
            <div className="pt-2 grid grid-cols-2 gap-2">
              <Link to="/login">
                <Button variant="outline" className="w-full border-investment-navy text-investment-navy">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="w-full bg-investment-gold text-investment-navy">Register</Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
