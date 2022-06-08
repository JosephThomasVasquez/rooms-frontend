import React, { useState, useEffect } from "react";
import { getBuildings } from "../../utils/apiRequests";
import BuildingCard from "./BuildingCard";

const BuildingsList = ({ errorHandler }) => {
  const [buildings, setBuildings] = useState(null);
  const [buildingsError, setBuildingsError] = useState(null);

  // fetches checklists from the backend
  const loadBuildings = () => {
    const abortController = new AbortController();
    getBuildings(abortController.signal)
      .then(setBuildings)
      .catch(setBuildingsError);
    return () => abortController.abort();
  };

  useEffect(loadBuildings, [setBuildings]);

  const mapBuildings = buildings?.map((building, index) => (
    <BuildingCard key={building.id} building={building} />
  ));

  return (
    <div className="container">
      <div className="row mb-3">
        <h2>Buildings</h2>
      </div>

      <div className="row">{mapBuildings}</div>
    </div>
  );
};

export default BuildingsList;
