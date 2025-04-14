
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useLogoutHandler } from "@/hooks/useLogoutHandler";
import DashboardUserInfo from "./DashboardUserInfo";
import DashboardNavLinks from "./DashboardNavLinks";
import DashboardFooterLinks from "./DashboardFooterLinks";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardSidebarProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
  user: any;
  isAdmin?: boolean;
}

const DashboardSidebar = ({
  isMenuOpen,
  closeMenu,
  user,
  isAdmin = false
}: DashboardSidebarProps) => {
  const handleLogout = useLogoutHandler(closeMenu);
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 pt-16 left-0 z-30 h-full w-64 bg-unicorn-darkPurple transition-transform duration-300 ease-in-out transform md:translate-x-0 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:w-64 shadow-xl border-r border-unicorn-purple/20`}
      >
        <div className="h-full flex flex-col space-y-2 p-4 overflow-y-auto">
          {/* Close button - visible only on mobile */}
          <div className="flex justify-between items-center md:hidden">
            <span className="text-unicorn-gold font-medium">Dashboard Menu</span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={closeMenu}
              className="text-unicorn-gold hover:bg-unicorn-purple/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="mb-8 space-y-4">
            {/* User info */}
            <DashboardUserInfo user={user} isAdmin={isAdmin} />

            {/* Current page indicator (mobile only) */}
            <div className="block md:hidden text-center px-4 py-2 text-sm text-unicorn-gold border-b border-unicorn-gold/20">
              Current: {location.pathname.split('/').pop()?.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase()) || 'Dashboard'}
            </div>

            {/* Navigation */}
            <DashboardNavLinks isAdmin={isAdmin} closeMenu={closeMenu} />
          </div>

          <DashboardFooterLinks isAdmin={isAdmin} onLogout={handleLogout} closeMenu={closeMenu} />
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
