import { Navigate } from "react-router-dom";
import { getRole, isLoggedIn } from "../utils/auth";

export default function ProtectedRoute({ children, allowedRole }) {
  // 1. Not logged in → redirect
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  const role = getRole()?.toLowerCase();
  const allowed = allowedRole?.toLowerCase();

  // 2. Role mismatch → redirect
  if (allowed && role !== allowed) {
    return <Navigate to="/login" replace />;
  }

  // 3. Allow access
  return children;
}