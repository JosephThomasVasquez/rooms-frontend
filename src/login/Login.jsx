import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { loginUser } from "../utils/apiRequests";
import { authenticateUser } from "../utils/cookieHandler";

const Login = () => {
  const [user, setUser] = useState("");
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const redirectPath = location.state?.path || "/";

  const handleChange = ({ target }) => {
    setUser({ ...user, [target.name]: target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const submitLogin = async () => {
      const abortController = new AbortController();

      try {
        const response = await loginUser(user, abortController.signal);

        console.log("Logged in user:", response);

        authenticateUser(response, () => {
          auth.loginUser(response);
          navigate(redirectPath, { replace: true });
        });
      } catch (error) {
        console.log("Login ERROR:", error);
      }
    };

    submitLogin();
  };

  return (
    <div>
      <h2 className="text-4xl">Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary shadow">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
