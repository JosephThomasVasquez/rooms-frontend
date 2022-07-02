import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../utils/cookieHandler";
import { getTemplates } from "../utils/apiRequests";

const ChecklistTemplateSelector = ({
  accountId,
  listTemplateItems,
  errorHandler,
}) => {
  const [templates, setTemplates] = useState(null);

  const [selectedTemplate, setSelectedTemplate] = useState("");

  console.log(accountId);

  // fetches checklists from the backend
  const loadTemplates = () => {
    const abortController = new AbortController();
    getTemplates(accountId, abortController.signal)
      .then(setTemplates)
      .catch((error) => errorHandler(error));
    return () => abortController.abort();
  };

  useEffect(loadTemplates, [setTemplates]);

  const mapTemplates = templates?.map((template) => (
    <option
      key={`template-id-${template.id}`}
      name={template.template_name}
      value={template.id}
    >
      {template.id} - {template.template_name} ({template.items.length})
    </option>
  ));

  //   HANDLERS
  const handleSelectTemplate = ({ target }) => {
    const templateId = target.options[target.selectedIndex].value;
    setSelectedTemplate(templateId);
  };

  useEffect(() => {
    listTemplateItems(Number(selectedTemplate), templates);
  }, [selectedTemplate]);

  return (
    <div>
      <select
        className="form-select form-select-sm fw-bold"
        aria-label=".form-select-sm example"
        onChange={handleSelectTemplate}
      >
        {mapTemplates}
        <option name="Sample Checklist" value="0">
          ... Create Template
        </option>
      </select>
    </div>
  );
};

export default ChecklistTemplateSelector;
