import React, { useState, useEffect } from "react";
import { createTemplate } from "../utils/apiRequests";

const TemplateForm = ({ user }) => {
  const initialFormData = {
    template_name: "",
    template_description: "",
    items: [],
    location: "",
    created_by: user.email,
  };

  const [newTemplate, setNewTemplate] = useState({ ...initialFormData });
  const [createdItems, setCreatedItems] = useState(null);

  // fetches checklists from the backend
  const createNewTemplate = async () => {
    const abortController = new AbortController();

    try {
      const response = await createTemplate(
        newTemplate,
        abortController.abort()
      );

      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }

    return () => abortController.abort();
  };

  useEffect(() => {
    // console.log("XXXXXXXXXXX", itemsList);
    console.log("createdItems", createdItems);
    setNewTemplate({ ...newTemplate, items: createdItems });

    console.log("newTemplate", newTemplate);
  }, [createdItems]);

  const createChecklistItem = (items) => {
    let itemsArray = [];
    if (items.length >= 1) {
      items.map((item) => {
        item = item.trim();

        let hasValidCharacters = new RegExp(/^[a-zA-Z0-9_.-]*$/);

        const isValid = hasValidCharacters.test(item);
        console.log("isValid", isValid);

        if (isValid) {
          itemsArray.push({ [item]: false });
          // itemsArray.push(item);
        } else {
          // itemsArray.push({ name: "Invalid Characters", checked: false });
          itemsArray.push("Invalid Characters");
        }
      });

      setCreatedItems(itemsArray);
    } else if (items[0].name === "") {
      setCreatedItems(null);
    }
  };

  const handleInputChange = ({ target }) => {
    const validInputs = ["template_name", "template_description", "location"];

    if (validInputs.includes(target.name)) {
      setNewTemplate({ ...newTemplate, [target.name]: target.value });
    }
  };

  const handleChecklistItem = ({ target }) => {
    const items = target.value.split(",");
    console.log("items", items);

    createChecklistItem(items);
  };

  const saveTemplate = (e) => {
    e.preventDefault();
    createNewTemplate();
  };

  return (
    <div className="container">
      <div className="row d-flex align-items-center mb-3">
        <h2>New Template</h2>
      </div>
      <div className="row mb-5">
        <form>
          <div className="mb-3">
            <label htmlFor="template_name" className="form-label">
              Template Name
            </label>
            <input
              type="text"
              className="form-control"
              name="template_name"
              id="template_name"
              aria-describedby="template-name"
              onChange={handleInputChange}
              value={newTemplate?.template_name}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="template_description" className="form-label">
              Template Description
            </label>
            <input
              type="text"
              className="form-control"
              name="template_description"
              id="template_description"
              aria-describedby="template-description"
              onChange={handleInputChange}
              value={newTemplate?.template_description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              name="location"
              id="location"
              aria-describedby="location"
              onChange={handleInputChange}
              value={newTemplate?.location}
            />
          </div>

          <div className="col">
            <label htmlFor="floatingTextarea" className="ms-2">
              Insert Items
            </label>
            <textarea
              className="form-control"
              placeholder="Insert items separated by comma's here i.e. item1, item2, item3..."
              id="floatingTextarea"
              onChange={handleChecklistItem}
            ></textarea>
          </div>
          <div className="row d-flex align-items-center mt-3">
            <div className="col-1">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={saveTemplate}
              >
                Save
              </button>
            </div>

            <div className="col-1 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="sharable-check"
              />
              <label className="form-check-label" htmlFor="sharable-check">
                Sharable
              </label>
            </div>
          </div>
        </form>
      </div>

      <div className="row fs-4 fw-bold">
        <div className="col-1">Items</div>
      </div>
      <div className="row">{JSON.stringify(newTemplate)}</div>
    </div>
  );
};

export default TemplateForm;
