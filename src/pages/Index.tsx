
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

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
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
