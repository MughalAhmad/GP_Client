// components/PublicRoute.jsx
import { Navigate } from "react-router-dom";
import { authService } from "../services/authService"

export default function PublicRoute({ children }) {

  // Redirect to dashboard if already authenticated
  let isAuthenticated = authService.isAuthenticated();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}