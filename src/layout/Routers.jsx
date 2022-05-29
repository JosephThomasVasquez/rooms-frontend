import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Auth Components
import AuthRequired from "../auth/AuthRequired";
import { useAuth } from "../auth/useAuth";

// Components
import Home from "./Home";
import Login from "../login/Login";
import Dashboard from "../dashboard/Dashboard";

const Routers = () => {
  const location = useLocation();

  const auth = useAuth();
  console.log("auth:", auth.user);

  return (
    <Routes>
      {/* USER ROUTES */}
      <Route exact path="login" element={<Login />} />
      <Route
        exact
        path="dashboard"
        element={
          <AuthRequired>
            <Dashboard />
          </AuthRequired>
        }
      ></Route>

      <Route exact path="/" element={<Home />} />
    </Routes>
  );
};

export default Routers;
