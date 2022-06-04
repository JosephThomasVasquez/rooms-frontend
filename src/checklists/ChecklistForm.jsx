import React, { useState, useEffect } from "react";
import ChecklistTemplateSelector from "../checklistTemplates/ChecklistTemplateSelector";
import stringifyFields from "../utils/browserStorage";

const ChecklistForm = () => {
  const [templateItems, setTemplateItems] = useState(null);
  const [browserSavedItems, setBrowserSavedItems] = useState(null);

  const listTemplateItems = (templateId, templates) => {
    if (templates?.length > 0 && templateId) {
      const findTemplate = templates.find((template) => {
        return template.id === templateId;
      });

      setTemplateItems(findTemplate.items);
    }
  };

  const handleClickedItem = (item) => {
    console.log(item);
  };

  const mapTemplateItems = templateItems?.map((item) => (
    <li
      key={`template-item-id-${item}`}
      name={item}
      className="row border rounded shadow-sm my-1 p-2 list-unstyled template-item"
      onClick={() => handleClickedItem(item)}
      value={item}
    >
      {item}
    </li>
  ));

  return (
    <div className="container">
      <div className="row mb-3">
        <h2>New Checklist</h2>
      </div>
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-4">
          <label htmlFor="template-selector" className="mb-1">
            Choose Template
          </label>
          <ChecklistTemplateSelector
            anme="template-selector"
            listTemplateItems={listTemplateItems}
          />
        </div>
      </div>

      <div className="row fs-4 fw-bold">Rooms</div>
      <div>{templateItems && mapTemplateItems}</div>
    </div>
  );
};

export default ChecklistForm;
