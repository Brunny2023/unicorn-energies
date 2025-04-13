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

const ServiceHighlights = () => {
  return (
    <div className="relative z-10 py-10 bg-gradient-to-b from-unicorn-black/60 to-unicorn-darkPurple/60">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-unicorn-gold mb-10">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            { text: "We Sell Shares", icon: "💰" },
            { text: "We Grant Loans", icon: "💵" },
            { text: "We Trade", icon: "📈" },
            { text: "We Give Profits", icon: "🌟" },
          ].map((item, index) => (
            <div 
              key={index} 
              className="bg-unicorn-black/30 border-2 border-unicorn-gold p-6 rounded-lg transform transition-transform hover:scale-105"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl md:text-2xl font-bold text-white">
                {item.text}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  const { user } = useAuth();

  // Set up console filters to reduce noise from extensions and external services
  useEffect(() => {
    setupConsoleFilters();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Stars background with lowest z-index to ensure it's behind content */}
      <div className="fixed inset-0 z-0">
        <StarsBackground />
      </div>
      
      {/* Main content wrapper with higher z-index */}
      <div className="relative z-10">
        {/* Navbar with appropriate z-index */}
        <Navbar />
        
        {/* HeroBanner - prevent wrapping in extra div that might affect styling */}
        <HeroBanner />
        
        {/* Service Highlights Section - new section with bold statements */}
        <ServiceHighlights />
        
        {/* Other sections */}
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
        <div className="fixed bottom-8 right-8 z-50">
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
