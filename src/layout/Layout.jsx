import React from "react";
import { AuthProvider } from "../auth/useAuth";
import NavMenu from "../navMenu/NavMenu";
import Routers from "./Routers";

const Layout = () => {
  return (
    <AuthProvider>
      <NavMenu />
      <div className="container-fluid mx-auto p-3 bg-pattern-lists">
        <Routers />
      </div>
    </AuthProvider>
  );
};

export default Layout;
