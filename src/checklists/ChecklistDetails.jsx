import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { readChecklist } from "../utils/apiRequests";
import { CheckIcon, XIcon } from "@heroicons/react/solid";

const ChecklistDetails = () => {
  const { checklistId } = useParams();
  const [checklistDetails, setChecklistDetails] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setChecklistDetails(null);
    readChecklist(checklistId, abortController.signal)
      .then(setChecklistDetails)
      .catch((error) => {
        console.log(error);
      });
    console.log(checklistDetails);
    return () => abortController.abort();
  }, [checklistId]);

  const completedItems = () => {
    const filterCompleted = checklistDetails.items.filter((item) => {
      console.log(Object.values(item)[0]);
      return Object.values(item)[0] === true;
    });

    console.log(filterCompleted);

    const displayItems = filterCompleted.map((item) => (
      <div key={`item-id-${Object.keys(item)}`} className="col-3">
        <li className="list-unstyled">{Object.keys(item)}</li>
      </div>
    ));
    // console.log(items);

    return displayItems;
  };

  const missedItems = () => {
    const filterCompleted = checklistDetails.items.filter((item) => {
      console.log(Object.values(item)[0]);
      return Object.values(item)[0] === false;
    });

    // console.log(filterCompleted);

    const displayItems = filterCompleted.map((item) => (
      <div key={`item-id-${Object.keys(item)}`} className="col-3">
        <li className="list-unstyled">{Object.keys(item)}</li>
      </div>
    ));
    // console.log(items);

    return displayItems;
  };

  return (
    <div className="container">
      <h2>
        Checklist <span className="text-primary">{checklistDetails?.id}</span>
      </h2>
      <div className="row fs-5">
        <div className="col">Checklist: {checklistDetails?.checklist_name}</div>
        <div className="col">Location: {checklistDetails?.location}</div>
        <div className="col">
          Completed by: {checklistDetails?.completed_by}
        </div>
        <div className="col">
          Date Completed:
          {checklistDetails?.date_completed &&
            dayjs(checklistDetails?.date_completed).format("MMM DD, YYYY")}
        </div>
      </div>
      <div className="row mt-5 rounded-top shadow">
        <p className="d-flex align-items-center rounded-top shadow">
          <CheckIcon className="check-icon icon-bg-round-passed" />
          <span className="fs-4 ms-2">
            {checklistDetails?.passed
              ? checklistDetails?.passed.length
              : "none"}
          </span>
        </p>
        <ul className="row">{checklistDetails?.items && completedItems()}</ul>
      </div>
      <div className="row mt-5 rounded-top shadow">
        <p className="d-flex align-items-center rounded-top shadow">
          <XIcon className="x-icon icon-bg-round-missed" />
          <span className="fs-4 ms-2">
            {checklistDetails?.missed
              ? checklistDetails?.missed.length
              : "none"}
          </span>
        </p>
        <ul className="row">{checklistDetails?.items && missedItems()}</ul>
      </div>
    </div>
  );
};

export default ChecklistDetails;
