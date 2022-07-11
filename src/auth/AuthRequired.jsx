import React, { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
// import { isAuthenticated } from "../utils/cookieHandler";
import { useAuth } from "./useAuth";
import { isAuthenticated } from "../utils/cookieHandler";

const AuthRequired = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();
  const isUser = isAuthenticated();

  if (!isUser) {
    console.log("User not authenticated", auth.user);
    return <Navigate to="/user/login" state={{ path: location.pathname }} />;
  }

  return children;
};

export default AuthRequired;
