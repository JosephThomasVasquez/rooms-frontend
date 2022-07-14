import React, { useState } from "react";
import { deleteTemplate } from "../utils/apiRequests";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import "./template.styles.css";

const TemplateCard = ({ user, template, showModal, errorHandler }) => {
  const formattedDate = dayjs(template.created_at).format("MMM DD, YYYY");

  return (
    <div className="card shadow">
      {/* {deleteConfirmationModal} */}
      <div className="card-body">
        <div className="row d-flex align-items-center">
          <div className="col-9 fw-bold fs-5">{template?.template_name}</div>
          <div className="col-12 col-sm-2 col-md-2 col-lg-2 fw-bold badge rounded-pill bg-badge p-2 me-3 ms-auto">
            {template?.group === "any" ? "Sharing" : ""}
          </div>
        </div>
        <hr />
        <div className="col">{template.template_description}</div>
        <div className="col">{template.items.length} items</div>
        <div className="col">{template.created_by}</div>
        <div className="col">{formattedDate}</div>

        {user.email === template.created_by ? (
          <div className="col-12 d-flex mt-3">
            <Link
              to={`/checklist-templates/${template.id}/edit`}
              className="template-edit-btn btn-card-fixed py-1"
            >
              Edit
            </Link>
            <button
              className="btn btn-outline-danger btn-card-fixed ms-auto"
              data-bs-toggle="modal"
              data-bs-target="#deleteConfirmationModal"
              value={template.template_name}
              onClick={(e) => showModal(e, template)}
            >
              Delete
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TemplateCard;
