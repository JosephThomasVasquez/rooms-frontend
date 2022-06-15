import React, { useState, createContext, useContext, useEffect } from "react";
import { isAuthenticated } from "../utils/cookieHandler";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const isAuth = isAuthenticated();
    // console.log("isAuthed", isAuth);
    // if() {

    // }
    const hasToken = JSON.parse(localStorage.getItem("user"));
    if (isAuth) {
      setUser(isAuth);
    }
  }, []);

  const loginUser = (user) => {
    // setting User
    // console.log("user", user);

    setUser(user);
  };

  const getLoggedInUser = () => {
    return user;
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, getLoggedInUser, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
