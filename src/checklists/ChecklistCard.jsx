import React, { useState } from "react";
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

  const isCompleted = checklist.is_completed ? "checklist-completed" : "";

  const [displayItems, setDisplayItems] = useState(false);

  //   Filter completed items =================================================================
  const completedItems = () => {
    const filterCompleted = checklist.items.filter((item) => {
      return Object.values(item).toString() == "true";
    });

    const displayItems = filterCompleted.map((item) => (
      <div key={`item-id-${Object.keys(item)}`} className="col-3">
        <li className="list-unstyled">{Object.keys(item)}</li>
      </div>
    ));

    return displayItems;
  };

  //   Filter missed items =================================================================
  const missedItems = () => {
    const filterCompleted = checklist.items.filter((item) => {
      return Object.values(item).toString() == "false";
    });

    const displayItems = filterCompleted.map((item) => (
      <div key={`item-id-${Object.keys(item)}`} className="col-3">
        <li className="list-unstyled">{Object.keys(item)}</li>
      </div>
    ));

    return displayItems;
  };

  const handleShowItems = (display) => {
    setDisplayItems(display);
  };

  const displayMissed = () => {
    const filterCompleted = checklist.items.filter((item) => {
      return Object.values(item).toString() == "false";
    });

    const firstFive = filterCompleted.slice(0, 5);

    return firstFive.map((item) => (
      <li key={`item-id-${Object.keys(item)}-missed`}>
        <XIcon className="x-icon-sm" /> {Object.keys(item)[0]}
      </li>
    ));
  };

  return (
    <div className={`card py-2 px-4 my-2 shadow ${isCompleted}`}>
      <div className="row">
        <div className="col-10 fs-6 fw-bold">{checklist.checklist_name}</div>
        <Link
          to={`/checklists/edit/${urlDate}/${checklist.id}`}
          className="col-2"
        >
          <PencilAltIcon className="checklist-edit-icon" />
        </Link>
      </div>
      <Link
        to={`${urlDate}/${checklist.id}`}
        className="text-decoration-none link-color"
        state={checklist}
      >
        <div className="">
          <div className="col">{checklist.location}</div>
          <div className="col">
            {formattedDate === "Invalid Date" ? "Not completed" : formattedDate}
          </div>

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
              {checklist.items ? completedItems().length : "none"}
            </div>
            <div
              className="col-3"
              onMouseOver={
                missedItems().length > 0 ? () => handleShowItems(true) : null
              }
              onMouseOut={() => handleShowItems(false)}
              onTouchStart={
                missedItems().length > 0 ? () => handleShowItems(true) : null
              }
              onTouchEnd={() => handleShowItems(false)}
            >
              <XIcon className="x-icon" />
              {checklist.items ? missedItems().length : "none"}
            </div>
            <ul
              className={displayItems ? "display-items shadow" : "hide-items"}
            >
              {displayItems ? displayMissed() : null}
            </ul>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ChecklistCard;
