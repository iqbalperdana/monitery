import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "./services/authService";

const ProtectedRoute: React.FC = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
