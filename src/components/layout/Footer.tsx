
import { Link } from 'react-router-dom';
import { CircleDollarSign, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-investment-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <CircleDollarSign className="h-8 w-8 text-investment-gold" />
              <span className="text-xl font-bold">WealthHarbor</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your secure harbor for oil and gas market investments, providing reliable high-income sources while minimizing risks.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-investment-lightNavy p-2 rounded-full hover:bg-investment-gold hover:text-investment-navy transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="bg-investment-lightNavy p-2 rounded-full hover:bg-investment-gold hover:text-investment-navy transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="bg-investment-lightNavy p-2 rounded-full hover:bg-investment-gold hover:text-investment-navy transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="bg-investment-lightNavy p-2 rounded-full hover:bg-investment-gold hover:text-investment-navy transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-investment-gold transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-investment-gold transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/investment-plans" className="text-gray-300 hover:text-investment-gold transition-colors">Investment Plans</Link>
              </li>
              <li>
                <Link to="/calculator" className="text-gray-300 hover:text-investment-gold transition-colors">Profit Calculator</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-investment-gold transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-investment-gold transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-investment-gold mr-2 mt-1" />
                <span className="text-gray-300">123 Investment St, Financial District, NY 10004</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-investment-gold mr-2" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-investment-gold mr-2" />
                <span className="text-gray-300">contact@wealthharbor.com</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-3">Subscribe to our newsletter to get the latest updates.</p>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full p-3 rounded bg-investment-lightNavy text-white border border-investment-lightNavy focus:border-investment-gold focus:outline-none"
              />
              <button
                type="submit"
                className="w-full p-3 bg-investment-gold text-investment-navy font-bold rounded hover:bg-investment-lightGold transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-investment-lightNavy mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300">© {currentYear} WealthHarbor. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-5">
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-investment-gold text-sm">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-investment-gold text-sm">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
