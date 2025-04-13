
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, TrendingUp, Shield, BarChart } from 'lucide-react';

const HeroBanner = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Stars effect for the hero section */}
      <div className="absolute inset-0 bg-gradient-to-br from-unicorn-black via-unicorn-darkPurple to-[#374146]">
        {/* Individual animated stars */}
        <div className="stars-container absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            />
          ))}
          
          {/* Shooting stars */}
          <div className="shooting-star" style={{ animationDuration: '2.5s' }}></div>
          <div className="shooting-star" style={{ animationDelay: '1.5s', animationDuration: '3s' }}></div>
          <div className="shooting-star" style={{ animationDelay: '3s', animationDuration: '2.2s' }}></div>
        </div>
      </div>
      
      {/* Oil-themed glow effects - lowering z-index to prevent overlaps */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#2F4858]/20 rounded-full blur-3xl z-0"></div>
      <div className="absolute top-[30%] right-[20%] w-56 h-56 bg-[#D4B24C]/10 rounded-full blur-2xl z-0"></div>
      <div className="absolute bottom-[20%] left-[25%] w-40 h-40 bg-[#4A3F35]/20 rounded-full blur-xl z-0"></div>
      
      <div className="container mx-auto px-4 relative z-40">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/81643525-55e2-47f0-994e-cc903455b959.png" 
              alt="UnicornEnergies Logo" 
              className="w-24 h-24 animate-float"
            />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in relative z-10">
            <span className="bg-gradient-to-r from-[#F3D77F] via-[#D4AD3A] to-[#9A7D2E] bg-clip-text text-transparent">Premium</span> Energy Investments
          </h1>
          
          {/* Enhanced paragraph with stronger background and higher z-index */}
          <div className="relative mb-8 z-50">
            {/* Semi-opaque background with blur for better text visibility */}
            <div className="absolute inset-0 bg-unicorn-darkPurple/80 backdrop-blur-md rounded-lg shadow-xl border border-unicorn-gold/20"></div>
            <p className="text-xl md:text-2xl text-gray-200 relative z-10 p-5 rounded-lg">
              Harness the power of cutting-edge energy markets with UnicornEnergies' exclusive investment portfolios. Our carefully vetted opportunities deliver industry-leading returns while supporting the future of sustainable energy.
            </p>
          </div>
          
          {/* Investment highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 relative z-30">
            <div className="bg-unicorn-darkPurple/50 border border-unicorn-gold/30 rounded-lg p-6 transform transition-all hover:scale-105">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-unicorn-gold/20 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-unicorn-gold" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-unicorn-gold mb-2">High ROI</h3>
              <p className="text-gray-300">Average returns of 12-18% annually across our diverse energy portfolio</p>
            </div>
            
            <div className="bg-unicorn-darkPurple/50 border border-unicorn-gold/30 rounded-lg p-6 transform transition-all hover:scale-105">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-unicorn-gold/20 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-unicorn-gold" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-unicorn-gold mb-2">Risk Managed</h3>
              <p className="text-gray-300">Vetted investment opportunities with strategic risk mitigation protocols</p>
            </div>
            
            <div className="bg-unicorn-darkPurple/50 border border-unicorn-gold/30 rounded-lg p-6 transform transition-all hover:scale-105">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-unicorn-gold/20 flex items-center justify-center">
                  <BarChart className="h-6 w-6 text-unicorn-gold" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-unicorn-gold mb-2">Diversified Assets</h3>
              <p className="text-gray-300">Balanced portfolios across traditional and renewable energy markets</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up relative z-30" style={{ animationDelay: "0.2s" }}>
            <Link to="/investment-plans">
              <Button size="lg" className="bg-[#D4AD3A] hover:bg-[#9A7D2E] text-unicorn-black font-bold px-8 py-6 text-lg group">
                Explore Investment Plans 
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/calculator">
              <Button size="lg" variant="outline" className="border-[#D4AD3A] text-[#D4AD3A] hover:bg-[#D4AD3A]/20 font-bold px-8 py-6 text-lg">
                <Sparkles className="w-5 h-5 mr-2" /> Calculate Potential Returns
              </Button>
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8 animate-slide-up relative z-30" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="font-bold text-4xl text-[#D4AD3A] animate-pulse-glow">$250M+</div>
              <div className="text-gray-200">Assets Under Management</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-4xl text-[#D4AD3A] animate-pulse-glow" style={{ animationDelay: "0.2s" }}>15K+</div>
              <div className="text-gray-200">Satisfied Investors</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-4xl text-[#D4AD3A] animate-pulse-glow" style={{ animationDelay: "0.4s" }}>20+ Years</div>
              <div className="text-gray-200">Industry Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
