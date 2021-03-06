import React, { useState, useEffect, useId } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { isAuthenticated } from "../utils/cookieHandler";
import { nanoid } from "nanoid";
import dayjs from "dayjs";
import ChecklistTemplateSelector from "../checklistTemplates/ChecklistTemplateSelector";
import { createChecklist } from "../utils/apiRequests";
import { PlusSmIcon } from "@heroicons/react/outline";
import "./checklist.styles.css";

const ChecklistForm = ({ errorHandler }) => {
  const auth = useAuth();

  const navigate = useNavigate();

  const initialChecklistData = {
    checklist_name: "",
    items: [],
    location: "",
    is_completed: false,
    completed_by: "",
    group: "",
    date_completed: null,
  };

  const [newChecklist, setNewChecklist] = useState({ ...initialChecklistData });

  const listTemplateItems = (templateId, templates) => {
    if (templates?.length > 0 && templateId) {
      const findTemplate = templates.find((template) => {
        return template.id === templateId;
      });

      const createDateNow = dayjs().format("YYYY-MM-DD");

      const checklistData = {
        checklist_name: findTemplate.template_name,
        items: findTemplate.items,
        location: findTemplate.location,
        is_completed: false,
        completed_by: auth.user.email,
        group: "any",
        date_completed: createDateNow,
        account_id: isAuthenticated().account_id,
      };

      setNewChecklist(checklistData);
    }
  };

  // Create new Checklist
  const handleCreateChecklist = () => {
    const abortController = new AbortController();

    const makeChecklist = async () => {
      try {
        const response = await createChecklist(
          newChecklist,
          abortController.abort()
        );

        if (response) {
          const { date_completed, id } = response;

          const dateFormatted = dayjs(date_completed).format("YYYY-MM-DD");

          navigate(`/checklists/edit/${dateFormatted}/${id}`);
        }
      } catch (error) {
        return (error) => errorHandler(error);
      }
    };

    makeChecklist("");

    return () => abortController.abort();
  };

  const keyId = useId();

  const mapTemplateItems = newChecklist?.items.map((item, index) => (
    <li
      key={`template-item-id-${keyId}-${index}-${Object.keys(item)}`}
      name={Object.keys(item)}
      className="col-12 col-sm-12 col-md-4 col-lg-3 border rounded shadow-sm ms-1 my-1 py-2 list-unstyled template-item"
      value={Object.keys(item)}
    >
      <div className="row fw-bold">
        {index + 1}. <span className="col mx-1">{Object.keys(item)}</span>
      </div>
    </li>
  ));

  return (
    <div className="container mt-3 mb-5 pb-5">
      <div className="row mb-3">
        <h2>Create Checklist</h2>
      </div>

      <div className="row py-3 mb-5 bg-card">
        <label htmlFor="template-selector" className="mb-1 label-input">
          Choose Template:
        </label>
        <div className="row d-flex align-items-center">
          <div className="col-10 col-sm-10 col-md-10 col-lg-10">
            <ChecklistTemplateSelector
              name="template-selector"
              errorHandler={errorHandler}
              user={isAuthenticated()}
              listTemplateItems={listTemplateItems}
            />
          </div>
          <div className="col-2 col-sm-2 col-md-2 col-lg-2">
            <PlusSmIcon
              className="icon-create"
              onClick={handleCreateChecklist}
            />
          </div>
        </div>
        <div className="row fw-bold ms-1 mt-3">
          Location: {newChecklist.location}
        </div>
      </div>

      <div className="row fs-4 fw-bold ms-1 label-input">
        Items {`(${newChecklist.items.length})`}
      </div>
      {/* <div className="row">Location: {template}</div> */}
      <div className="row">{newChecklist.items && mapTemplateItems}</div>
    </div>
  );
};

export default ChecklistForm;
