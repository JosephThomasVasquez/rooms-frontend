import React, { useState, useEffect } from "react";
import { getBuildings } from "../../utils/apiRequests";

const BuildingSelector = ({
  errorHandler,
  buildingId,
  handleBuildingSelector,
}) => {
  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState("");

  // Load buildings
  const loadBuildings = () => {
    const abortController = new AbortController();

    const getBuildingsData = async () => {
      try {
        const response = await getBuildings(abortController.signal);

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

  // Set the selected building if buildingId exists
  useEffect(() => {
    if (buildingId) {
      setSelectedBuilding(buildingId);
    }
  }, [buildingId]);

  const mapBuildings = buildings?.map((building) => (
    <option
      key={`building-id-${building.id}`}
      name={building.building_name}
      value={building.id}
    >
      {building.building_name}
    </option>
  ));

  //   Handle Selected Building from options selector
  const handleSelectBuilding = ({ target }) => {
    const buildingId = target.options[target.selectedIndex].value;
    setSelectedBuilding(buildingId);
    handleBuildingSelector(buildingId);
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
        value={selectedBuilding ? selectedBuilding : 1}
        required
      >
        {mapBuildings}
      </select>
    </>
  );
};

export default BuildingSelector;
