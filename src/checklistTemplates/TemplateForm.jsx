import React, { useState, useEffect } from "react";
import { createTemplate } from "../utils/apiRequests";
import { isAuthenticated } from "../utils/cookieHandler";

const TemplateForm = ({ user, errorHandler }) => {
  const initialFormData = {
    template_name: "",
    template_description: "",
    items: [],
    location: "",
    created_by: user?.email,
    group: "any",
    account_id: isAuthenticated().account_id,
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
      errorHandler(error);
    }

    return () => abortController.abort();
  };

  useEffect(() => {
    console.log("createdItems", createdItems);
    setNewTemplate({ ...newTemplate, items: createdItems });

    console.log("newTemplate", newTemplate);
  }, [createdItems]);

  const createChecklistItem = (items) => {
    let itemsArray = [];

    if (items.length >= 1) {
      items.map((item) => {
        item = item.trim();

        let hasValidCharacters = new RegExp(/^[0-9A-Za-z\s\-\_\']+$/);
        // let hasValidCharacters = new RegExp(/^[a-zA-Z0-9_.-]*$/);

        const isValid = hasValidCharacters.test(item);
        console.log("isValid", isValid);

        if (isValid && isValid !== ",") {
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

  const handleChecked = ({ target }) => {
    if (newTemplate.group === "any") {
      setNewTemplate({ ...newTemplate, [target.name]: "private" });
    } else {
      setNewTemplate({ ...newTemplate, [target.name]: "any" });
    }
  };

  const handleChecklistItem = ({ target }) => {
    const items = target.value.split(",");
    // console.log("items", items);

    const filterItems = items.filter((item) => {
      const itemTrimmed = item.trim();

      return itemTrimmed !== "";
    });

    createChecklistItem(filterItems);
  };

  const saveTemplate = (e) => {
    e.preventDefault();
    createNewTemplate();
  };

  const mapItems = () => {
    if (createdItems?.length > 0) {
      return createdItems?.map((item) => (
        <div
          key={Object.keys(item).toString()}
          className="col-12 col-sm-12 col-md-4 col-lg-3"
        >
          {Object.keys(item).toString()}
        </div>
      ));
    } else {
      return null;
    }
  };

  return (
    <div className="container mt-3 mb-5 pb-5">
      <div className="row d-flex align-items-center mb-3">
        <h2>New Template</h2>
      </div>
      <div className="row py-3 mb-5 bg-card">
        <form>
          <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
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
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
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
          </div>
          <div className="col-12 mb-3">
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

          <div className="col-12">
            <label htmlFor="floatingTextarea" className="ms-2">
              Insert Items
            </label>
            <textarea
              className="form-control"
              placeholder="Insert items separated by comma's here i.e. item1, item2, item3..."
              id="floatingTextarea"
              rows="4"
              onChange={handleChecklistItem}
            ></textarea>
          </div>
          <div className="row d-flex align-items-center mt-3">
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 my-3">
              <button type="submit" className="save-btn" onClick={saveTemplate}>
                Save
              </button>
            </div>

            <div className="col-1 col-sm-1 col-md-1 col-lg-1 form-check ms-2">
              <input
                type="checkbox"
                name="group"
                className="form-check-input custom-checked"
                id="sharable-check"
                onChange={handleChecked}
                checked={newTemplate.group === "any"}
              />
              <label className="form-check-label" htmlFor="sharable-check">
                {newTemplate.group === "private" ? "Share" : "Sharing"}
              </label>
            </div>
          </div>
        </form>
      </div>

      <div className="row fs-4 fw-bold">
        <div className="col-1">Items</div>
      </div>
      {/* <div className="row">{JSON.stringify(newTemplate)}</div> */}
      <div className="row">Items: {mapItems()}</div>
    </div>
  );
};

export default TemplateForm;
