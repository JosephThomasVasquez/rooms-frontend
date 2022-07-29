import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CreateRoom = () => {
  const { roomId } = useParams();

  const initialFormData = {
    room_name: "",
    room_type: "",
    area_of_building: "",
    floor: 1,
    max_capacity: 1,
    arrangement_type: "",
    room_status: "Active",
    room_images: `[]`,
    building_id: 1,
    account_id: 1,
  };

  const [room, setRoom] = useState({ ...initialFormData });

  const handleInputChange = ({ target }) => {
    const validInputs = ["template_name", "template_description", "location"];

    if (validInputs.includes(target.name)) {
      setRoom({ ...room, [target.name]: target.value });
    }
  };

  const submitCreateRoom = (e) => {
    e.preventDefault();
    // createNewTemplate();
  };

  return (
    <div className="container mt-3 mb-5 pb-5">
      <div className="row d-flex align-items-center mb-3">
        <h2>{roomId ? "Edit Room" : "Add Room"}</h2>
      </div>
      <div className="row py-3 mb-5 bg-card">
        <form>
          <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
              <label htmlFor="room_name" className="form-label label-input">
                Room Name
              </label>
              <input
                type="text"
                className="form-control"
                name="room_name"
                id="room_name"
                aria-describedby="room-name"
                onChange={handleInputChange}
                value={room.room_name}
              />
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
              <label htmlFor="building_id" className="form-label label-input">
                Building
              </label>
              <input
                type="text"
                className="form-control"
                name="building_id"
                id="building_id"
                aria-describedby="building_id"
                onChange={handleInputChange}
                value={room.building_id}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-sm-12 col-md-4 col-lg-4 mb-3">
              <label htmlFor="room_type" className="form-label label-input">
                Room Type
              </label>
              <input
                type="number"
                className="form-control"
                name="room_type"
                id="room_type"
                aria-describedby="room_type"
                onChange={handleInputChange}
                value={room.max_capacity}
              />
            </div>
            <div className="col-6 col-sm-6 col-md-2 col-lg-2 mb-3">
              <label htmlFor="floor" className="form-label label-input">
                Floor
              </label>
              <input
                type="number"
                className="form-control"
                name="floor"
                id="floor"
                aria-describedby="floor"
                onChange={handleInputChange}
                value={room.floor}
              />
            </div>
            <div className="col-6 col-sm-6 col-md-3 col-lg-3 mb-3">
              <label htmlFor="max_capacity" className="form-label label-input">
                Max Capacity
              </label>
              <input
                type="number"
                className="form-control"
                name="max_capacity"
                id="max_capacity"
                aria-describedby="max_capacity"
                onChange={handleInputChange}
                value={room.max_capacity}
              />
            </div>

            <div className="col-12 col-sm-12 col-md-2 col-lg-2 mb-3">
              <label
                htmlFor="area_of_building"
                className="form-label label-input"
              >
                Area
              </label>
              <input
                type="text"
                className="form-control"
                name="area_of_building"
                id="area_of_building"
                aria-describedby="area_of_building"
                onChange={handleInputChange}
                value={room.area_of_building}
              />
            </div>
          </div>

          <div className="row d-flex align-items-center mt-3">
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 my-3">
              <button
                type="submit"
                className="save-btn"
                onClick={submitCreateRoom}
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="row fs-4 fw-bold">
        <div className="col-1">Items</div>
      </div>
      {/* <div className="row">{JSON.stringify(newTemplate)}</div> */}
    </div>
  );
};

export default CreateRoom;
