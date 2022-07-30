import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthProvider } from "../auth/useAuth";
import NavMenu from "../navMenu/NavMenu";
import Routers from "./Routers";
import { ArrowLeftIcon } from "@heroicons/react/outline";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleGoBack = ({ target }) => {
    console.log("location:", location);
    // console.log("navigate:", navigate);
    navigate(-1);
  };

  return (
    <AuthProvider>
      <ArrowLeftIcon className="navigate-back-btn shadow" onClick={handleGoBack} />
      <NavMenu openNav={openNav} setOpenNav={setOpenNav} />
      <div className="container-fluid mx-auto p-3 bg-pattern-lists">
        <Routers />
      </div>
    </AuthProvider>
  );
};

export default Layout;
