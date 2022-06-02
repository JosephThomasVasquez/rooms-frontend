import React from "react";

const BuildingCard = ({ building }) => {
  return (
    <div className="card rounded my-3 px-0 shadow">
      <img
        src={building.building_images[0]}
        className="card-img-top rounded-top"
        alt={`Image of ${building.building_name}`}
      ></img>
      <div className="card-body">
        <h2>{building.building_name}</h2>
      </div>
    </div>
  );
};

export default BuildingCard;
