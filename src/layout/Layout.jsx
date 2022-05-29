import React from "react";
import { Outlet } from "react-router-dom";

const Layout = ({ location }) => {
  return (
    <div>
      <div>Navbar - Path: "{location.pathname}"</div>
      <div className="container mx-auto py-3">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
