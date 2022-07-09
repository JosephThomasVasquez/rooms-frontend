import React, { useState, useEffect } from "react";
import { getTemplates } from "../utils/apiRequests";
import { isAuthenticated } from "../utils/cookieHandler";
import TemplateCard from "./TemplateCard";

const ChecklistTemplates = ({ errorHandler }) => {
  const [templates, setTemplates] = useState(null);
  const [user, setUser] = useState(null);

  // fetches Templates from the backend
  const loadTemplates = () => {
    const abortController = new AbortController();

    const getChecklistTemplates = async () => {
      setUser(isAuthenticated());
      try {
        const response = await getTemplates(
          isAuthenticated(),
          abortController.signal
        );

        if (response) {
          setTemplates(response);
        }
      } catch (error) {
        errorHandler(error);
      }
      return () => abortController.abort();
    };

    getChecklistTemplates();
  };

  useEffect(loadTemplates, [setTemplates]);

  const mapTemplates = templates?.map((template) => (
    <div key={template.id} className="col-12 my-2">
      <TemplateCard user={user} template={template} />
    </div>
  ));

  return (
    <div className="container mt-3 mb-5 pb-5">
      <div className="row mb-3">
        <h2 className="fw-bold">Templates</h2>
      </div>

      <div className="row">{mapTemplates}</div>
    </div>
  );
};

export default ChecklistTemplates;
