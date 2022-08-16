import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createRoom, readRoom, updateRoom } from "../../utils/apiRequests";
import BuildingSelector from "./BuildingSelector";
import roomImage from "./Allura - Chilling.png";

const CreateRoom = ({ errorHandler }) => {
  const { roomId } = useParams();

  const navigate = useNavigate();

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
    const validInputs = [
      "room_name",
      "room_type",
      "area_of_building",
      "floor",
      "max_capacity",
      "arrangement_type",
      "room_status",
      "building_id",
    ];

    if (validInputs.includes(target.name)) {
      setRoom({ ...room, [target.name]: target.value });
    }
  };

  useEffect(() => {
    const abortController = new AbortController();

    const getRoom = async () => {
      try {
        const response = await readRoom(roomId, abortController.signal);

        if (response) {
          setRoom(response);
        } else {
          setRoom({
            ...initialFormData,
          });
        }
      } catch (error) {
        errorHandler(error);
      }
    };

    if (roomId) {
      getRoom();
    } else {
      setRoom({
        ...initialFormData,
      });
    }

    return () => abortController.abort();
  }, [roomId]);

  const submitCreateRoom = (e) => {
    e.preventDefault();

    const abortController = new AbortController();

    const makeRoom = async () => {
      try {
        if (roomId) {
          const response = await updateRoom(room, abortController.signal);
          console.log("response roomId:", response);

          setRoom(response);
          errorHandler("");
          navigate("/rooms");
        }

        const response = await createRoom(room, abortController.signal);

        if (response) {
          setRoom(response);
          errorHandler("");
          navigate("/rooms");
        }
      } catch (error) {
        errorHandler(error);
      }
    };

    makeRoom();
  };

  return (
    <div className="container mt-3 mb-5 pb-5">
      <div className="row d-flex align-items-center mb-3">
        <h2>{roomId ? "Edit Room" : "Add Room"}</h2>
      </div>
      <div className="row py-3 mb-5 bg-card">
        <form className="form-group">
          <div className="row">
            <img
              src={roomImage}
              alt="Vector image of a room"
              className="login-img mx-auto mb-5"
            />
          </div>
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
                required
              />
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
              <BuildingSelector
                errorHandler={errorHandler}
                buildingId={room.building_id}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-sm-12 col-md-4 col-lg-4 mb-3">
              <label htmlFor="room_type" className="form-label label-input">
                Room Type
              </label>
              <input
                type="text"
                className="form-control"
                name="room_type"
                id="room_type"
                aria-describedby="room_type"
                placeholder="Meeting, Dining, Auditorium"
                onChange={handleInputChange}
                value={room.room_type}
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
                required
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
                min={1}
                max={99999999}
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
                Area of Building
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

          <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
              <label
                htmlFor="arrangement_type"
                className="form-label label-input"
              >
                Arrangement
              </label>
              <input
                type="text"
                className="form-control"
                name="arrangement_type"
                id="arrangement_type"
                aria-describedby="arrangement_type"
                onChange={handleInputChange}
                value={room.arrangement_type}
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
                {roomId ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
