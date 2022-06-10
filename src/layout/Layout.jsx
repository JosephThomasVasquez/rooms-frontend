import React from "react";
import { AuthProvider, useAuth } from "../auth/useAuth";
import NavMenu from "../navMenu/NavMenu";
import Routers from "./Routers";

const Layout = () => {
  // const auth = useAuth();
  // console.log("checking for user:", auth?.user);
  return (
    <AuthProvider>
      <NavMenu />
      <div className="container mx-auto p-3">
        <Routers />
      </div>
    </AuthProvider>
  );
};

export default Layout;
