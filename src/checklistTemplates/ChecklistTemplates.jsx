import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import createLoaders from "../layout/createLoaders";
import { getTemplates, deleteTemplate } from "../utils/apiRequests";
import { isAuthenticated } from "../utils/cookieHandler";
import TemplateCard from "./TemplateCard";

const ChecklistTemplates = ({ errorHandler }) => {
  const navigate = useNavigate();

  const [templates, setTemplates] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState({});

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

  // Delete Template
  const handleDelete = async () => {
    const findTemplate = templates.find(
      (template) => template.id === selectedTemplate.id
    );

    try {
      if (findTemplate) {
        console.log("deleted!", selectedTemplate.id);
        await deleteTemplate(selectedTemplate);

        loadTemplates();
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  // Show Modal
  const showModal = ({ target }, template) => {
    console.log(template, target);
    setSelectedTemplate(template);
  };

  const mapTemplates = templates?.map((template) => (
    <div key={template.id} className="col-12 my-2">
      <TemplateCard
        user={user}
        template={template}
        showModal={showModal}
        errorHandler={errorHandler}
      />
    </div>
  ));

  const deleteConfirmationModal = (
    <div
      className="modal fade"
      id="deleteConfirmationModal"
      tabIndex="-1"
      aria-labelledby="deleteConfirmationModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteConfirmationModalLabel">
              Confirm Delete Item?
            </h5>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div>
              This operation cannot be undone. Are you sure you want to delete
              the template:{" "}
              <span className="fw-bold">{selectedTemplate.template_name}</span>{" "}
              ?
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mt-3 mb-5 pb-5">
      {deleteConfirmationModal}
      <div className="row mb-3">
        <h2 className="fw-bold">Templates</h2>
      </div>
      {!templates ? (
        <div className="row pb-5">{createLoaders(12, "template")}</div>
      ) : (
        <div className="row pb-5">{mapTemplates}</div>
      )}
    </div>
  );
};

export default ChecklistTemplates;
