// src/routes/RequireAuth.jsx
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children, role }) {
  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const location = useLocation();

  if (!token) {
    // Not logged in → go to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user?.role !== role) {
    // Wrong role → send to correct dashboard
    return <Navigate to={`/${user.role === "admin" ? "admin-dashboard" : "dashboard"}`} replace />;
  }

  return children;
}
