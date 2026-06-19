import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "../layout/AdminLayout";
import Dashboard from "../pages/Dashboard";

import Products from "../pages/Products";
import Payments from "../pages/Payments";
import PaymentHistory from "../pages/PaymentHistory";
import Orders from "../pages/AllOrders"
import PaymentsList from "../pages/PaymentList"
import Users from "../pages/UserList"


import ProtectedRoute from "../../../routes/ProtectedRoute";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* default route */}
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<Dashboard />} />
        {/* <Route path="home" element={<Home />} /> */}
        <Route path="products" element={<Products />} />
        <Route path="payments" element={<Payments />} />
        <Route path="ordersList" element={<Orders />} />
       <Route path="paymentsList" element={<PaymentsList />} />
       <Route path="usersList" element={<Users />} />
      </Route>
    </Routes>
  );
}