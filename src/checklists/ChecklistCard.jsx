import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import "./checklist.styles.css";

const ChecklistCard = ({ checklist }) => {
  dayjs.extend(relativeTime);
  const formattedDate = dayjs(checklist.date_completed).format("MMM DD, YYYY");
  const fromNow = dayjs(checklist.date_completed).fromNow();
  const urlDate = dayjs(checklist.date_completed).format("MM-DD-YYYY");

  return (
    <Link
      to={`${urlDate}/${checklist.id}`}
      className="card py-2 px-4 my-2 shadow text-decoration-none link-color"
      state={checklist}
    >
      <div className="">
        <div className="row fs-5 fw-bold">{checklist.building_name}</div>
        <div className="row">{formattedDate}</div>
        <div className="row fw-light">{fromNow}</div>
        <div className="row">{checklist.completed_by}</div>
        <div className="d-flex align-items-center">
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
  );
};

export default ChecklistCard;
