
import React from "react";

interface DashboardUserInfoProps {
  user: any;
  isAdmin?: boolean;
}

const DashboardUserInfo = ({ user, isAdmin = false }: DashboardUserInfoProps) => {
  return (
    <div className="flex flex-col items-center mb-4 p-4 rounded-lg bg-unicorn-darkPurple/30 border border-unicorn-gold/20">
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-unicorn-purple/40 border-2 border-unicorn-gold/40 flex items-center justify-center">
          <span className="text-xl font-bold text-unicorn-gold">
            {user && user.email ? user.email.charAt(0).toUpperCase() : "U"}
          </span>
        </div>
        <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-unicorn-darkPurple"></div>
      </div>
      <div className="mt-3 text-center">
        <h3 className="text-unicorn-gold font-medium">
          {user && user.email ? user.email.split('@')[0] : "User"}
        </h3>
        <p className="text-xs text-gray-400">
          {isAdmin ? "Administrator" : "Investor"}
        </p>
      </div>
    </div>
  );
};

export default DashboardUserInfo;
