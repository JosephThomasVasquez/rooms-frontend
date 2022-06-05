import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { readChecklist } from "../utils/apiRequests";
import { CheckIcon, XIcon } from "@heroicons/react/solid";

const EditChecklist = () => {
  const { checklistId } = useParams();
  const params = useParams();
  console.log("params", params);
  const [checklistDetails, setChecklistDetails] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setChecklistDetails(null);

    const getChecklist = async () => {
      try {
        const response = await readChecklist(
          checklistId,
          abortController.signal
        );

        if (response) {
          console.log("response", response);
          setChecklistDetails(response);
        }
      } catch (error) {}
    };

    getChecklist();

    return () => abortController.abort();
  }, [checklistId]);

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
        <ul className="row">
          {checklistDetails?.passed &&
            checklistDetails?.passed.map((item) => (
              <div key={`item-id-${item}`} className="col-3">
                <li className="list-unstyled">{item}</li>
              </div>
            ))}
        </ul>
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
        <ul className="row">
          {checklistDetails?.missed &&
            checklistDetails?.missed.map((item) => (
              <div key={`item-id-${item}`} className="col-3">
                <li className="list-unstyled">{item}</li>
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default EditChecklist;
