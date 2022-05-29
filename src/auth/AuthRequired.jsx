import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

const AuthRequired = ({ children }) => {
  const auth = useAuth();

  console.log("REQUIRED REQUIRED REQUIRED!!!", auth.user);
  console.log("children", children);

  if (!auth.user) {
    console.log("User not authenticated", auth.user);
    return <Navigate to="/login" />;
  }
  console.log("User is authenticated", auth.user);
  return children;
};

export default AuthRequired;
