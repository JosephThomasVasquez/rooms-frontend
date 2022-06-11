import React, { useState } from "react";
import dayjs from "dayjs";
import "./template.styles.css";

const TemplateCard = ({ template }) => {
  const formattedDate = dayjs(template.created_at).format("MMM DD, YYYY");
  return (
    <div className="card shadow">
      <div className="card-body">
        <div className="col fw-bold fs-5">{template?.template_name}</div>
        <hr />
        <div className="col">{template.template_description}</div>
        <div className="col">{template.items.length} items</div>
        <div className="col">{formattedDate}</div>
        <div className="col-12 d-flex mt-3">
          <button className="btn btn-outline-primary btn-card-fixed me-3">
            Edit
          </button>
          <button className="btn btn-outline-danger btn-card-fixed ms-auto">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;