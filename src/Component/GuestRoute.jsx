// src/routes/GuestRoute.jsx
import { Navigate } from "react-router-dom";

export default function GuestRoute({ children }) {
  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");

  if (token && user?.role) {
    // Already logged in → go to correct dashboard
    return <Navigate to={`/${user.role === "admin" ? "admin-dashboard" : "dashboard"}`} replace />;
  }

  return children;
}
