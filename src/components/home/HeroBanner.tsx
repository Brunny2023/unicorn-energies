
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroBanner = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-unicorn-black via-unicorn-darkPurple to-[#374146]">
      {/* Oil-themed glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#2F4858]/20 rounded-full blur-3xl"></div>
      <div className="absolute top-[30%] right-[20%] w-56 h-56 bg-[#D4B24C]/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-[20%] left-[25%] w-40 h-40 bg-[#4A3F35]/20 rounded-full blur-xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/81643525-55e2-47f0-994e-cc903455b959.png" 
              alt="UnicornEnergies Logo" 
              className="w-24 h-24 animate-float"
            />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-[#F3D77F] via-[#D4AD3A] to-[#9A7D2E] bg-clip-text text-transparent">Premium</span> Energy Investments
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-slide-up">
            UnicornEnergies offers carefully vetted investment opportunities in the energy sector, designed to provide steady returns with minimized risk.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
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
          <div className="mt-12 flex flex-wrap justify-center gap-8 animate-slide-up" style={{ animationDelay: "0.4s" }}>
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
