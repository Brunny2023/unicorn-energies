
import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import StarsBackground from "@/components/ui/StarsBackground";
import DashboardHeader from "./layout/DashboardHeader";
import DashboardSidebar from "./layout/DashboardSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  isAdmin?: boolean;
}

const DashboardLayout = ({ children, isAdmin = false }: DashboardLayoutProps) => {
  const { user } = useAuth();
 const router = useRouter();
const location = { pathname: router.pathname };
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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

      <DashboardSidebar 
        isMenuOpen={isMenuOpen} 
        closeMenu={closeMenu} 
        location={location} 
        user={user} 
        isAdmin={isAdmin} 
      />

      {/* Main Content */}
      <main className="flex-1 md:pl-64 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
