import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getChecklists } from "../utils/apiRequests";
import ChecklistCard from "./ChecklistCard";
import "./checklist.styles.css";

const ChecklistList = ({ errorHandler }) => {
  const location = useLocation();
  // console.log("location", location);

  const [checklists, setChecklists] = useState(null);

  // fetches checklists from the backend
  const loadChecklists = () => {
    const abortController = new AbortController();
    getChecklists("any", abortController.signal)
      .then(setChecklists)
      .catch((error) => errorHandler(error));
    return () => abortController.abort();
  };

  useEffect(loadChecklists, [setChecklists]);

  const mapChecklists = checklists?.map((checklist) => (
    <div
      key={checklist.id}
      className="col-12 col-xl-3 col-lg-4 col-md-6 col-sm-12 checklist"
    >
      <ChecklistCard checklist={checklist} />
    </div>
  ));

  return (
    <div className="container px-5">
      <div className="row mb-3">
        <h2>Checklists</h2>
      </div>

      <div className="row">{mapChecklists}</div>
    </div>
  );
};

export default ChecklistList;
