
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const CtaSection = () => {
  return (
    <section className="py-20 md:py-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-unicorn-darkPurple z-0"></div>
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10 z-0"></div>
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-unicorn-purple/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-unicorn-gold/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Sparkles className="h-12 w-12 text-unicorn-gold mx-auto mb-6 animate-pulse-glow" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Secure Your Financial Future with <span className="text-unicorn-gold">Stable Returns</span>?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied investors who have discovered the benefits of strategic energy investments with UnicornEnergies. Start your journey toward financial freedom today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-bold px-8 py-6 text-lg group">
                Create Your Account <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-unicorn-gold text-unicorn-gold hover:bg-unicorn-gold/20 font-bold px-8 py-6 text-lg">
                Contact Our Team
              </Button>
            </Link>
          </div>
          
          {/* Floating unicorn logo */}
          <div className="mt-16 relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-8">
              <div className="relative">
                <div className="absolute inset-0 bg-unicorn-gold/30 rounded-full blur-xl animate-pulse-glow"></div>
                <img 
                  src="/lovable-uploads/81643525-55e2-47f0-994e-cc903455b959.png" 
                  alt="UnicornEnergies" 
                  className="h-16 w-16 relative animate-float"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
