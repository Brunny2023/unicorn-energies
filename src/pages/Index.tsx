
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import StarsBackground from "@/components/ui/StarsBackground";
import HeroBanner from "@/components/home/HeroBanner";
import AboutSection from "@/components/home/AboutSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import InvestmentPlansSection from "@/components/home/InvestmentPlansSection";
import ProfitCalculatorSection from "@/components/home/ProfitCalculatorSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import CtaSection from "@/components/home/CtaSection";
import Navbar from "@/components/layout/Navbar";
import { setupConsoleFilters } from "@/utils/consoleErrorFilter";

const Index = () => {
  const { user } = useAuth();

  // Set up console filters to reduce noise from extensions and external services
  useEffect(() => {
    setupConsoleFilters();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Stars background with explicit z-index to ensure it's behind content */}
      <div className="fixed inset-0 z-0">
        <StarsBackground />
      </div>
      
      {/* Content with higher z-index to appear above background */}
      <div className="relative z-10">
        {/* Explicitly include the Navbar component here */}
        <Navbar />
        
        <HeroBanner />
        <AboutSection />
        <HowItWorksSection />
        <InvestmentPlansSection />
        <ProfitCalculatorSection />
        <TestimonialsSection />
        <WhyChooseUsSection />
        <CtaSection />
      </div>
      
      {/* Quick access to dashboard for logged in users */}
      {user && (
        <div className="fixed bottom-8 right-8 z-10">
          <Button asChild className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
            <Link to="/dashboard">
              Go to Dashboard
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Index;
