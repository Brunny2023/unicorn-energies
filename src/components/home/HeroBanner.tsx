
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroBanner = () => {
  return (
    <section className="hero-gradient text-white py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="heading-xl mb-6 animate-fade-in">
            Secure Your Financial Future with Strategic Oil & Gas Investments
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-slide-up">
            WealthHarbor offers carefully vetted investment opportunities in the energy sector, designed to provide steady returns with minimized risk.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link to="/investment-plans">
              <Button size="lg" className="bg-investment-gold hover:bg-investment-lightGold text-investment-navy font-bold px-8 py-6 text-lg">
                Explore Investment Plans <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/calculator">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold px-8 py-6 text-lg">
                Calculate Potential Returns
              </Button>
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="font-bold text-4xl text-investment-gold">$250M+</div>
              <div className="text-gray-200">Assets Under Management</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-4xl text-investment-gold">15K+</div>
              <div className="text-gray-200">Satisfied Investors</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-4xl text-investment-gold">6+ Years</div>
              <div className="text-gray-200">Industry Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
