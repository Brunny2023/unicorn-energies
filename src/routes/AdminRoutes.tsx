
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import EmailTemplateEditor from "@/pages/admin/EmailTemplateEditor";

const AdminRoutes = () => (
  <Routes>
    {/* Admin routes */}
    <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
    
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
      path="/admin/settings/email-templates/:templateId"
      element={
        <AdminRoute>
          <EmailTemplateEditor />
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
  </Routes>
);

export default AdminRoutes;
