import React, { useState, useEffect } from "react";
import "./errorMessage.styles.css";
const ErrorMessage = ({ error }) => {
  const [displayError, setDisplayError] = useState(null);
  useEffect(() => {
    if (error) {
      setDisplayError("show");
    } else {
      setDisplayError("hide");
    }
  }, [error]);

  const handleDisplayError = () => {
    setDisplayError("hide");
  };

  return error ? (
    <div
      className={`col alert alert-danger my-3 alert-dismissible shadow fade ${displayError} alert-float mx-5 py-2`}
      role="alert"
    >
      <span className="font-weight-bold"> Error:</span> {error.message}
      {displayError === "show" ? (
        <button
          type="button"
          className="btn-close p-3"
          aria-label="Close"
          onClick={handleDisplayError}
        >
          <span aria-hidden="true"></span>
        </button>
      ) : null}
    </div>
  ) : (
    <div
      className={`col alert alert-danger my-3 alert-dismissible shadow fade ${displayError} alert-float mx-5 py-2`}
      role="alert"
    ></div>
  );
};

export default ErrorMessage;
