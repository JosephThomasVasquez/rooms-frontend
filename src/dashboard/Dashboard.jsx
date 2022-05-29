import React from "react";
import { useAuth } from "../auth/useAuth";

const Dashboard = () => {
  const auth = useAuth();
  return (
    <div>
      <h2>Dashboard</h2>
      <div>Welcome {JSON.stringify(auth.user)}</div>
    </div>
  );
};

export default Dashboard;
