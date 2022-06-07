import React, { useState } from "react";

const ItemCard = ({ item, handleClickedItem }) => {
  const [checked, setChecked] = useState(Object.values(item));

  //   console.log(checked);
  return (
    <li
      name={Object.keys(item)}
      className={`row border rounded shadow-sm my-1 p-2 list-unstyled ${
        !checked ? "template-item-check" : "template-item"
      }`}
      onClick={() => handleClickedItem(item)}
      value={Object.keys(item)}
    >
      {Object.keys(item)}
    </li>
  );
};

export default ItemCard;
