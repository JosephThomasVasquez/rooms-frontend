import React, { useState, useEffect } from "react";
import { getChecklists } from "../utils/apiRequests";

const ChecklistList = () => {
  const [checklists, setChecklists] = useState(null);
  const [checklistError, setChecklistError] = useState(null);

  useEffect(loadChecklists, []);

  // fetches tables from the backend
  function loadChecklists() {
    const abortController = new AbortController();
    getChecklists(abortController.signal)
      .then(setChecklists)
      .catch(setChecklistError);
    return () => abortController.abort();
  }

  return (
    <div className="container">
      <div className="row">
        <h2>ChecklistList</h2>
      </div>

      <div className="row">{JSON.stringify(checklists)}</div>
    </div>
  );
};

export default ChecklistList;
