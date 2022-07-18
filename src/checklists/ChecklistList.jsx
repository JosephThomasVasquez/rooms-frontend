import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { isAuthenticated } from "../utils/cookieHandler";
import { getChecklists } from "../utils/apiRequests";
import SearchForm from "../search/SearchForm";
import ChecklistCard from "./ChecklistCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import "./checklist.styles.css";
import createLoaders from "../layout/createLoaders";

const ChecklistList = ({ errorHandler }) => {
  const location = useLocation();

  const navigate = useNavigate();

  const [checklists, setChecklists] = useState(null);
  const [queryTerm, setQueryTerm] = useState({
    account: isAuthenticated().account_id,
    users: "any",
    skip: 0,
    limit: 30,
  });

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
    if (target.value === "user") {
      setQueryTerm({ ...queryTerm, users: isAuthenticated().email });
      navigate(
        `/checklists?account=${queryTerm.account}&user=${queryTerm.users}`
      );
    }

    if (target.value === "all") {
      setQueryTerm({ ...queryTerm, users: "any" });
      navigate(
        `/checklists?account=${queryTerm.account}&group=${queryTerm.users}`
      );
    }
  };

  return (
    <div className="container mt-3 mb-5 pb-5">
      <div className="row mb-3">
        <h2>Checklists</h2>
      </div>

      <div className="row d-flex align-items-center my-3">
        <div className="col-12 col-sm-4 col-md-2 col-lg-2 form-check me-4 mb-3">
          <input
            className="form-check-input custom-radio"
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
        <div className="col-12 col-sm-1 col-md-1 col-lg-1 form-check mb-3">
          <input
            className="form-check-input custom-radio"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio2"
            value="all"
            onChange={handleChecklistFilter}
            checked={queryTerm.users === "any"}
          />
          <label className="form-check-label" htmlFor="inlineRadio2">
            All
          </label>
        </div>
        <div className="col-12 col-sm-12 col-md-8 col-lg-6 mb-3">
          <SearchForm />
        </div>
      </div>

      <div className="row">
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center align-items-center">
            <Link to="/checklists?group=any" className="page-item" aria-label="Previous">
              <ChevronLeftIcon className="pagination-icon" />
            </Link>
            <Link to="/checklists?group=any" className="page-item">
              <div className="page-link">{`${queryTerm.skip} - ${queryTerm.limit}`}</div>
            </Link>

            <Link to="/checklists?group=any" className="page-item" aria-label="Next">
              <ChevronRightIcon className="pagination-icon" />
            </Link>
          </ul>
        </nav>
      </div>

      {!checklists ? (
        <div className="row pb-5">{createLoaders(12, "checklist")}</div>
      ) : (
        <div className="row pb-5">{mapChecklists}</div>
      )}
    </div>
  );
};

export default ChecklistList;
