import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/useAuth";

const Dashboard = () => {
  const auth = useAuth();
  return (
    <div className="container">
      <h2 className="row">Dashboard</h2>
      <div className="col fs-5 fw-bold">
        Welcome <span className="text-primary">{auth.user?.email}</span>
      </div>
      <div className="row">Recent Tasks</div>
      <div className="row">
        <div className="col"></div>
      </div>
    </div>
  );
};

export default Dashboard;
