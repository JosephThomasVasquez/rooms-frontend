import React from "react";

const Signup = () => {
  const handleChange = () => {};

  const handleSignup = () => {};

  return (
    <div className="container">
      <h2 className="text-4xl">Signup</h2>
      <form onSubmit={handleSignup} className="p-5 shadow">
        <div className="row">
          <div className="col-6">
            <label htmlFor="firstname" className="form-label">
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
          <div className="col-6">
            <label htmlFor="lastname" className="form-label">
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
        <div className="row">
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
            />
          </div>
        </div>

        <div className="row">
          <div className="col-6 mb-3">
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

          <div className="col-6 mb-3">
            <label htmlFor="confirm_password" className="form-label">
              Confirm Password
            </label>
            <input
              type="confirm_password"
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
    </div>
  );
};

export default Signup;
