
import React, { ReactNode, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import StarsBackground from "@/components/ui/StarsBackground";
import DashboardHeader from "./layout/DashboardHeader";
import DashboardSidebar from "./layout/DashboardSidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children?: ReactNode;
  isAdmin?: boolean;
}

const DashboardLayout = ({ children, isAdmin = false }: DashboardLayoutProps) => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <StarsBackground />

      <DashboardHeader 
        toggleMenu={toggleMenu} 
        user={user} 
      />

      <div className="flex flex-1 relative z-10">
        {/* Sidebar - always render it but control visibility with state */}
        <DashboardSidebar 
          isMenuOpen={isMenuOpen} 
          closeMenu={closeMenu} 
          user={user} 
          isAdmin={isAdmin} 
        />

        {/* Mobile menu toggle that stays fixed at bottom right for easy access */}
        {isMobile && (
          <Button
            onClick={toggleMenu}
            className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black p-3"
          >
            <Menu className="h-6 w-6" />
          </Button>
        )}

        <main className="flex-1 md:ml-64 p-6 mt-0 overflow-auto">
          <div className="w-full max-w-7xl mx-auto">
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
