
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, TrendingUp, Clock } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-unicorn-black/50 z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        {/* About the company */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              <span className="text-unicorn-gold">UnicornEnergies:</span> Your Energy Investment Partner
            </h2>
            <p className="text-gray-200 mb-6">
              We are an international Oil and Gas Investment Company financial company in activities which are related 
              to trading in the oil and gas markets globally, and performed by qualified professionals.
            </p>
            <p className="text-gray-200 mb-6">
              Our goal is to provide our investors with a reliable source of high income, while minimizing any possible risks 
              and offering high-quality services, allowing us to automate and simplify the relations between the investors and 
              the trustees. We work towards increasing your profit margin by profitable investments. We look forward to you 
              being part of our satisfied community.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="bg-unicorn-gold p-2 rounded-full mr-4 mt-1">
                  <Shield className="h-5 w-5 text-unicorn-black" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-unicorn-gold">Secure & Trusted</h3>
                  <p className="text-gray-300">All investments are backed by tangible assets and secured through legal frameworks that protect your capital.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-unicorn-gold p-2 rounded-full mr-4 mt-1">
                  <TrendingUp className="h-5 w-5 text-unicorn-black" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-unicorn-gold">Consistent Returns</h3>
                  <p className="text-gray-300">Our investment plans are designed to provide predictable returns regardless of market volatility.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-unicorn-gold p-2 rounded-full mr-4 mt-1">
                  <Clock className="h-5 w-5 text-unicorn-black" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-unicorn-gold">Transparent Process</h3>
                  <p className="text-gray-300">Know exactly where your money is going and track your investment performance in real-time.</p>
                </div>
              </div>
            </div>
            
            <Link to="/about">
              <Button className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-bold group text-lg px-8 py-6">
                Learn More About Us <ChevronRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="relative rounded-lg overflow-hidden shadow-2xl border border-unicorn-gold/30">
                {/* Fancy border effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-unicorn-gold to-unicorn-purple rounded-lg blur-sm"></div>
                
                <img 
                  src="/lovable-uploads/dd9f21c4-5efd-4b78-afb7-e40eed48b069.png" 
                  alt="Oil refinery at night" 
                  className="w-full h-auto relative rounded-lg"
                  onError={(e) => {
                    // Fallback if main image fails to load
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // Prevent infinite loop
                    target.src = "https://images.unsplash.com/photo-1536924430914-91f9e2041b83?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"; // Oil rig fallback
                  }}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-unicorn-darkPurple p-6 rounded-lg border-t-4 border-unicorn-gold shadow-xl">
                <div className="text-unicorn-gold font-bold text-2xl">$2.3M</div>
                <div className="text-gray-300">Average Monthly Returns</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Team members */}
        <div className="pt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-2">
            Our <span className="text-unicorn-gold">Expert</span> Team
          </h2>
          <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
            Meet the visionaries behind UnicornEnergies who are revolutionizing the energy investment landscape
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* CEO */}
            <div className="bg-unicorn-darkPurple/60 backdrop-blur-sm rounded-lg p-6 border border-unicorn-gold/30 transform hover:-translate-y-2 transition-all duration-300">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-unicorn-gold/20 animate-pulse-glow"></div>
                <img 
                  src="/lovable-uploads/a10abe11-3377-45bf-a732-8d2972836f41.png" 
                  alt="CEO" 
                  className="w-full h-full object-cover rounded-full border-2 border-unicorn-gold relative"
                />
              </div>
              <h3 className="text-xl font-bold text-unicorn-gold text-center">Callie Mcdowell</h3>
              <p className="text-white text-center mb-2">CEO & Founder</p>
              <p className="text-gray-300 text-center text-sm">
                With over 15 years of experience in energy markets, Callie leads our strategic vision and investment strategies.
              </p>
            </div>
            
            {/* CTO */}
            <div className="bg-unicorn-darkPurple/60 backdrop-blur-sm rounded-lg p-6 border border-unicorn-gold/30 transform hover:-translate-y-2 transition-all duration-300">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-unicorn-gold/20 animate-pulse-glow" style={{ animationDelay: "0.3s" }}></div>
                <img 
                  src="/lovable-uploads/b8410457-4c89-43b3-89f0-3c247a2aa968.png" 
                  alt="CTO" 
                  className="w-full h-full object-cover rounded-full border-2 border-unicorn-gold relative"
                />
              </div>
              <h3 className="text-xl font-bold text-unicorn-gold text-center">Marcia Weeks</h3>
              <p className="text-white text-center mb-2">CTO</p>
              <p className="text-gray-300 text-center text-sm">
                A tech innovator implementing cutting-edge security and blockchain solutions for our investment platform.
              </p>
            </div>
            
            {/* Investment Manager */}
            <div className="bg-unicorn-darkPurple/60 backdrop-blur-sm rounded-lg p-6 border border-unicorn-gold/30 transform hover:-translate-y-2 transition-all duration-300">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-unicorn-gold/20 animate-pulse-glow" style={{ animationDelay: "0.6s" }}></div>
                <img 
                  src="/lovable-uploads/8ecaf4a4-121a-4581-ab3d-ee5c7bf6f78b.png" 
                  alt="Investment Manager" 
                  className="w-full h-full object-cover rounded-full border-2 border-unicorn-gold relative"
                />
              </div>
              <h3 className="text-xl font-bold text-unicorn-gold text-center">Upton Blair</h3>
              <p className="text-white text-center mb-2">Investment Manager</p>
              <p className="text-gray-300 text-center text-sm">
                A financial expert with a proven track record of identifying high-return energy investment opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
