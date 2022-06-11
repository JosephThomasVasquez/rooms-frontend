import React from "react";
import { useLocation, Navigate } from "react-router-dom";
// import { isAuthenticated } from "../utils/cookieHandler";
import { useAuth } from "./useAuth";

const AuthRequired = ({ children }) => {
  // const [isAuthenticated, setIsAuthenticated] = useState(null);
  const auth = useAuth();

  // useEffect(() => {
  //   console.log("useAuth user", auth.user);
  //   setIsAuthenticated(auth.user);
  //   console.log("triggering isAuth");
  // }, []);

  const location = useLocation();

  if (!auth.user) {
    console.log("User not authenticated", auth.user);
    return <Navigate to="/user/login" state={{ path: location.pathname }} />;
  }

  return children;
};

export default AuthRequired;
