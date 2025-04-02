
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, TrendingUp, Clock } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="heading-lg text-investment-navy mb-6">
              Your Trusted Partner in Energy Market Investments
            </h2>
            <p className="text-gray-700 mb-6">
              At WealthHarbor, we specialize in connecting investors with lucrative opportunities in the oil and gas market. 
              Our team of industry experts meticulously evaluates each investment opportunity to ensure optimal returns while 
              maintaining rigorous risk management protocols.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="bg-investment-gold p-2 rounded-full mr-4 mt-1">
                  <Shield className="h-5 w-5 text-investment-navy" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-investment-navy">Secure & Trusted</h3>
                  <p className="text-gray-600">All investments are backed by tangible assets and secured through legal frameworks that protect your capital.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-investment-gold p-2 rounded-full mr-4 mt-1">
                  <TrendingUp className="h-5 w-5 text-investment-navy" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-investment-navy">Consistent Returns</h3>
                  <p className="text-gray-600">Our investment plans are designed to provide predictable returns regardless of market volatility.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-investment-gold p-2 rounded-full mr-4 mt-1">
                  <Clock className="h-5 w-5 text-investment-navy" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-investment-navy">Transparent Process</h3>
                  <p className="text-gray-600">Know exactly where your money is going and track your investment performance in real-time.</p>
                </div>
              </div>
            </div>
            
            <Link to="/about">
              <Button className="bg-investment-navy hover:bg-investment-lightNavy text-white">
                Learn More About Us <ChevronRight className="ml-1 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                  alt="Oil rig and energy facility" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg border-t-4 border-investment-gold">
                <div className="text-investment-navy font-bold text-2xl">$2.3M</div>
                <div className="text-gray-600">Average Monthly Returns</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
