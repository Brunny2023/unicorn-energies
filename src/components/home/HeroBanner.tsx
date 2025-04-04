
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';

const HeroBanner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays properly on mount with better error handling
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Video playback failed:", error);
          // Try to reload the video on error
          if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play().catch(e => console.error("Second attempt failed:", e));
          }
        });
      }
    }
  }, []);

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Animated oil pouring effect */}
      <div className="absolute top-0 left-0 w-full h-full z-0 opacity-30 pointer-events-none">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1566808062778-6e65c18c34c5?auto=format&fit=crop&w=1200&q=80"
          preload="auto"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-dripping-dark-oil-612-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Glowing effect behind the content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-unicorn-gold/10 rounded-full blur-3xl"></div>
      
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
            <span className="bg-gradient-to-r from-unicorn-gold to-unicorn-darkGold bg-clip-text text-transparent">Futuristic</span> Energy Investments
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-slide-up">
            UnicornEnergies offers carefully vetted investment opportunities in the energy sector, designed to provide steady returns with minimized risk.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link to="/investment-plans">
              <Button size="lg" className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-bold px-8 py-6 text-lg group">
                Explore Investment Plans 
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/calculator">
              <Button size="lg" variant="outline" className="border-unicorn-gold text-unicorn-gold hover:bg-unicorn-gold/20 font-bold px-8 py-6 text-lg">
                <Sparkles className="w-5 h-5 mr-2" /> Calculate Potential Returns
              </Button>
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="font-bold text-4xl text-unicorn-gold animate-pulse-glow">$250M+</div>
              <div className="text-gray-200">Assets Under Management</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-4xl text-unicorn-gold animate-pulse-glow" style={{ animationDelay: "0.2s" }}>15K+</div>
              <div className="text-gray-200">Satisfied Investors</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-4xl text-unicorn-gold animate-pulse-glow" style={{ animationDelay: "0.4s" }}>6+ Years</div>
              <div className="text-gray-200">Industry Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
