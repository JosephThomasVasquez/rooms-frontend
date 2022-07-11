import React, { useState, useEffect, useRef } from "react";
import { AuthProvider } from "../auth/useAuth";
import NavMenu from "../navMenu/NavMenu";
import Routers from "./Routers";

const Layout = () => {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    console.log("Clicked", openNav);

    const handleClick = () => {
      setOpenNav(!openNav);
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [openNav]);

  return (
    <AuthProvider>
      <NavMenu openNav={openNav} setOpenNav={setOpenNav} />
      <div className="container-fluid mx-auto p-3 bg-pattern-lists">
        <Routers />
      </div>
    </AuthProvider>
  );
};

export default Layout;
