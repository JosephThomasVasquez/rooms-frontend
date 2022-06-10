import React, { useState, createContext, useContext, useEffect } from "react";
import { isAuthenticated } from "../utils/cookieHandler";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("isAuthed", isAuthenticated());
    const hasToken = JSON.parse(localStorage.getItem("user"));
    if (hasToken) {
      setUser(hasToken);
    }
  }, []);

  const loginUser = (user) => {
    // setting User
    console.log("user", user);
    // const hasToken = JSON.parse(localStorage.getItem("user"));
    // console.log(hasToken);

    setUser(user);
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
