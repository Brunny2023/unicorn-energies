
import React from "react";
import { Link } from "react-router-dom";
import { Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardFooterLinksProps {
  isAdmin: boolean;
  onLogout: () => void;
  closeMenu: () => void;
}

const DashboardFooterLinks = ({ isAdmin, onLogout, closeMenu }: DashboardFooterLinksProps) => {
  return (
    <div className="mt-auto pt-6 border-t border-unicorn-purple/20 space-y-2">
      {!isAdmin && (
        <Link
          to="/dashboard/settings"
          className="flex items-center px-4 py-2.5 rounded-lg text-gray-400 hover:text-unicorn-gold hover:bg-unicorn-gold/5 font-medium transition-colors"
          onClick={closeMenu}
        >
          <Settings className="h-5 w-5" />
          <span className="ml-3">Settings</span>
        </Link>
      )}
      
      <Button
        variant="outline"
        className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 border-red-500/30 justify-start font-medium"
        onClick={onLogout}
      >
        <LogOut className="h-5 w-5 mr-3" />
        Sign Out
      </Button>
    </div>
  );
};

export default DashboardFooterLinks;
