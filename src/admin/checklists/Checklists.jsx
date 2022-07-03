import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getChecklists } from "../../utils/apiRequests";
import { isAuthenticated } from "../../utils/cookieHandler";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import dayjs from "dayjs";
import "../../checklists/checklist.styles.css";

const Checklists = ({ errorHandler }) => {
  const location = useLocation();
  // console.log("location", location);

  const [checklists, setChecklists] = useState(null);

  // fetches checklists from the backend
  const loadChecklists = () => {
    const abortController = new AbortController();
    getChecklists(
      { account: isAuthenticated().account_id, users: "any" },
      abortController.signal
    )
      .then(setChecklists)
      .catch((error) => errorHandler(error));
    return () => abortController.abort();
  };

  useEffect(loadChecklists, [setChecklists]);

  const tableHeaders = () => {
    if (checklists?.length > 0) {
      let headers = [
        "ID",
        "NAME",
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
        location,
        items,
        is_completed,
        date_completed,
      } = list;
      //   console.log(room);
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
          className={percentage === "100" ? "row-max-complete" : ""}
        >
          <td
            colSpan="1"
            className="d-flex justify-content-center align-middle"
          >
            {id}
          </td>
          <td colSpan="1" className="align-middle">
            <Link
              to={`/checklists/edit/${urlDate}/${id}`}
              className="table-row"
            >
              {checklist_name}
            </Link>
          </td>
          <td colSpan="1" className="align-middle">
            {location}
          </td>
          <td colSpan="1" className="align-middle text-center">
            {dayjs(date_completed).format("MMM DD, YYYY")}
          </td>
          <td
            colSpan="1"
            className={
              percentage === "100"
                ? "align-middle text-center row-complete"
                : "align-middle text-center"
            }
          >
            {percentage}%
          </td>
          <td
            colSpan="1"
            className={
              percentage === "100"
                ? "align-middle text-center row-complete"
                : "align-middle text-center"
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
    <div className="container px-5">
      <div className="row mb-3">
        <h2>Checklists</h2>
      </div>

      <table className="table table-base shadow rounded">
        <thead>
          <tr>{tableHeaders()}</tr>
        </thead>
        <tbody>{checklistRows()}</tbody>
      </table>
    </div>
  );
};

export default Checklists;
