import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

const AuthRequired = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    console.log("User not authenticated", auth.user);
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }

  return children;
};

export default AuthRequired;
