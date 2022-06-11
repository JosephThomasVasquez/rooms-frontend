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

  return (
    <div className="container pb-5">
      <div className="row ps-3 card py-4 shadow-sm mb-4">
        <h2 className="ps-0">
          Checklist{" "}
          <span className="percent-completed">{checklistDetails?.id}</span>
        </h2>
        <div className="row">Checklist: {checklistDetails?.checklist_name}</div>
        <div>
          <div className="row">Location: {checklistDetails?.location}</div>
          <div className="row">
            Completed by: {checklistDetails?.completed_by}
          </div>
          <div className="row">
            Date Completed:
            {checklistDetails?.date_completed &&
              dayjs(checklistDetails?.date_completed).format("MMM DD, YYYY")}
          </div>
        </div>
      </div>
      <div className="">
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
      </div>
    </div>
  );
};

export default EditChecklist;
