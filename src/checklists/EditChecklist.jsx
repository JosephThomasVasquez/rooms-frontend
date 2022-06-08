import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { readChecklist, updateChecklist } from "../utils/apiRequests";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
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
          console.log("response", response);
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
    // console.log(target.name);
    console.log(item);

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
    console.log("Updated checklist items:", updatedChecklist);

    setCheckedItems(updatedArray);
    setChecklistDetails(updatedChecklist);

    saveChecked(updatedChecklist);

    // console.log(checklistDetails);
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
      <div className="row fw-bold">{percentChecked}% Completed</div>
      <div className="row mt-5 rounded-top shadow">
        {/* <div className="row">{JSON.stringify(checkedItems)}</div> */}
        <ul className="fs-4">{checkedItems && createItems()}</ul>
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
