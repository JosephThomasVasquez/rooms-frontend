import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

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
    auth.loginUser(user);
    navigate(redirectPath, { replace: true });
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
          <button
            type="submit"
            className="rounded bg-black text-gray-400 shadow"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
