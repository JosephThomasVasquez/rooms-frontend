import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { readChecklist } from "../utils/apiRequests";
import { CheckIcon, XIcon, PencilAltIcon } from "@heroicons/react/solid";

const ChecklistDetails = ({ errorHandler }) => {
  const { checklistId } = useParams();
  const [checklistDetails, setChecklistDetails] = useState(null);

  const urlDate = dayjs(checklistDetails?.date_completed).format("MM-DD-YYYY");

  useEffect(() => {
    const abortController = new AbortController();
    setChecklistDetails(null);
    readChecklist(checklistId, abortController.signal)
      .then(setChecklistDetails)
      .catch((error) => errorHandler(error));

    return () => abortController.abort();
  }, [checklistId]);

  //   Filter completed items =================================================================
  const completedItems = () => {
    const missedArray = [];

    const filterCompleted = checklistDetails.items.filter((item) => {
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
    const filterCompleted = checklistDetails?.items?.filter((item) => {
      return Object.values(item).toString() == "false";
    });

    const displayItems = filterCompleted.map((item) => (
      <div key={`item-id-${Object.keys(item)}`} className="col-3">
        <li className="list-unstyled">{Object.keys(item)}</li>
      </div>
    ));

    return displayItems;
  };

  return (
    <div className="container">
      <div className="row ps-3 card py-4 shadow-sm mb-4">
        <div className="d-flex align-items-center">
          <h2 className="col checklist-title">
            {checklistDetails?.checklist_name} <span className="fs-6">#</span>
            <span className="percent-completed">{checklistDetails?.id}</span>
          </h2>
          <Link
            to={`/checklists/edit/${urlDate}/${checklistDetails?.id}`}
            className="col-2 ms-3 mb-2"
          >
            <PencilAltIcon className="checklist-edit-icon" />
          </Link>
        </div>
        {checklistDetails?.is_completed ? (
          <span className="col-6 is-completed">completed</span>
        ) : (
          <span className="col-6 is-completed">in progress</span>
        )}

        <div>
          <div className="row">
            <div className="col-2 fst-italic">Location: </div>
            <div className="col">{checklistDetails?.location}</div>
          </div>

          <div className="row">
            <div className="col-2 fst-italic">
              {checklistDetails?.is_completed
                ? "Completed by:"
                : "Assigned to:"}
            </div>
            <div className="col">{checklistDetails?.completed_by}</div>
          </div>

          <div className="row">
            <div className="col-2 fst-italic">Created:</div>
            <div className="col-2 fst-italic">
              {checklistDetails?.date_completed &&
                dayjs(checklistDetails?.date_completed).format("MMM DD, YYYY")}
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5 rounded-top shadow">
        <p className="d-flex align-items-center rounded-top shadow">
          <CheckIcon className="check-icon icon-bg-round-passed" />
          <span className="fs-4 ms-2">
            {checklistDetails?.items ? completedItems().length : "none"}
          </span>
          <span className="ms-2 fst-italic">complete</span>
        </p>
        <ul className="row">{checklistDetails?.items && completedItems()}</ul>
      </div>
      <div className="row mt-5 rounded-top shadow">
        <p className="d-flex align-items-center rounded-top shadow">
          <XIcon className="x-icon icon-bg-round-missed" />
          <span className="fs-4 ms-2">
            {checklistDetails?.items ? missedItems().length : "none"}
          </span>
          <span className="ms-2 fst-italic">incomplete</span>
        </p>
        <ul className="row">{checklistDetails?.items && missedItems()}</ul>
      </div>
    </div>
  );
};

export default ChecklistDetails;
