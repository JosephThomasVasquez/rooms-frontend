import React, { useState, useEffect } from "react";
import { getChecklists } from "../utils/apiRequests";
import ChecklistCard from "./ChecklistCard";

const ChecklistList = () => {
  const [checklists, setChecklists] = useState(null);
  const [checklistError, setChecklistError] = useState(null);

  // fetches checklists from the backend
  const loadChecklists = () => {
    const abortController = new AbortController();
    getChecklists(abortController.signal)
      .then(setChecklists)
      .catch(setChecklistError);
    return () => abortController.abort();
  };

  useEffect(loadChecklists, []);

  const sortByBuildingNames = () => {
    for (let i = 0; i < checklists.length; i++) {
      if (checklists[i].building_name) {
      }
    }
  };

  const mapChecklists = checklists?.map((checklist) => (
    <div key={checklist.id} className="col-3">
      <ChecklistCard checklist={checklist} />
    </div>
  ));

  return (
    <div className="container">
      <div className="row mb-3">
        <h2>ChecklistList</h2>
      </div>

      <div className="row">{mapChecklists}</div>
    </div>
  );
};

export default ChecklistList;
