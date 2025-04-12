import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LayoutDashboard, 
  Users, 
  Tag, 
  CreditCard, 
  MessageCircle, 
  ChevronRight, 
  Wallet,
  LogOut,
  Banknote,
  Megaphone
} from "lucide-react";

interface SidebarProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
  user: any;
  isAdmin?: boolean;
}

const DashboardSidebar = ({ isMenuOpen, closeMenu, user, isAdmin = false }: SidebarProps) => {
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      closeMenu();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleSubMenu = (index: number) => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
  };

  const [activeSubMenu, setActiveSubMenu] = React.useState<number | null>(null);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isSubMenuActive = (index: number) => {
    return activeSubMenu === index;
  };

  const closeSidebar = () => {
    if (isMenuOpen) {
      closeMenu();
    }
  };

  // User navigation items
  const userNavItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      name: "My Investments",
      path: "/dashboard/investments",
      icon: <Wallet className="w-5 h-5" />
    },
    {
      name: "Support Tickets",
      path: "/dashboard/tickets",
      icon: <MessageCircle className="w-5 h-5" />
    },
    {
      name: "Transactions",
      path: "/dashboard/transactions",
      icon: <CreditCard className="w-5 h-5" />
    },
  ];

  // Admin navigation items
  const adminNavItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <Users className="w-5 h-5" />
    },
    {
      name: "Tickets",
      path: "/admin/tickets",
      icon: <MessageCircle className="w-5 h-5" />
    },
    {
      name: "Transactions",
      path: "/admin/transactions",
      icon: <CreditCard className="w-5 h-5" />
    },
    {
      name: "Payment Connections",
      path: "/admin/payment-connections",
      icon: <Banknote className="w-5 h-5" />
    },
    {
      name: "Broadcast Messages",
      path: "/admin/broadcast",
      icon: <Megaphone className="w-5 h-5" />
    }
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      } bg-unicorn-darkPurple border-r border-unicorn-gold/10 md:translate-x-0`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-unicorn-darkPurple">
        <ul className="space-y-2 font-medium">
          {(isAdmin ? adminNavItems : userNavItems).map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-2 text-white rounded-lg hover:bg-unicorn-purple group ${
                    isActive ? "bg-unicorn-purple" : ""
                  }`
                }
                onClick={closeSidebar}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-2 text-white rounded-lg hover:bg-unicorn-purple group"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-3">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
