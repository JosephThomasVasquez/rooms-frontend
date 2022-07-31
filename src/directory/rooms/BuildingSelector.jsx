import React, { useState, useEffect } from "react";
import { getBuildings } from "../../utils/apiRequests";

const BuildingSelector = ({ errorHandler }) => {
  const [buildings, setBuildings] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState("");

  // fetches checklists from the backend
  const loadBuildings = () => {
    const abortController = new AbortController();

    const getBuildingsData = async () => {
      try {
        const response = await getBuildings(abortController.signal);
        console.log("buildings", response);

        if (response) {
          setBuildings(response);
        }
      } catch (error) {
        errorHandler(error);
      }
      return () => abortController.abort();
    };

    getBuildingsData();
  };

  useEffect(loadBuildings, [setBuildings]);

  const mapBuildings = buildings?.map((building) => (
    <option
      key={`building-id-${building.id}`}
      name={building.building_name}
      value={building.id}
    >
      {building.building_name}
    </option>
  ));

  //   HANDLERS
  const handleSelectBuilding = ({ target }) => {
    const buildingId = target.options[target.selectedIndex].value;
    setSelectedBuilding(buildingId);
  };

  return (
    <>
      <label htmlFor="building_id" className="form-label label-input">
        Building
      </label>
      <select
        className="form-select form-select-sm fw-bold"
        aria-label=".form-select-sm example"
        onChange={handleSelectBuilding}
      >
        {mapBuildings}
      </select>
    </>
  );
};

export default BuildingSelector;
