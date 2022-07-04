import React, { useState, useEffect } from "react";
import { getChecklists, generateChecklistCSV } from "../../utils/apiRequests";
import { isAuthenticated } from "../../utils/cookieHandler";
import { DocumentDownloadIcon } from "@heroicons/react/solid";
import "./checklistCalendar.styles.css";

const ChecklistCalendar = ({ errorHandler }) => {
  const initialFormData = {
    startDate: "",
    endDate: "",
  };

  const [dateRanges, setDateRanges] = useState({ ...initialFormData });
  const [checklists, setChecklists] = useState();
  const [csvFile, setCSVFile] = useState();

  // fetches checklists from the backend
  const loadChecklists = () => {
    const abortController = new AbortController();
    getChecklists(
      { account: isAuthenticated().account_id, users: "any" },
      abortController.signal
    )
      .then(setChecklists)
      .catch((error) => errorHandler(error));
    return () => abortController.abort();
  };

  useEffect(loadChecklists, [setChecklists]);

  const handleChange = ({ target }) => {
    setDateRanges({ ...dateRanges, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const abortController = new AbortController();

    console.log(dateRanges);
    console.log(checklists);

    const params = {
      ...isAuthenticated(),
      startDate: dateRanges.startDate,
      endDate: dateRanges.endDate,
    };

    console.log("params", params);

    generateChecklistCSV(params)
      .then(setCSVFile)
      .catch((error) => errorHandler(error));
    return () => abortController.abort();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded d-flex align-items-end calendar-form px-2"
    >
      <div className="col-3 me-3">
        <label htmlFor="startDate" className="form-label">
          Start Date
        </label>
        <input
          type="date"
          className="form-control"
          name="startDate"
          id="startDate"
          onChange={handleChange}
          value={dateRanges.startDate}
          required
        />
      </div>
      <div className="col-3">
        <label htmlFor="endDate" className="form-label">
          End Date
        </label>
        <input
          type="date"
          className="form-control"
          name="endDate"
          id="endDate"
          onChange={handleChange}
          value={dateRanges.endDate}
          required
        />
      </div>

      <div className="col-6 ms-3 d-flex align-items-center">
        <button type="submit" className="download-btn">
          <DocumentDownloadIcon className="download-csv-icon" />
          .csv
        </button>
        <p className="ms-3 my-auto">Download checklists as a .csv file.</p>
      </div>
    </form>
  );
};

export default ChecklistCalendar;
