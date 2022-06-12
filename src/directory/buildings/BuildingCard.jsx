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
        <div className="row">
          <div className="col">
            <h2 className="">{building.building_name}</h2>
            <div className="fs-5">{building.building_description}</div>
          </div>
          <div className="col">
            <div className="row">
              {building.address_number} {building.street_name}
            </div>
            <div className="row">
              {building.city} {building.state}, {building.zipcode}
            </div>
            <div className="row">{building.country}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingCard;
