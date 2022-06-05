import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { readChecklist } from "../utils/apiRequests";
import { CheckIcon, XIcon } from "@heroicons/react/solid";

const EditChecklist = () => {
  const { checklistId } = useParams();
  const params = useParams();

  const initialCheckedItems = null;

  const [checklistDetails, setChecklistDetails] = useState(null);
  const [percentChecked, setPercentChecked] = useState(0);
  const [checkedItems, setCheckedItems] = useState({ ...initialCheckedItems });

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

  useEffect(() => {
    if (checklistDetails?.items?.length > 0) {
      const percentage = (2 / checklistDetails.items.length) * 100;
      console.log(percentage);
      makeCheckedItems();
      setPercentChecked(percentage.toFixed());
    }
  }, [checklistDetails]);

  const makeCheckedItems = async () => {
    const items = await checklistDetails.items;

    const mappedItems = {};

    if (items) {
      console.log("items:", items);
      items.map((i) => {
        return (mappedItems[i] = false);
      });

      setCheckedItems({ ...mappedItems });
    }
  };

  const handleClickedItem = (item) => {
    console.log("Search for:", item);

    const isExistingItem = checklistDetails.items.find((i) => i === item);

    console.log("item Exists >>>", isExistingItem);

    if (item === isExistingItem) {
      const toggleClicked = (checkedItems[item] = !checkedItems[item]);

      setCheckedItems({
        ...checkedItems,
        [checkedItems[item]]: !checkedItems[item],
      });
    }

    console.log(checkedItems);
  };

  const mapItems = checklistDetails?.items?.map((item) => (
    <li
      key={`checklist-item-id-${item}`}
      name={item}
      className={`row border rounded shadow-sm my-1 p-2 list-unstyled ${
        checkedItems[item] ? "template-item-check" : "template-item"
      }`}
      onClick={() => handleClickedItem(item)}
      value={item}
    >
      {item}
    </li>
  ));

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
        <div className="row">{JSON.stringify(checkedItems)}</div>
        {/* <CheckIcon className="check-icon icon-bg-round-passed" /> */}
        <ul className="fs-4">{checklistDetails && mapItems}</ul>
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
