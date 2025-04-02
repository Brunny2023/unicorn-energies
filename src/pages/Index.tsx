
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/home/HeroBanner";
import AboutSection from "@/components/home/AboutSection";
import InvestmentPlansSection from "@/components/home/InvestmentPlansSection";
import ProfitCalculatorSection from "@/components/home/ProfitCalculatorSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CtaSection from "@/components/home/CtaSection";
import StarsBackground from "@/components/ui/StarsBackground";

// Add CSS for animations
const styles = `
  @keyframes twinkle {
    0% {
      opacity: 0.3;
      transform: scale(0.8);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
    100% {
      opacity: 0.3;
      transform: scale(0.8);
    }
  }
  
  @keyframes pulse-glow {
    0% {
      opacity: 0.5;
      transform: scale(0.95);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.05);
    }
    100% {
      opacity: 0.5;
      transform: scale(0.95);
    }
  }
  
  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  
  @keyframes shooting-star {
    0% {
      transform: translateX(0) translateY(0) rotate(315deg);
      opacity: 1;
    }
    70% {
      opacity: 1;
    }
    100% {
      transform: translateX(-500px) translateY(500px) rotate(315deg);
      opacity: 0;
    }
  }
  
  .animate-twinkle {
    animation: twinkle 2s ease-in-out infinite;
  }
  
  .animate-pulse-glow {
    animation: pulse-glow 4s ease-in-out infinite;
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-fade-in {
    animation: fadeIn 1s ease-in-out;
  }
  
  .animate-slide-up {
    animation: slideUp 0.8s ease-in-out;
  }
  
  .shooting-star {
    position: absolute;
    width: 100px;
    height: 1px;
    background: linear-gradient(to right, transparent, #ffffff, transparent);
    top: 20%;
    right: 0;
    opacity: 0.8;
    transform-origin: right;
    animation: shooting-star 4s linear infinite;
  }
  
  .glow-text {
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  }
  
  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: rgba(255, 215, 0, 0.6);
    box-shadow: 0 0 10px 2px rgba(255, 215, 0, 0.4);
    animation: float 3s ease-in-out infinite;
    top: 50%;
    left: 50%;
  }
  
  .stars-container .particle:nth-child(1) { top: 20%; left: 10%; }
  .stars-container .particle:nth-child(2) { top: 40%; left: 25%; }
  .stars-container .particle:nth-child(3) { top: 70%; left: 35%; }
  .stars-container .particle:nth-child(4) { top: 30%; left: 65%; }
  .stars-container .particle:nth-child(5) { top: 65%; left: 75%; }
  .stars-container .particle:nth-child(6) { top: 15%; left: 85%; }
  .stars-container .particle:nth-child(7) { top: 50%; left: 90%; }
  .stars-container .particle:nth-child(8) { top: 80%; left: 15%; }
`;

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <style>{styles}</style>
      <StarsBackground />
      <Navbar />
      <main className="relative z-10">
        <HeroBanner />
        <AboutSection />
        <InvestmentPlansSection />
        <ProfitCalculatorSection />
        <WhyChooseUsSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
