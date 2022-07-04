import React, { useState, useEffect, createRef, useRef } from "react";
import { CSVLink, CSVDownload } from "react-csv";
import { getChecklists, generateChecklistCSV } from "../../utils/apiRequests";
import { isAuthenticated } from "../../utils/cookieHandler";
import {
  DocumentDownloadIcon,
  RefreshIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/solid";
import "./checklistCalendar.styles.css";

const ChecklistCalendar = ({ errorHandler }) => {
  // For the csv download handler
  const csvLink = useRef();

  const initialFormData = {
    startDate: "",
    endDate: "",
  };

  const [dateRanges, setDateRanges] = useState({ ...initialFormData });
  const [checklists, setChecklists] = useState();
  const [csvFile, setCSVFile] = useState([]);

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

  const fields = [
    { label: "ID", key: "id" },
    { label: "Checklist Name", key: "checklist_name" },
    { label: "Items", key: "items" },
    { label: "Location", key: "location" },
    { label: "Completed", key: "is_completed" },
    { label: "Completed By", key: "completed_by" },
    { label: "Date Completed", key: "date_completed" },
    { label: "Group", key: "group" },
    { label: "Account ID", key: "account_id" },
    { label: "Date Created", key: "created_at" },
    { label: "Date Updated", key: "updated_at" },
  ];

  const csvProperties = {
    filename: "checklists.csv",
    headers: fields,
    data: csvFile,
    target: "_blank",
  };

  // const generatedCSVData = () => {
  //   console.log("GENERATING DATA DATA DATA DATA DATA");
  //   // csvProperties.data = csvFile;
  //   // console.log("csv data:", csvProperties.data);
  // };

  // useEffect(generatedCSVData, [fields]);

  const handleChange = ({ target }) => {
    setDateRanges({ ...dateRanges, [target.name]: target.value });
  };

  // Get checklists fetch
  const handleGetChecklists = async (e) => {
    e.preventDefault();
    const abortController = new AbortController();

    // console.log(dateRanges);
    // console.log(checklists);

    const params = {
      ...isAuthenticated(),
      startDate: dateRanges.startDate,
      endDate: dateRanges.endDate,
    };

    // console.log("params", params);

    const response = await generateChecklistCSV(params)
      .then((data) => data)
      .catch((error) => errorHandler(error));

    console.log("response", response);

    if (response) {
      setCSVFile(response);

      csvProperties.data = response;
      console.log("csv data:", csvProperties.data);
      // csvLink.current.link.click();
    }

    return () => abortController.abort();
  };

  // console.log("csvFile", csvFile);

  const handleDownload = () => {
    console.log();
  };

  return (
    <div className="row calendar-form">
      <p className="row text-center">Download checklists as a .csv file.</p>

      <form className="rounded d-flex align-items-end px-2">
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
          <button
            type="button"
            onClick={handleGetChecklists}
            className="download-btn d-flex align-items-center justify-content-center me-3"
          >
            <RefreshIcon className="refresh-csv-icon" />
            <div>Load</div>
          </button>

          {csvFile.length > 0 ? (
            <div className="d-flex align-items-center">
              <ArrowNarrowRightIcon className="arrow-right-icon me-3" />
              <CSVLink
                data={csvFile}
                filename={"checklists.csv"}
                headers={fields}
                ref={csvLink}
                target="_blank"
                className="download-btn d-flex align-items-center justify-content-center"
                onClick={handleDownload}
              >
                <DocumentDownloadIcon className="download-csv-icon" />
                <div>.csv</div>
              </CSVLink>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default ChecklistCalendar;