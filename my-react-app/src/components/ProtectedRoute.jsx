import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const ProtectedRoute = ({ requiredRole, children }) => {
  const { user } = useAuth();

  // If no user is authenticated at all
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // For provider routes
  if (requiredRole === "provider") {
    if (user.role !== "provider") {
      alert("Access denied: You do not have provider permissions.");
      return <Navigate to="/home" replace />;
    }
  }

  // For user routes
  if (requiredRole === "user") {
    if (user.role !== "user") {
      alert("Access denied: You do not have user permissions.");
      return <Navigate to="/home" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;