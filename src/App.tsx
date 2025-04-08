
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import About from "./pages/About";
import InvestmentPlans from "./pages/InvestmentPlans";
import Calculator from "./pages/Calculator";
import HowItWorks from "./pages/HowItWorks";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import Investments from "./pages/dashboard/Investments";
import Withdraw from "./pages/dashboard/Withdraw";
import TicketsIndex from "./pages/dashboard/tickets/TicketsIndex";
import NewTicket from "./pages/dashboard/tickets/NewTicket";
import TicketView from "./pages/dashboard/tickets/TicketView";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminTransactions from "./pages/admin/Transactions";
import AdminTickets from "./pages/admin/Tickets";
import AdminTicketDetails from "./pages/admin/TicketDetails";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";

const queryClient = new QueryClient();

const AppContent = () => {
  // Initialize Cloudflare Turnstile
  useEffect(() => {
    // Load the Cloudflare Turnstile script if it's not already loaded
    if (typeof window.turnstile === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
      };
    }
  }, []);

  return (
    <>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/investment-plans" element={<InvestmentPlans />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Protected user routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard/investments" element={<ProtectedRoute><Investments /></ProtectedRoute>} />
        <Route path="/dashboard/withdraw" element={<ProtectedRoute><Withdraw /></ProtectedRoute>} />
        <Route path="/dashboard/tickets" element={<ProtectedRoute><TicketsIndex /></ProtectedRoute>} />
        <Route path="/dashboard/tickets/new" element={<ProtectedRoute><NewTicket /></ProtectedRoute>} />
        <Route path="/dashboard/tickets/:id" element={<ProtectedRoute><TicketView /></ProtectedRoute>} />
        
        {/* Protected admin routes */}
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
        <Route path="/admin/transactions" element={<AdminRoute><AdminTransactions /></AdminRoute>} />
        <Route path="/admin/tickets" element={<AdminRoute><AdminTickets /></AdminRoute>} />
        <Route path="/admin/tickets/:id" element={<AdminRoute><AdminTicketDetails /></AdminRoute>} />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

declare global {
  interface Window {
    turnstile?: any;
  }
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
