import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getChecklists } from "../../utils/adminApiRequests";
import { isAuthenticated } from "../../utils/cookieHandler";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import dayjs from "dayjs";
import "../../checklists/checklist.styles.css";
import ChecklistCalendar from "./ChecklistCalendar";

const Checklists = ({ errorHandler }) => {
  const location = useLocation();

  const [checklists, setChecklists] = useState(null);
  const [queryTerm, setQueryTerm] = useState({
    account: isAuthenticated().account_id,
    users: "any",
    page: 1,
    skip: 0,
    limit: 5,
  });

  // fetches checklists from the backend
  const loadChecklists = () => {
    const abortController = new AbortController();

    const getChecklistsData = async () => {
      try {
        const response = await getChecklists(queryTerm, abortController.signal);

        console.log(response);

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

  const tableHeaders = () => {
    if (checklists?.length > 0) {
      let headers = [
        "ID",
        "NAME",
        "USER",
        "LOCATION",
        "DATE",
        "% COMPLETE",
        "COMPLETED",
        "STATUS",
      ];

      const values = headers.map((head, index) => (
        <th
          scope="col"
          key={`header=${head + index}`}
          className="table-headers text-center align-middle"
        >
          {head[0].toUpperCase() + head.slice(1)}
        </th>
      ));

      return values;
    }
  };

  const checklistRows = () => {
    return checklists?.map((list, index) => {
      const {
        id,
        checklist_name,
        completed_by,
        location,
        items,
        is_completed,
        date_completed,
      } = list;

      const urlDate = dayjs(date_completed).format("MM-DD-YYYY");

      const itemsCompleted = list.items.reduce((total, item) => {
        if (Object.values(item).toString() == "true") {
          total += 1;
        }
        return total;
      }, 0);

      const percentage = ((itemsCompleted / list.items.length) * 100).toFixed();

      return (
        <tr
          key={`checklist-id-${id}`}
          scope="row"
          className={
            percentage === "100" ? "row-max-complete table-row-text" : ""
          }
        >
          <td
            colSpan="1"
            className="d-flex justify-content-center align-middle"
          >
            {id}
          </td>
          <td colSpan="1" className="align-middle table-row-text">
            <Link
              to={`/checklists/edit/${urlDate}/${id}`}
              className="table-row"
            >
              {checklist_name}
            </Link>
          </td>
          <td colSpan="1" className="align-middle table-row-text">
            {completed_by}
          </td>
          <td colSpan="1" className="align-middle table-row-text">
            {location}
          </td>
          <td colSpan="1" className="align-middle table-row-text text-center">
            {dayjs(date_completed).format("MMM DD, YYYY")}
          </td>
          <td
            colSpan="1"
            className={
              percentage === "100"
                ? "align-middle table-row-text text-center row-complete"
                : "align-middle table-row-text text-center"
            }
          >
            {percentage}%
          </td>
          <td
            colSpan="1"
            className={
              percentage === "100"
                ? "align-middle table-row-text text-center row-complete"
                : "align-middle table-row-text text-center"
            }
          >
            {`${
              items?.filter((item) => Object.values(item).toString() === "true")
                .length
            }/${items?.length}`}
          </td>
          <td colSpan="1" className="text-center">
            {is_completed ? (
              <CheckIcon className="check-icon icon-bg-round-passed" />
            ) : (
              "in progress"
            )}
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="container mt-3 mb-5 pb-5">
      <div className="row mb-3">
        <h2>Checklists</h2>
      </div>
      <div className="row mb-3 bg-card">
        <ChecklistCalendar errorHandler={errorHandler} />
      </div>

      <div className="row bg-card">
        <table className="table-sm fw-light table-base shadow rounded">
          <thead>
            <tr>{tableHeaders()}</tr>
          </thead>
          <tbody>{checklistRows()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Checklists;
