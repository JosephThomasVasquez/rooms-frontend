import React from "react";
import { useAuth } from "../auth/useAuth";

const Dashboard = () => {
  const auth = useAuth();
  return (
    <div>
      <h2 className="">Dashboard</h2>
      <div className="fs-5 fw-bold">
        Welcome <span className="text-primary">{auth.user.email}</span>
      </div>
    </div>
  );
};

export default Dashboard;
