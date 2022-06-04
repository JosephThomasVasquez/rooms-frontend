import React, { useState, useEffect } from "react";

const TemplateForm = () => {
  const [itemsList, setItemsList] = useState([]);
  const [createdItems, setCreatedItems] = useState([]);

  useEffect(() => {
    // console.log("XXXXXXXXXXX", itemsList);
    console.log("createdItems", createdItems);
  }, [itemsList, createdItems]);

  const remap = (items) => {
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
    // setItemsList(items);
    console.log("items", items);

    remap(items);
  };

  const saveTemplate = () => {
    // createChecklistItems(itemsList);
    // console.log(itemsList);
  };

  return (
    <div className="container">
      <div className="row mb-3">
        <h2>New Template</h2>
      </div>
      <div className="row d-flex justify-content-center align-items-center mb-5">
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Insert items separated by comma's here"
            id="floatingTextarea"
            onChange={handleChange}
          ></textarea>
          <label htmlFor="floatingTextarea" className="ms-2">
            Items...
          </label>
        </div>
      </div>

      <div className="row fs-4 fw-bold">
        <div className="col-1">Items</div>
        <div className="col-8">
          <button
            type="button"
            className="btn btn-primary"
            onClick={saveTemplate}
          >
            Save
          </button>
        </div>
      </div>
      <div className="row">{JSON.stringify(createdItems)}</div>
    </div>
  );
};

export default TemplateForm;
