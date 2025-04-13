
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminRoute from "@/components/auth/AdminRoute";

// Admin pages
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminUsers from "@/pages/admin/Users";
import AdminTransactions from "@/pages/admin/Transactions";
import AdminTickets from "@/pages/admin/Tickets";
import AdminTicketDetails from "@/pages/admin/TicketDetails";
import AdminPaymentConnections from "@/pages/admin/PaymentConnections";
import AdminBroadcastMessages from "@/pages/admin/BroadcastMessages";
import AdminSettings from "@/pages/admin/Settings";
import AdminLoanApplications from "@/pages/admin/LoanApplications";

const AdminRoutes = () => (
  <Routes>
    {/* Admin Pages */}
    <Route
      path="/dashboard"
      element={
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      }
    />
    <Route
      path="/users"
      element={
        <AdminRoute>
          <AdminUsers />
        </AdminRoute>
      }
    />
    <Route
      path="/transactions"
      element={
        <AdminRoute>
          <AdminTransactions />
        </AdminRoute>
      }
    />
    <Route
      path="/tickets"
      element={
        <AdminRoute>
          <AdminTickets />
        </AdminRoute>
      }
    />
    <Route
      path="/tickets/:id"
      element={
        <AdminRoute>
          <AdminTicketDetails />
        </AdminRoute>
      }
    />
    <Route
      path="/payment-connections"
      element={
        <AdminRoute>
          <AdminPaymentConnections />
        </AdminRoute>
      }
    />
    <Route
      path="/broadcast"
      element={
        <AdminRoute>
          <AdminBroadcastMessages />
        </AdminRoute>
      }
    />
    <Route
      path="/settings"
      element={
        <AdminRoute>
          <AdminSettings />
        </AdminRoute>
      }
    />
    <Route
      path="/loan-applications"
      element={
        <AdminRoute>
          <AdminLoanApplications />
        </AdminRoute>
      }
    />
  </Routes>
);

export default AdminRoutes;
