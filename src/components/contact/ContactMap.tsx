
import { MapPin } from 'lucide-react';

const ContactMap = () => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="aspect-w-16 aspect-h-9 h-96 bg-gray-300 rounded-lg overflow-hidden">
            {/* In a real application, this would be a map iframe */}
            <div className="w-full h-full flex items-center justify-center bg-investment-gray">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-investment-gold mx-auto mb-3" />
                <p className="text-investment-navy text-lg font-medium">Map Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMap;
