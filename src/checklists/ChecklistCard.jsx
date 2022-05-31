import React from "react";
import dayjs from "dayjs";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import "./checklist.styles.css";

const ChecklistCard = ({ checklist }) => {
  const formattedDate = dayjs(checklist.date_completed).format("MMM DD, YYYY");

  return (
    <div className="card py-2 px-4 my-2 shadow">
      <div className="">
        <div className="row fs-5 fw-bold">{checklist.building_name}</div>
        <div className="row">{formattedDate}</div>
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
    </div>
  );
};

export default ChecklistCard;
