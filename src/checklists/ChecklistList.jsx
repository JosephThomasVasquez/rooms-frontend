import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/cookieHandler";
import { getChecklists } from "../utils/apiRequests";
import ChecklistCard from "./ChecklistCard";
import "./checklist.styles.css";

const ChecklistList = ({ errorHandler }) => {
  const location = useLocation();
  // console.log("location", location);
  const navigate = useNavigate();

  const [checklists, setChecklists] = useState(null);
  const [queryTerm, setQueryTerm] = useState("any");

  // fetches checklists from the backend
  const loadChecklists = () => {
    const abortController = new AbortController();
    getChecklists(queryTerm, abortController.signal)
      .then(setChecklists)
      .catch((error) => errorHandler(error));
    return () => abortController.abort();
  };

  useEffect(loadChecklists, [setChecklists, queryTerm]);

  const mapChecklists = checklists?.map((checklist) => (
    <div
      key={checklist.id}
      className="col-12 col-xl-3 col-lg-4 col-md-6 col-sm-12 checklist"
    >
      <ChecklistCard checklist={checklist} />
    </div>
  ));

  const handleChecklistFilter = ({ target }) => {
    // console.log("target:", target.value);
    // console.log(isAuthenticated().email);
    if (target.value === "user") {
      setQueryTerm(isAuthenticated().email);
      navigate(`/checklists?user=${queryTerm}`);
    }

    if (target.value === "all") {
      setQueryTerm("any");
      navigate(`/checklists?group=${queryTerm}`);
    }

    console.log(queryTerm);
  };

  return (
    <div className="container px-5">
      <div className="row mb-3">
        <h2>Checklists</h2>
      </div>

      <div className="d-flex align-items-center my-3">
        <div className="form-check me-4">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            value="user"
            onChange={handleChecklistFilter}
          />
          <label className="form-check-label" htmlFor="inlineRadio1">
            My Checklists
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio2"
            value="all"
            onChange={handleChecklistFilter}
          />
          <label className="form-check-label" htmlFor="inlineRadio2">
            All Checklists
          </label>
        </div>
      </div>

      <div className="row pb-5">{mapChecklists}</div>
    </div>
  );
};

export default ChecklistList;
