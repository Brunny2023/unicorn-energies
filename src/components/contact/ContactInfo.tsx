
import { Mail, MapPin, Phone } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="lg:pl-8">
      <h2 className="text-3xl font-bold text-investment-navy mb-6">Contact Information</h2>
      <div className="space-y-8">
        <div className="flex items-start">
          <Mail className="text-investment-gold h-6 w-6 mr-4 mt-1" />
          <div>
            <h3 className="font-semibold text-lg text-investment-navy">Email Us</h3>
            <p className="text-gray-600 mt-1">
              <a href="mailto:info@unicorn-energies.com" className="hover:text-investment-gold">
                info@unicorn-energies.com
              </a>
            </p>
            <p className="text-gray-600 mt-1">
              <a href="mailto:support@unicorn-energies.com" className="hover:text-investment-gold">
                support@unicorn-energies.com
              </a>
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Phone className="text-investment-gold h-6 w-6 mr-4 mt-1" />
          <div>
            <h3 className="font-semibold text-lg text-investment-navy">Call Us</h3>
            <p className="text-gray-600 mt-1">
              <a href="tel:+15127894567" className="hover:text-investment-gold">
                +1 (512) 789-4567
              </a>
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <MapPin className="text-investment-gold h-6 w-6 mr-4 mt-1" />
          <div>
            <h3 className="font-semibold text-lg text-investment-navy">Visit Us</h3>
            <div className="text-gray-600 mt-1">
              <p>Unicorn Energies Headquarters</p>
              <p>1234 Energy Way, Houston, TX 77002</p>
              <p className="mt-4">Texas Branch:</p>
              <p>Unicorn Energy Inc</p>
              <p>RR5 Box 181-N, Elgin, TX 78621</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
