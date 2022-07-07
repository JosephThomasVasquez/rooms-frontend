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
    { label: "Completed", key: "completed" },
    { label: "Missed", key: "missed" },
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

    if (!dateRanges.startDate)
      return errorHandler({ message: "Must enter a start date" });
    if (!dateRanges.endDate)
      return errorHandler({ message: "Must enter an end date" });

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
      // csvLink.current.link.click();
    }

    return () => abortController.abort();
  };

  // console.log("csvFile", csvFile);

  const handleDownload = () => {
    console.log();
  };

  return (
    <div className="row calendar-form mx-auto">
      <div className="row">
        <p className="col-12 col-sm-12 col-md-12 col-lg-6">
          Download checklists as a .csv file.
        </p>
      </div>

      <form className="row rounded d-flex align-items-end px-2">
        <div className="col-12 col-sm-12 col-md-3 col-lg-3 me-3">
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
        <div className="col-12 col-sm-12 col-md-3 col-lg-3">
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

        <div className="row mt-3">
          <div className="col-12 d-flex align-items-center">
            <button
              type="submit"
              onClick={handleGetChecklists}
              className="download-btn d-flex align-items-center justify-content-center me-3"
            >
              <RefreshIcon className="refresh-csv-icon" />
              <div>Load</div>
            </button>
            <div className="text-center">
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
                  <div className="mx-3 px-3 checklists-label d-flex align-items-center">
                    <span className="me-2 checklists-count">
                      {csvFile.length}
                    </span>
                    Checklists
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChecklistCalendar;
