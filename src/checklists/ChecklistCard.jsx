import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CheckIcon, XIcon, PencilAltIcon } from "@heroicons/react/solid";
import "./checklist.styles.css";

const ChecklistCard = ({ checklist }) => {
  dayjs.extend(relativeTime);
  const formattedDate = dayjs(checklist.date_completed).format("MMM DD, YYYY");
  const fromNow = dayjs(checklist.date_completed).fromNow();
  const urlDate = dayjs(checklist.date_completed).format("MM-DD-YYYY");

  const isCompleted = checklist.is_completed
    ? "link-color-completed"
    : "link-color";

  return (
    <div className="card py-2 px-4 my-2 shadow">
      <div className="row">
        <div className="col-10 fs-6 fw-bold">{checklist.checklist_name}</div>
        <div className="col-2">
          <PencilAltIcon className="check-icon" />
        </div>
      </div>
      <Link
        to={`${urlDate}/${checklist.id}`}
        className={`text-decoration-none ${isCompleted}`}
        state={checklist}
      >
        <div className="">
          <div className="col">{checklist.location}</div>
          <div className="col">{formattedDate}</div>

          {checklist.is_completed ? (
            <div className="col fw-light fst-italic">Completed {fromNow}</div>
          ) : null}

          <div className="col">{checklist.completed_by}</div>
          <div
            className={`d-flex align-items-center ${
              !checklist.is_completed ? "pt-4" : ""
            }`}
          >
            <div className="col-3">
              <CheckIcon className="check-icon" />
              {checklist.passed ? checklist.passed.length : "none"}
            </div>
            <div className="col-3">
              <XIcon className="x-icon" />
              {checklist.missed ? checklist.missed.length : "none"}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ChecklistCard;
