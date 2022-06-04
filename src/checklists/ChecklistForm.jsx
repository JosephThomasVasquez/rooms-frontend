import React, { useState, useEffect } from "react";
import ChecklistTemplateSelector from "../checklistTemplates/ChecklistTemplateSelector";
import stringifyFields from "../utils/browserStorage";
import { PlusSmIcon } from "@heroicons/react/outline";
import "./checklist.styles.css";

const ChecklistForm = () => {
  const initialChecklistData = {
    checklist_name: "",
    items: [],
    location: "",
    passed: [],
    missed: [],
    is_completed: false,
    completed_by: "",
  };

  const [newChecklist, setNewChecklist] = useState({ ...initialChecklistData });
  const [templateItems, setTemplateItems] = useState(null);
  const [browserSavedItems, setBrowserSavedItems] = useState(null);

  const listTemplateItems = (templateId, templates) => {
    if (templates?.length > 0 && templateId) {
      const findTemplate = templates.find((template) => {
        return template.id === templateId;
      });

      const checklistData = {
        checklist_name: findTemplate.template_name,
        items: findTemplate.items,
        location: findTemplate.location,
        passed: [],
        missed: [],
        is_completed: false,
        completed_by: "",
      };

      setNewChecklist(checklistData);

      // setTemplateItems(findTemplate.items);
    }
  };

  const handleClickedItem = (item) => {
    console.log(item);
  };

  const mapTemplateItems = newChecklist?.items.map((item) => (
    <li
      key={`template-item-id-${item}`}
      name={item}
      className="row border rounded shadow-sm ms-1 my-1 p-2 list-unstyled template-item"
      onClick={() => handleClickedItem(item)}
      value={item}
    >
      {item}
    </li>
  ));

  const handleCreateChecklist = () => {};

  return (
    <div className="container">
      <div className="row mb-3">
        <h2>New Checklist</h2>
      </div>

      <div className="row mb-3">
        <label htmlFor="template-selector" className="mb-1">
          Choose Template
        </label>
        <div className="row d-flex align-items-center">
          <div className="col-4">
            <ChecklistTemplateSelector
              anme="template-selector"
              listTemplateItems={listTemplateItems}
            />
          </div>
          <div className="col-2">
            <PlusSmIcon
              className="icon-create"
              onClick={handleCreateChecklist}
            />
          </div>
        </div>
        <div className="row ms-1">Location: {newChecklist.location}</div>
      </div>

      <div className="row fs-4 fw-bold ms-1">
        Items {`(${newChecklist.items.length})`}
      </div>
      {/* <div className="row">Location: {template}</div> */}
      <div>{newChecklist.items && mapTemplateItems}</div>
    </div>
  );
};

export default ChecklistForm;
