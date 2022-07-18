import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
// import ContentLoader from "../layout/ContentLoader";
import { getUser } from "../utils/apiRequests";
import "./dashboard.styles.css";

const Dashboard = ({ errorHandler }) => {
  const auth = useAuth();
  const location = useLocation();

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const params = location.search;

    const getUserDetails = async () => {
      const abortController = new AbortController();
      try {
        const response = await getUser(params, abortController.signal);

        if (response) {
          setUserDetails(response);
        }
      } catch (error) {
        errorHandler(error);
      }
    };

    if (params !== "") {
      getUserDetails();
    }
  }, []);

  const mapRecentTasks = userDetails?.recent_tasks?.map((item) => (
    <div key={item.id} className="col-3 p-5">
      <div className="card">
        <div className="col">{item.id}</div>
        <div className="col">{item.date}</div>
      </div>
    </div>
  ));

  return (
    <div className="container mt-3 mb-5 pb-5">
      <div className="row">
        <h6>Dashboard</h6>
      </div>
      <div className="col fs-2 fw-bold">
        Welcome{" "}
        <span className="fs-2 user-name">{userDetails?.firstname},</span>
      </div>
      <div className="col fs-5 fw-bold">Recent Tasks</div>

      {userDetails?.recent_tasks?.length > 0 ? (
        <div className="row">{mapRecentTasks}</div>
      ) : null}
    </div>
  );
};

export default Dashboard;
