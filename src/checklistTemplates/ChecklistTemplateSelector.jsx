import React, { useState, useEffect } from "react";
import { getTemplates } from "../utils/apiRequests";

const ChecklistTemplateSelector = ({ listTemplateItems }) => {
  const [templates, setTemplates] = useState(null);
  const [templatesError, setTemplatesError] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState("");

  // fetches checklists from the backend
  const loadTemplates = () => {
    const abortController = new AbortController();
    getTemplates(abortController.signal)
      .then(setTemplates)
      .catch(setTemplatesError);
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
        className="form-select form-select-sm"
        aria-label=".form-select-sm example"
        onChange={handleSelectTemplate}
        // value={templateSelected}
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
