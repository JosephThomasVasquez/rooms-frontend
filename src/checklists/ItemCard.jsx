import React, { useState, useEffect } from "react";

const ItemCard = ({ item, handleClickedItem }) => {
  const [checked, setChecked] = useState(Object.values(item).toString());

  useEffect(() => {
    console.log(Object.values(item).join(""));
    setChecked(Object.values(item).join(""));
  }, [item]);

  const checkedStyle = {
    background: "red",
  };

  //   console.log(checked);
  return (
    <li
      name={Object.keys(item)[0]}
      className={`row border rounded shadow-sm my-1 p-2 list-unstyled ${
        checked == "false" ? "template-item-check" : "template-item"
      }`}
      onClick={() => handleClickedItem(item)}
      value={Object.keys(item)}
    >
      {Object.keys(item)}
    </li>
  );
};

export default ItemCard;
