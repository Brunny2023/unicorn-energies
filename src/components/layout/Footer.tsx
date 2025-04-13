
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const yearsInBusiness = currentYear - 1976;
  
  return (
    <footer className="bg-unicorn-darkPurple border-t border-unicorn-gold/20 text-white relative z-10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/lovable-uploads/81643525-55e2-47f0-994e-cc903455b959.png" 
                alt="UnicornEnergies Logo" 
                className="h-10 w-10" 
              />
              <span className="text-xl font-bold">
                <span className="text-unicorn-gold">Unicorn</span>Energies
              </span>
            </div>
            <p className="text-gray-300 mb-4">
              Your secure harbor for energy market investments since 1976, providing reliable high-income sources while minimizing risks, with global investor access since 2001.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-unicorn-purple p-2 rounded-full hover:bg-unicorn-gold hover:text-unicorn-black transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="bg-unicorn-purple p-2 rounded-full hover:bg-unicorn-gold hover:text-unicorn-black transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="bg-unicorn-purple p-2 rounded-full hover:bg-unicorn-gold hover:text-unicorn-black transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="bg-unicorn-purple p-2 rounded-full hover:bg-unicorn-gold hover:text-unicorn-black transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-unicorn-gold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-unicorn-gold transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-unicorn-gold transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/investment-plans" className="text-gray-300 hover:text-unicorn-gold transition-colors">Investment Plans</Link>
              </li>
              <li>
                <Link to="/calculator" className="text-gray-300 hover:text-unicorn-gold transition-colors">Profit Calculator</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-unicorn-gold transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-unicorn-gold transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-unicorn-gold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-unicorn-gold mr-2 mt-1" />
                <span className="text-gray-300">123 Investment St, Financial District, NY 10004</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-unicorn-gold mr-2" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-unicorn-gold mr-2" />
                <span className="text-gray-300">contact@unicornenergies.com</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-unicorn-gold">Newsletter</h3>
            <p className="text-gray-300 mb-3">Subscribe to our newsletter to get the latest updates.</p>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full p-3 rounded bg-unicorn-purple text-white border border-unicorn-lightPurple focus:border-unicorn-gold focus:outline-none"
              />
              <button
                type="submit"
                className="w-full p-3 bg-unicorn-gold text-unicorn-black font-bold rounded hover:bg-unicorn-darkGold transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-unicorn-purple mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300">© {currentYear} UnicornEnergies. Established 1976. {yearsInBusiness} Years of Excellence. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-5">
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-unicorn-gold text-sm">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-unicorn-gold text-sm">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-unicorn-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute top-10 right-10 w-24 h-24 bg-unicorn-purple/20 rounded-full blur-3xl"></div>
    </footer>
  );
};

export default Footer;
