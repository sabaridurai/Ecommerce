import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from "./context/CartContext";

import UserLogin from "./pages/user/auth/UserLogin";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRoutes from "./pages/admin/routes/AdminRoutes";

import UserLanding from "./pages/user/dashboard/userlanding";
import CheckoutPage from "./CheckoutPage";

function App() {
  return (
    <BrowserRouter>

      <CartProvider>

        <Routes>

          {/* USER LANDING */}
          <Route path="/" element={<UserLanding />} />

          {/* USER LOGIN */}
          <Route path="/login" element={<UserLogin />} />

            {/* /checkout */}
            <Route path="/checkout" element={<CheckoutPage />} />


          {/* ADMIN LOGIN */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ADMIN ROUTES */}
          <Route path="/admin/*" element={<AdminRoutes />} />
        


        </Routes>

      </CartProvider>

    </BrowserRouter>
  );
}

export default App;