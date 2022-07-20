import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { isAuthenticated } from "../utils/cookieHandler";
import { getChecklists, getCount } from "../utils/apiRequests";
import SearchForm from "../search/SearchForm";
import ChecklistCard from "./ChecklistCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import "./checklist.styles.css";
import createLoaders from "../layout/createLoaders";

const ChecklistList = ({ errorHandler }) => {
  const location = useLocation();

  const navigate = useNavigate();

  const user = isAuthenticated().email;

  const [checklistCount, setChecklistCount] = useState({
    count: null,
    currentTotal: null,
  });
  const [checklists, setChecklists] = useState(null);
  const [queryTerm, setQueryTerm] = useState({
    account: isAuthenticated().account_id,
    users: user ? user : "any",
    page: 1,
    skip: 0,
    limit: 10,
    count: checklistCount.count,
  });

  useEffect(() => {
    const abortController = new AbortController();

    const getChecklistCount = async () => {
      try {
        const response = await getCount(queryTerm, abortController.signal);

        if (response) {
          const currentCount = queryTerm.page * queryTerm.limit;
          setChecklistCount({
            ...checklistCount,
            count: response.count,
            currentTotal: currentCount,
          });
        }
      } catch (error) {
        errorHandler(error);
      }
      return () => abortController.abort();
    };

    getChecklistCount();
  }, [queryTerm]);

  // fetches checklists from the backend
  const loadChecklists = () => {
    const abortController = new AbortController();

    const getChecklistsData = async () => {
      try {
        const response = await getChecklists(queryTerm, abortController.signal);

        if (response) {
          setChecklists(response);
        }
      } catch (error) {
        errorHandler(error);
      }
      return () => abortController.abort();
    };

    getChecklistsData();
  };

  useEffect(loadChecklists, [setChecklists, queryTerm]);

  useEffect(() => {
    if (queryTerm.users === "any") {
      navigate(`/checklists?group=any&page=${queryTerm.page}`);
    }
    if (queryTerm.users !== "any") {
      navigate(
        `/checklists?user=${isAuthenticated().email}&page=${queryTerm.page}`
      );
    }
  }, [queryTerm.page, queryTerm]);

  const mapChecklists = checklists?.map((checklist) => (
    <div
      key={checklist.id}
      className="col-12 col-xl-3 col-lg-4 col-md-6 col-sm-12 checklist"
    >
      <ChecklistCard checklist={checklist} />
    </div>
  ));

  const handlePageChange = ({ target }) => {
    if (
      target.id === "nextPage" &&
      checklistCount.currentTotal <= checklistCount.count
    ) {
      setQueryTerm({ ...queryTerm, page: (queryTerm.page += 1) });
    }

    if (target.id === "previousPage" && queryTerm.page > 1) {
      setQueryTerm({ ...queryTerm, page: (queryTerm.page -= 1) });
    }
  };

  const handleChecklistFilter = ({ target }) => {
    if (target.value === "user") {
      setQueryTerm({ ...queryTerm, users: isAuthenticated().email });
      navigate(
        `/checklists?account=${queryTerm.account}&user=${
          queryTerm.users
        }&page=${1}`
      );
    }

    if (target.value === "all") {
      setQueryTerm({ ...queryTerm, users: "any" });
      navigate(
        `/checklists?account=${queryTerm.account}&group=${
          queryTerm.users
        }&page=${1}`
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
        <div aria-label="Page navigation example">
          <ul className="pagination justify-content-center align-items-center">
            <ChevronLeftIcon
              className="page-item pagination-icon"
              name="previousPage"
              id="previousPage"
              onClick={handlePageChange}
            />

            <div className="page-item">
              <div className="px-3">{`${
                checklistCount.currentTotal <= 10 ? "0" : ""
              }${checklistCount.currentTotal - queryTerm.limit + 1} - ${
                checklistCount.currentTotal
              }`}</div>
            </div>

            <ChevronRightIcon
              className={`page-item pagination-icon`}
              aria-label="Next"
              name="nextPage"
              id="nextPage"
              onClick={handlePageChange}
            />
          </ul>
          {JSON.stringify(checklistCount)}
        </div>
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
