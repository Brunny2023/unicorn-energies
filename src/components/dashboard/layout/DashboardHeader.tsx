import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { signOut } from "@/contexts/auth/authActions";
import { useToast } from "@/hooks/use-toast";
import {
  Menu,
  Sun,
  Moon,
  Bell,
  User,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardHeaderProps {
  toggleMenu: () => void;
  user: any;
}

const DashboardHeader = ({ toggleMenu, user }: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);

  const handleSignOut = async () => {
    await signOut({ toast, navigate });
  };
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real implementation, this would toggle the theme
  };

  const formatTimeGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const userDisplayName = user?.full_name || user?.email?.split('@')[0] || "User";
  const userEmail = user?.email || "user@example.com";
  const userProfileImage = user?.profile_image || null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-unicorn-gold/30 bg-unicorn-darkPurple/95 backdrop-blur-sm">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Button
          variant="ghost"
          className="mr-2 text-white md:hidden"
          onClick={toggleMenu}
        >
          <Menu className="h-6 w-6" />
        </Button>
        
        <Link to="/" className="md:hidden flex items-center text-2xl font-bold text-white">
          UnicornEnergies
        </Link>
        
        <div className="hidden md:flex items-center ml-4">
          <span className="text-gray-300 text-sm">{formatTimeGreeting()},</span>
          <span className="text-white font-medium ml-1 text-sm">{userDisplayName}</span>
        </div>
        
        <div className="ml-auto flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white hidden md:flex"
            onClick={toggleDarkMode}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <NotificationsDropdown />
          
          <UserDropdown 
            user={user} 
            userDisplayName={userDisplayName}
            userEmail={userEmail}
            userProfileImage={userProfileImage}
            formatTimeGreeting={formatTimeGreeting}
            getInitials={getInitials}
            handleSignOut={handleSignOut}
          />
        </div>
      </div>
    </header>
  );
};

const NotificationsDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-white">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-unicorn-gold rounded-full"></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-unicorn-darkPurple/95 border-unicorn-gold/30 text-white">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-unicorn-gold/20" />
        <div className="max-h-96 overflow-auto">
          <div className="p-3 hover:bg-unicorn-purple/20 cursor-pointer border-l-2 border-unicorn-gold">
            <div className="text-sm font-medium">New investment return</div>
            <div className="text-xs text-gray-400">Your Gold plan generated $25 today</div>
            <div className="text-xs text-gray-500 mt-1">2 hours ago</div>
          </div>
          <div className="p-3 hover:bg-unicorn-purple/20 cursor-pointer">
            <div className="text-sm font-medium">Withdrawal processed</div>
            <div className="text-xs text-gray-400">Your withdrawal request has been approved</div>
            <div className="text-xs text-gray-500 mt-1">Yesterday</div>
          </div>
          <div className="p-3 hover:bg-unicorn-purple/20 cursor-pointer">
            <div className="text-sm font-medium">New promotion</div>
            <div className="text-xs text-gray-400">Platinum plan now offers 1.8% daily returns!</div>
            <div className="text-xs text-gray-500 mt-1">3 days ago</div>
          </div>
        </div>
        <DropdownMenuSeparator className="bg-unicorn-gold/20" />
        <DropdownMenuItem className="text-center cursor-pointer text-unicorn-gold">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const UserDropdown = ({ user, userDisplayName, userEmail, userProfileImage, formatTimeGreeting, getInitials, handleSignOut }: any) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full relative" aria-label="User menu">
          <Avatar className="h-8 w-8 border border-unicorn-gold/50">
            <AvatarImage src={userProfileImage} alt={userDisplayName} />
            <AvatarFallback className="bg-unicorn-purple text-white">
              {getInitials(userDisplayName)}
            </AvatarFallback>
          </Avatar>
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-unicorn-darkPurple"></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 bg-unicorn-darkPurple/95 border-unicorn-gold/30 text-white">
        <DropdownMenuLabel>
          <div className="flex items-center gap-3 mb-1">
            <Avatar className="h-10 w-10 border border-unicorn-gold/50">
              <AvatarImage src={userProfileImage} alt={userDisplayName} />
              <AvatarFallback className="bg-unicorn-purple text-white">
                {getInitials(userDisplayName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{userDisplayName}</div>
              <div className="text-xs text-gray-400">{userEmail}</div>
            </div>
          </div>
          <div className="font-normal text-xs text-gray-400 mt-1">{formatTimeGreeting()}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-unicorn-gold/20" />
        <DropdownMenuItem className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <HelpCircle className="mr-2 h-4 w-4" />
          Help & Support
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-unicorn-gold/20" />
        <DropdownMenuItem className="cursor-pointer text-red-400" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardHeader;
