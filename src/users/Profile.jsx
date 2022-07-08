import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { getUser } from "../utils/apiRequests";
import dayjs from "dayjs";
import { UserCircleIcon } from "@heroicons/react/solid";
import "./profile.styles.css";

const Profile = ({ errorHandler }) => {
  const auth = useAuth();
  const location = useLocation();

  const initialFormData = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
    account_id: "",
  };

  const [userDetails, setUserDetails] = useState({ ...initialFormData });
  const formattedDate = dayjs(userDetails?.created_at).format("MMM DD, YYYY");

  useEffect(() => {
    const params = location.search;

    const getUserDetails = async () => {
      const abortController = new AbortController();
      try {
        const response = await getUser(params, abortController.signal);

        if (response) {
          setUserDetails(response);
          console.log("userDetails:", response);
        }
      } catch (error) {
        errorHandler(error);
      }
    };

    if (params !== "") {
      getUserDetails();
    }
  }, []);

  const handleChange = ({ target }) => {};

  const handleSelectedRole = ({ target }) => {
    // console.log(target.options[target.selectedIndex].value);

    setUserDetails({
      ...userDetails,
      role: target.options[target.selectedIndex].value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container mt-3 mb-5 pb-5">
      <h2 className="text-4xl mt-3 mb-5">User Details</h2>
      {userDetails ? (
        <form
          onSubmit={handleUpdate}
          className="p-5 rounded calendar-form bg-card"
        >
          <div className="row">
            <UserCircleIcon className="icon-profile-user mx-auto" />
          </div>
          <div className="fw-bold text-center">
            {userDetails.role &&
              userDetails?.role[0].toUpperCase() + userDetails?.role.slice(1)}
          </div>
          <div className="text-center">
            {userDetails?.account_id > 1 ? userDetails?.account_name : null}
          </div>
          <div className="text-center mb-5">{formattedDate}</div>
          <div className="row my-3">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <label htmlFor="firstname" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                name="firstname"
                id="firstname"
                onChange={handleChange}
                value={userDetails?.firstname}
              />
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <label htmlFor="lastname" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                name="lastname"
                id="lastname"
                onChange={handleChange}
                value={userDetails?.lastname}
              />
            </div>
          </div>
          <div className="row my-3">
            <div className="col">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                onChange={handleChange}
                value={userDetails?.email}
              />
            </div>
            <div className="col">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                className="form-select"
                name="role"
                id="role"
                aria-label="Default select example"
                onChange={handleSelectedRole}
                value={userDetails?.role}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="row my-3">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                onChange={handleChange}
                value={userDetails?.password}
              />
            </div>

            <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
              <label htmlFor="confirm_password" className="form-label">
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
              Save changes
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
};

export default Profile;
