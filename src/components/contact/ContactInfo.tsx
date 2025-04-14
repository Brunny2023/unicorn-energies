
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-investment-navy mb-6">Contact Information</h2>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <div className="mt-1 p-2 bg-investment-navy/10 rounded-full mr-4">
            <MapPin className="h-5 w-5 text-investment-navy" />
          </div>
          <div>
            <h3 className="font-semibold text-investment-navy mb-1">Our Location</h3>
            <p className="text-gray-600">
              Unicorn Allied Resources Texas<br />
              Branch: Unicorn Energy Inc.<br />
              RR5 Box 181-N, Elgin, TX 78621
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="mt-1 p-2 bg-investment-navy/10 rounded-full mr-4">
            <Phone className="h-5 w-5 text-investment-navy" />
          </div>
          <div>
            <h3 className="font-semibold text-investment-navy mb-1">Phone Number</h3>
            <p className="text-gray-600">+1 (512) 285-7900</p>
            <p className="text-sm text-gray-500">Monday to Friday, 9am to 6pm CST</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="mt-1 p-2 bg-investment-navy/10 rounded-full mr-4">
            <Mail className="h-5 w-5 text-investment-navy" />
          </div>
          <div>
            <h3 className="font-semibold text-investment-navy mb-1">Email Address</h3>
            <p className="text-gray-600">texasunic@gmail.com</p>
            <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="mt-1 p-2 bg-investment-navy/10 rounded-full mr-4">
            <Clock className="h-5 w-5 text-investment-navy" />
          </div>
          <div>
            <h3 className="font-semibold text-investment-navy mb-1">Business Hours</h3>
            <p className="text-gray-600">
              Monday to Friday: 9:00 AM - 6:00 PM<br />
              Saturday: 10:00 AM - 2:00 PM<br />
              Sunday: Closed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
