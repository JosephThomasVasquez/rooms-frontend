import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import {
  readChecklist,
  updateChecklist,
  updateChecklistComplete,
} from "../utils/apiRequests";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import { ClipboardCheckIcon } from "@heroicons/react/outline";
import ItemCard from "./ItemCard";

const EditChecklist = () => {
  const { checklistId } = useParams();
  const params = useParams();

  const [checklistDetails, setChecklistDetails] = useState(null);
  const [percentChecked, setPercentChecked] = useState(0);
  const [checkedItems, setCheckedItems] = useState([]);
  const isMounted = useRef(false);

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
          setChecklistDetails(response);
        }
      } catch (error) {}
    };

    if (!checklistDetails) {
      getChecklist();
    }

    return () => abortController.abort();
  }, [checklistId]);

  //   Update percentage and setCheckedItems =================================================================

  useEffect(() => {
    if (checklistDetails?.items?.length > 0) {
      setCheckedItems([...checklistDetails.items]);

      const itemsCompleted = checklistDetails.items.reduce((total, item) => {
        if (Object.values(item).toString() == "true") {
          total += 1;
        }
        return total;
      }, 0);

      const percentage = (itemsCompleted / checklistDetails.items.length) * 100;

      setPercentChecked(percentage.toFixed());
    }
  }, [checklistDetails]);

  const createItems = () => {
    return checkedItems?.map((item) => (
      <ItemCard
        key={`checklist-item-id-${Object.keys(item)}`}
        item={item}
        handleClickedItem={handleClickedItem}
      />
    ));
  };

  const handleClickedItem = (item) => {
    // Validate if item exists
    // const isExistingItem = checklistDetails?.items?.find((i) => i === item);

    // Find index of checked item
    const findChecked = checkedItems?.findIndex((i) => i === item);

    const updatedArray = [...checkedItems];

    // Switch to true
    if (Object.values(checkedItems[findChecked]).toString() === "false") {
      updatedArray[findChecked] = { [Object.keys(item).toString()]: true };
    }

    // Switch to false
    if (Object.values(checkedItems[findChecked]).toString() === "true") {
      updatedArray[findChecked] = { [Object.keys(item).toString()]: false };
    }
    const updatedChecklist = { ...checklistDetails, items: updatedArray };

    setCheckedItems(updatedArray);
    setChecklistDetails(updatedChecklist);

    saveChecked(updatedChecklist);
  };

  const saveChecked = (checklist) => {
    console.log("saving...", checklist);
    const abortController = new AbortController();

    const updateChecklistItems = async () => {
      try {
        const response = await updateChecklist(
          checklist,
          abortController.signal
        );

        if (response) {
          console.log("UPDATE response", response);
          setChecklistDetails(response);
        }
      } catch (error) {}
    };

    updateChecklistItems();
  };

  const completeChecklist = (checklist) => {
    console.log("Completed Checklist saving...", checklist);
    const abortController = new AbortController();

    const setChecklistComplete = async () => {
      try {
        const response = await updateChecklist(
          checklist,
          abortController.signal
        );

        if (response) {
          console.log("UPDATE response", response);
          setChecklistDetails(response);
        }
      } catch (error) {}
    };

    setChecklistComplete();
  };

  const handleCompleteChecklist = () => {
    // setChecklistDetails({ ...checklistDetails, is_completed: true });

    const setComplete = { ...checklistDetails, is_completed: true };
    console.log("setComplete!", setComplete);

    completeChecklist(setComplete);
  };

  return (
    <div className="container pb-5">
      <div className="row ps-3 card py-4 shadow-sm mb-4">
        {checklistDetails?.is_completed ? (
          <span className="col-6 is-completed">completed</span>
        ) : (
          <span className="col-6 is-completed">in progress</span>
        )}
        <h2 className="col ps-2 checklist-title">
          {checklistDetails?.checklist_name} <span className="fs-6">#</span>
          <span className="percent-completed">{checklistDetails?.id}</span>
        </h2>

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

      <div className="">
        <div className="d-flex justify-content-center pt-3 fw-bold fs-4">
          <span className="me-2">{percentChecked}%</span>
          <span className="percent-completed">Complete</span>
        </div>
      </div>

      <div className="row mt-5 rounded-top shadow">
        <ul className="bg-checklist-edit fs-5">
          {checkedItems && createItems()}
        </ul>
      </div>

      <div className="row">
        <div
          className={`d-flex justify-content-center align-items-center ${
            !checklistDetails?.is_completed
              ? "checklist-complete-btn"
              : "checklist-complete-btn-finished"
          }`}
          onClick={handleCompleteChecklist}
        >
          <ClipboardCheckIcon className="icon-checklist-complete" />
          <div>
            {!checklistDetails?.is_completed ? "Submit" : "Completed"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditChecklist;
