import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
  // If the user is not authenticated, redirect to the home page or login
  if (!user) {
    return <Navigate to="/home" replace />;
  }

  // Render the protected component if the user is authenticated
  return children;
};

export default ProtectedRoute;
