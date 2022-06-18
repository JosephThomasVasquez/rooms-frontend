import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { getUser } from "../utils/apiRequests";
import dayjs from "dayjs";

const Profile = ({ errorHandler }) => {
  const auth = useAuth();
  const location = useLocation();

  const [userDetails, setUserDetails] = useState(null);
  const formattedDate = dayjs(userDetails?.created_at).format("MMM DD, YYYY");

  useEffect(() => {
    const params = location.search;

    const getUserDetails = async () => {
      const abortController = new AbortController();
      try {
        const response = await getUser(params, abortController.signal);

        if (response) {
          setUserDetails(response);
          // console.log("userDetails:", response);
        }
      } catch (error) {
        errorHandler(error);
      }
    };

    if (params !== "") {
      getUserDetails();
    }
  }, []);

  return (
    <div className="container">
      <div className="row">Username: {userDetails?.email}</div>
      <div className="row">
        Name: {userDetails?.firstname} {userDetails?.lastname}
      </div>
      <div className="row">Account: {userDetails?.account_name}</div>
      <div className="row">User Since: {formattedDate}</div>
    </div>
  );
};

export default Profile;
