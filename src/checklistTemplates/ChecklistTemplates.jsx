import React, { useState, useEffect } from "react";
import { getTemplates } from "../utils/apiRequests";
import TemplateCard from "./TemplateCard";

const ChecklistTemplates = () => {
  const [templates, setTemplates] = useState(null);
  const [templatesError, setTemplatesError] = useState(null);

  // fetches Templates from the backend
  const loadTemplates = () => {
    const abortController = new AbortController();
    getTemplates(abortController.signal)
      .then(setTemplates)
      .catch(setTemplatesError);
    return () => abortController.abort();
  };

  useEffect(loadTemplates, [setTemplates]);

  const mapTemplates = templates?.map((template) => (
    <div key={template.id} className="col-12 my-2">
      <TemplateCard template={template} />
    </div>
  ));

  return (
    <div className="container">
      <div className="row mb-3">
        <h2 className="fw-bold">Templates</h2>
      </div>

      <div className="row">{mapTemplates}</div>
    </div>
  );
};

export default ChecklistTemplates;
