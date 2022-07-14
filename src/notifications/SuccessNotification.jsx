import React, { useState, useEffect } from "react";

const SuccessNotification = ({ notification, successHandler }) => {
  const [displaySuccessNotification, setDisplaySuccessNotification] =
    useState();
  useEffect(() => {
    if (notification) {
      setDisplaySuccessNotification("show");
    } else {
      setDisplaySuccessNotification("hide");
    }
  }, [notification]);

  const handleDisplaySuccessNotification = () => {
    setDisplaySuccessNotification("hide");
  };

  return notification ? (
    <div
      className={`col alert alert-success my-3 alert-dismissible shadow fade ${displaySuccessNotification} alert-float mx-5 py-2`}
      role="alert"
    >
      <span className="font-weight-bold"> Success:</span> {notification.message}
      {displaySuccessNotification === "show" ? (
        <button
          type="button"
          className="btn-close p-3"
          aria-label="Close"
          onClick={handleDisplaySuccessNotification}
        >
          <span aria-hidden="true"></span>
        </button>
      ) : null}
    </div>
  ) : (
    <div
      className={`col alert alert-danger my-3 alert-dismissible shadow fade ${displaySuccessNotification} alert-float mx-5 py-2`}
      role="alert"
    ></div>
  );
};

export default SuccessNotification;
