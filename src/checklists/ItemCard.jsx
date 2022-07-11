import React, { useState, useEffect } from "react";
import { CheckIcon } from "@heroicons/react/solid";

const ItemCard = ({ item, index, isCompleted, handleClickedItem }) => {
  const [checked, setChecked] = useState(Object.values(item).toString());

  useEffect(() => {
    setChecked(Object.values(item).toString());
  }, [item]);

  return (
    <li
      name={Object.keys(item)[0]}
      className={`row border rounded my-1 p-2 list-unstyled ${
        checked == "true"
          ? "template-item-check shadow"
          : "template-item shadow-sm"
      }`}
      onClick={!isCompleted ? () => handleClickedItem(item) : null}
      value={Object.keys(item)}
    >
      <div className="d-flex align-items-center">
        {checked == "true" ? (
          <CheckIcon className="check-icon icon-bg-round-passed me-3" />
        ) : null}
        {`${index + 1}. ${Object.keys(item)}`}
      </div>
    </li>
  );
};

export default ItemCard;
