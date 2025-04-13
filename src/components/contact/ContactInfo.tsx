
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactInfo = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-investment-navy mb-6">Contact Information</h2>
      
      <div className="bg-investment-gray p-8 rounded-lg mb-8">
        <div className="space-y-6">
          <div className="flex">
            <div className="bg-investment-gold rounded-full p-3 mr-4 flex-shrink-0">
              <Mail className="h-6 w-6 text-investment-navy" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-investment-navy">Email Us</h3>
              <p className="text-gray-600 mb-1">For general inquiries:</p>
              <a href="mailto:info@unicorn-energies.com" className="text-investment-lightNavy hover:underline">info@unicorn-energies.com</a>
              <p className="text-gray-600 mt-2 mb-1">For support:</p>
              <a href="mailto:support@unicorn-energies.com" className="text-investment-lightNavy hover:underline">support@unicorn-energies.com</a>
            </div>
          </div>
          
          <div className="flex">
            <div className="bg-investment-gold rounded-full p-3 mr-4 flex-shrink-0">
              <Phone className="h-6 w-6 text-investment-navy" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-investment-navy">Call Us</h3>
              <p className="text-gray-600 mb-1">Main Office:</p>
              <a href="tel:+12125551234" className="text-investment-lightNavy hover:underline">+1 (212) 555-1234</a>
              <p className="text-gray-600 mt-2 mb-1">Support Hotline:</p>
              <a href="tel:+18448889123" className="text-investment-lightNavy hover:underline">+1 (844) 888-9123</a>
            </div>
          </div>
          
          <div className="flex">
            <div className="bg-investment-gold rounded-full p-3 mr-4 flex-shrink-0">
              <MapPin className="h-6 w-6 text-investment-navy" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-investment-navy">Visit Us</h3>
              <p className="text-gray-600">
                123 Investment Street<br />
                Financial District<br />
                New York, NY 10004<br />
                United States
              </p>
              <p className="text-gray-600 mt-3">
                <strong>Texas Branch:</strong><br />
                Unicorn Energies Allied Resources<br />
                Unicorn Energy Inc<br />
                RR5 Box 181-N<br />
                Elgin, TX 78621
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-investment-navy text-white p-8 rounded-lg">
        <div className="flex items-start">
          <div className="bg-investment-gold rounded-full p-3 mr-4 flex-shrink-0">
            <MessageCircle className="h-6 w-6 text-investment-navy" />
          </div>
          <div>
            <h3 className="font-bold text-xl mb-3">Live Support</h3>
            <p className="text-gray-300 mb-4">
              Our customer support team is available 24/7 to assist you. Get instant help through our live chat service.
            </p>
            <Button className="bg-investment-gold hover:bg-investment-lightGold text-investment-navy">
              Start Live Chat
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
