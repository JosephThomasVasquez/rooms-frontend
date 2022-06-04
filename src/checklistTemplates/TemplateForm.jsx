import React, { useState, useEffect } from "react";

const TemplateForm = () => {
  const [itemsList, setItemsList] = useState([]);
  const [createdItems, setCreatedItems] = useState([]);

  useEffect(() => {
    // console.log("XXXXXXXXXXX", itemsList);
    console.log("createdItems", createdItems);
  }, [itemsList, createdItems]);

  const createChecklistItem = (items) => {
    let itemsArray = [];
    if (items.length >= 1) {
      items.map((item) => {
        item = item.trim();

        let hasValidCharacters = new RegExp(/^[a-zA-Z0-9_.-]*$/);

        const isValid = hasValidCharacters.test(item);
        console.log(isValid);

        if (isValid) {
          itemsArray.push({ name: item, checked: false });
        } else {
          itemsArray.push({ name: "Invalid Characters", checked: false });
        }
      });

      setCreatedItems(itemsArray);
    } else if (items[0].name === "") {
      setCreatedItems("");
    }
  };

  const handleChange = ({ target }) => {
    const items = target.value.split(",");
    console.log("items", items);

    createChecklistItem(items);
  };

  const saveTemplate = () => {};

  return (
    <div className="container">
      <div className="row mb-3">
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
              id="template_name"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="template_description" className="form-label">
              Template Description
            </label>
            <input
              type="text"
              className="form-control"
              id="template_description"
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
              onChange={handleChange}
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
      <div className="row">{JSON.stringify(createdItems)}</div>
    </div>
  );
};

export default TemplateForm;
