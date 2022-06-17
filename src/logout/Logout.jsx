import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { removeLocalStorageCookie, removeCookie } from "../utils/cookieHandler";

const Logout = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logged out");

    removeCookie("token");
    removeLocalStorageCookie("user");
    auth.logoutUser();

    navigate("user/login");
  };

  return (
    <div
      className="dropdown-item"
      aria-current="page"
      href="logout"
      onClick={handleLogout}
    >
      Logout
    </div>
  );
};

export default Logout;