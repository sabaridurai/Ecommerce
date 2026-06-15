import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserLogin from "./pages/user/auth/UserLogin";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRoutes from "./pages/admin/routes/AdminRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<UserLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ALL ADMIN ROUTES HANDLED HERE */}
        <Route path="/admin/*" element={<AdminRoutes />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;