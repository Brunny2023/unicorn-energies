
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import InvestmentPlans from "./pages/InvestmentPlans";
import Calculator from "./pages/Calculator";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

// Auth pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Dashboard pages
import Dashboard from "./pages/dashboard/Dashboard";
import Investments from "./pages/dashboard/Investments";
import Transactions from "./pages/dashboard/Transactions";
import Withdraw from "./pages/dashboard/Withdraw";
import Loans from "./pages/dashboard/Loans";
import Affiliates from "./pages/dashboard/Affiliates";
import Settings from "./pages/dashboard/Settings";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminTransactions from "./pages/admin/Transactions";
import AdminTickets from "./pages/admin/Tickets";
import AdminTicketDetails from "./pages/admin/TicketDetails";
import AdminPaymentConnections from "./pages/admin/PaymentConnections";
import AdminBroadcastMessages from "./pages/admin/BroadcastMessages";
import AdminSettings from "./pages/admin/Settings";
import AdminLoanApplications from "./pages/admin/LoanApplications";

// Ticket pages
import TicketsIndex from "./pages/dashboard/tickets/TicketsIndex";
import NewTicket from "./pages/dashboard/tickets/NewTicket";
import TicketView from "./pages/dashboard/tickets/TicketView";

// Auth context
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";

// Toaster
import { Toaster } from "@/components/ui/toaster";

// CSS and other assets
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/investment-plans" element={<InvestmentPlans />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Dashboard Pages */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/investments"
          element={
            <ProtectedRoute>
              <Investments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/withdraw"
          element={
            <ProtectedRoute>
              <Withdraw />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/loans"
          element={
            <ProtectedRoute>
              <Loans />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/affiliates"
          element={
            <ProtectedRoute>
              <Affiliates />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/tickets"
          element={
            <ProtectedRoute>
              <TicketsIndex />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/tickets/new"
          element={
            <ProtectedRoute>
              <NewTicket />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/tickets/:id"
          element={
            <ProtectedRoute>
              <TicketView />
            </ProtectedRoute>
          }
        />

        {/* Admin Pages */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/transactions"
          element={
            <AdminRoute>
              <AdminTransactions />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/tickets"
          element={
            <AdminRoute>
              <AdminTickets />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/tickets/:id"
          element={
            <AdminRoute>
              <AdminTicketDetails />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/payment-connections"
          element={
            <AdminRoute>
              <AdminPaymentConnections />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/broadcast"
          element={
            <AdminRoute>
              <AdminBroadcastMessages />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AdminRoute>
              <AdminSettings />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/loan-applications"
          element={
            <AdminRoute>
              <AdminLoanApplications />
            </AdminRoute>
          }
        />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
