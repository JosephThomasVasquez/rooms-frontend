import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { signupUser } from "../utils/apiRequests";
import { authenticateUser } from "../utils/cookieHandler";
import signupImage from "./signup_character.png";
import "./signup.styles.css";

const Signup = ({ admin, errorHandler }) => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const initialFormData = {
    firstname: "",
    lastname: "",
    email: "",
    role: "user",
    password: "",
    confirm_password: "",
    account_id: admin ? admin.account_id : 1,
  };

  const [user, setUser] = useState({ ...initialFormData });

  const redirectPath = location.state?.path || "/";
  console.log(location);

  console.log("admin", admin && admin);

  const handleChange = ({ target }) => {
    setUser({ ...user, [target.name]: target.value });

    console.log(user);
  };

  const handleSelectedRole = ({ target }) => {
    setUser({ ...user, role: target.options[target.selectedIndex].value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    const submitSignup = async () => {
      const abortController = new AbortController();

      try {
        const response = await signupUser(user, abortController.signal);

        if (!admin) {
          authenticateUser(response, () => {
            auth.loginUser(response);
            navigate(redirectPath, { replace: true });
          });
        } else {
          navigate("/admin/users");
        }
      } catch (error) {
        errorHandler(error);
      }
    };

    submitSignup();
  };

  return (
    <div className="container mt-3 mb-5 pb-5">
      <h2 className="text-4xl">
        {admin?.account_name ? "Add User" : "Create Account"}
      </h2>

      <form onSubmit={handleSignup} className="p-5 shadow rounded bg-card">
        <div className="row">
          <img
            src={signupImage}
            alt="signup image of a person"
            className="signup-img mx-auto"
          />
        </div>
        {admin ? (
          <div className="row">
            <div className="col fw-bold mb-3">
              Account: {admin?.account_name}
            </div>
          </div>
        ) : null}
        <div className="row mb-3">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6">
            <label htmlFor="firstname" className="form-label label-input">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              name="firstname"
              id="firstname"
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6">
            <label htmlFor="lastname" className="form-label label-input">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              name="lastname"
              id="lastname"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="email" className="form-label label-input">
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
          {admin ? (
            <div className="col">
              <label htmlFor="role" className="form-label label-input">
                Role
              </label>
              <select
                className="form-select"
                name="role"
                id="role"
                aria-label="Default select example"
                onChange={handleSelectedRole}
                value={user.role}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          ) : null}
        </div>

        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
            <label htmlFor="password" className="form-label label-input">
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

          <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
            <label
              htmlFor="confirm_password"
              className="form-label label-input"
            >
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              name="confirm_password"
              id="confirm_password"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center">
          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </div>
      </form>
      <div>{JSON.stringify(user)}</div>
    </div>
  );
};

export default Signup;
