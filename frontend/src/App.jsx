import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserLogin from "./pages/user/auth/UserLogin";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRoutes from "./pages/admin/routes/AdminRoutes";

// ✅ correct path (IMPORTANT)
import UserLanding from "./pages/user/dashboard/userlanding";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* DEFAULT USER LANDING PAGE */}
        <Route path="/" element={<UserLanding />} />

        {/* USER LOGIN */}
        <Route path="/login" element={<UserLogin />} />

        {/* ADMIN LOGIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin/*" element={<AdminRoutes />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;