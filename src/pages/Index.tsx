
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
import { Home } from "lucide-react";

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

  useEffect(() => {
    setupConsoleFilters();

    // Add JotForm chatbot
    const jotformScript = document.createElement('script');
    jotformScript.src = 'https://cdn.jotfor.ms/s/umd/latest/for-embedded-agent.js';
    document.body.appendChild(jotformScript);

    jotformScript.onload = () => {
      if (window.AgentInitializer) {
        window.AgentInitializer.init({
          agentRenderURL: "https://agent.jotform.com/019632161ac57399a1f3d33d5152b336a174",
          rootId: "JotformAgent-019632161ac57399a1f3d33d5152b336a174",
          formID: "019632161ac57399a1f3d33d5152b336a174",
          queryParams: ["skipWelcome=1", "maximizable=1"],
          domain: "https://www.jotform.com",
          isDraggable: false,
          background: "linear-gradient(180deg, #910E3E 0%, #910E3E 100%)",
          buttonBackgroundColor: "#04569D",
          buttonIconColor: "#F7FFE9",
          variant: false,
          customizations: {
            "greeting": "Yes",
            "greetingMessage": "Hi! How can I assist you?",
            "pulse": "Yes",
            "position": "right",
            "autoOpenChatIn": "0"
          },
          isVoice: false,
        });
      } else {
        console.error("JotForm AgentInitializer not found");
      }
    };

    return () => {
      if (document.body.contains(jotformScript)) {
        document.body.removeChild(jotformScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <StarsBackground />
      </div>
      
      <div className="relative z-10">
        <Navbar />
        
        <HeroBanner />
        
        <ServiceHighlights />
        
        <AboutSection />
        <HowItWorksSection />
        <InvestmentPlansSection />
        <ProfitCalculatorSection />
        <TestimonialsSection />
        <WhyChooseUsSection />
        <CtaSection />
      </div>
      
      <div id="JotformAgent-019632161ac57399a1f3d33d5152b336a174"></div>
      
      {user && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end">
          <Button asChild className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black">
            <Link to="/dashboard">
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Index;
