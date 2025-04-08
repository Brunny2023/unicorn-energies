
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";
import { Toaster } from "@/components/ui/toaster";

// Pages
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import InvestmentPlans from "./pages/InvestmentPlans";
import Calculator from "./pages/Calculator";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Dashboard Pages
import Dashboard from "./pages/dashboard/Dashboard";
import Investments from "./pages/dashboard/Investments";
import Withdraw from "./pages/dashboard/Withdraw";
import TicketsIndex from "./pages/dashboard/tickets/TicketsIndex";
import NewTicket from "./pages/dashboard/tickets/NewTicket";
import TicketView from "./pages/dashboard/tickets/TicketView";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminTransactions from "./pages/admin/Transactions";
import AdminTickets from "./pages/admin/Tickets";
import AdminTicketDetails from "./pages/admin/TicketDetails";

// Utility for console error filtering
import "./utils/consoleErrorFilter";

// Define the Turnstile interface globally without declaring it in the window interface
// This avoids the conflicting declarations
interface TurnstileInterface {
  render: (container: string | HTMLElement, params: any) => string;
  reset: (widgetId: string) => void;
}

// Add the global type declaration without modifying window
declare global {
  var turnstile: TurnstileInterface;
}

function App() {
  return (
    <div className="relative">
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/investment-plans" element={<InvestmentPlans />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/investments" element={<ProtectedRoute><Investments /></ProtectedRoute>} />
          <Route path="/dashboard/withdraw" element={<ProtectedRoute><Withdraw /></ProtectedRoute>} />
          <Route path="/dashboard/tickets" element={<ProtectedRoute><TicketsIndex /></ProtectedRoute>} />
          <Route path="/dashboard/tickets/new" element={<ProtectedRoute><NewTicket /></ProtectedRoute>} />
          <Route path="/dashboard/tickets/:id" element={<ProtectedRoute><TicketView /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
          <Route path="/admin/transactions" element={<AdminRoute><AdminTransactions /></AdminRoute>} />
          <Route path="/admin/tickets" element={<AdminRoute><AdminTickets /></AdminRoute>} />
          <Route path="/admin/tickets/:id" element={<AdminRoute><AdminTicketDetails /></AdminRoute>} />

          {/* Catch All */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </AuthProvider>
      <Toaster />
    </div>
  );
}

export default App;
