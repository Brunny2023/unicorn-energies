
import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import StarsBackground from "@/components/ui/StarsBackground";
import DashboardHeader from "./layout/DashboardHeader";
import DashboardSidebar from "./layout/DashboardSidebar";

interface DashboardLayoutProps {
  children?: ReactNode;
  isAdmin?: boolean;
}

const DashboardLayout = ({ children, isAdmin = false }: DashboardLayoutProps) => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* StarsBackground should be positioned absolutely and not affect layout */}
      <StarsBackground />

      <DashboardHeader 
        toggleMenu={toggleMenu} 
        user={user} 
      />

      <div className="flex flex-1 relative z-10">
        <DashboardSidebar 
          isMenuOpen={isMenuOpen} 
          closeMenu={closeMenu} 
          user={user} 
          isAdmin={isAdmin} 
        />

        {/* Main Content - updated to align content properly */}
        <main className="flex-1 md:ml-64 p-6 mt-0 overflow-auto flex justify-center">
          <div className="w-full max-w-7xl">
            {/* The Outlet component renders the matched child route */}
            <Outlet />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
