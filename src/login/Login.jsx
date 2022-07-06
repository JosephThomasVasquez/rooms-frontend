import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { loginUser } from "../utils/apiRequests";
import { authenticateUser, isAuthenticated } from "../utils/cookieHandler";
import loginImage from "./login_character.png";
import "./login.styles.css";

const Login = ({ errorHandler }) => {
  const [user, setUser] = useState("");
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    setUser({ ...user, [target.name]: target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const submitLogin = async () => {
      const abortController = new AbortController();

      try {
        const response = await loginUser(user, abortController.signal);

        // console.log("Logged in user:", response);

        authenticateUser(response, () => {
          const redirectPath =
            location.state?.path || `/dashboard/user?email=${response.email}`;
          // console.log("location", location);

          auth.loginUser(response);
          navigate(redirectPath, { replace: true });
        });
      } catch (error) {
        errorHandler(error);
      }
    };

    submitLogin();
  };

  return (
    <div className="container mt-3 mb-5 pb-5">
      <h2 className="text-4xl">Login</h2>
      <form onSubmit={handleLogin} className="p-5 shadow rounded bg-card">
        <div className="row">
          <img
            src={loginImage}
            alt="login image of a person"
            className="login-img mx-auto"
          />
        </div>

        <div>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
