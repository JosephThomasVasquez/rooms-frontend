import React, { useState, useEffect } from "react";
import ChecklistTemplateSelector from "../checklistTemplates/ChecklistTemplateSelector";

const ChecklistForm = () => {
  const [templateItems, setTemplateItems] = useState(null);

  const listTemplateItems = (templateId, templates) => {
    if (templates?.length > 0 && templateId) {
      const findTemplate = templates.find((template) => {
        return template.id === templateId;
      });

      setTemplateItems(findTemplate?.items);
    }
  };

  return (
    <div className="container">
      <div className="row mb-3">
        <h2>New Checklist</h2>
      </div>
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-4">
          <ChecklistTemplateSelector listTemplateItems={listTemplateItems} />
        </div>
      </div>

      <div className="row">Rooms</div>
      <div>{templateItems && templateItems}</div>
    </div>
  );
};

export default ChecklistForm;
