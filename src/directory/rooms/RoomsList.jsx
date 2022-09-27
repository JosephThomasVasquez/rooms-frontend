import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRooms } from "../../utils/apiRequests";
import { isAuthenticated } from "../../utils/cookieHandler";

const RoomsList = ({ errorHandler }) => {
  const user = isAuthenticated();

  // console.log(user);

  const [rooms, setRooms] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState({});

  // fetches checklists from the backend
  const loadRooms = () => {
    const abortController = new AbortController();
    getRooms(user.email, abortController.signal)
      .then((rooms) => {
        const buildings = {};

        rooms.forEach(({ building_name }) => {
          const filterRooms = rooms.filter((room) => {
            return room.building_name === building_name;
          });

          buildings[building_name] = filterRooms;
        });

        setRooms([...rooms]);
      })
      .catch((error) => errorHandler(error));
    return () => abortController.abort();
  };

  useEffect(loadRooms, [setRooms]);

  const tableHeaders = () => {
    if (rooms?.length > 0) {
      let headers = [
        "ID",
        "Floor",
        "Room",
        "Type",
        "Area",
        "Cap",
        "Status",
        "Building",
        "Edit",
        "Delete",
      ];

      const values = headers.map((head) => (
        <th scope="col" key={head} className="checklist-title">
          {head[0].toUpperCase() + head.slice(1)}
        </th>
      ));

      return values;
    }
  };

  // ------------------------------------------------------------------------------------------------
  const roomRows = () => {
    const roomsByBuilding = new Set();

    // Generate building Names
    rooms?.forEach((room) => {
      roomsByBuilding.add(room.building_name);
    });

    const arr = Array.from(roomsByBuilding);

    const buildingListOfRooms = [];

    for (let i = 0; i < arr.length; i++) {
      const filteredRooms = rooms?.filter((room) => {
        return room.building_name === arr[i];
      });

      // Generate row
      const roomsMapped = filteredRooms?.map((room, index) => {
        return (
          <tr key={index} scope="row">
            <td colSpan="1" className="align-middle">
              {room.id}
            </td>
            <td colSpan="1" className="align-middle">
              {room.floor}
            </td>
            <td colSpan="1" className="align-middle">
              {room.room_name}
            </td>
            <td colSpan="1" className="align-middle">
              {room.room_type}
            </td>
            <td colSpan="1" className="align-middle">
              {room.area_of_building}
            </td>
            <td colSpan="1" className="align-middle">
              {room.max_capacity}
            </td>
            <td colSpan="1" className="align-middle">
              {room.room_status}
            </td>
            <td colSpan="1" className="align-middle">
              {room.building_name}
            </td>
            <td colSpan="1" className="align-middle">
              <Link to={`/account/admin/rooms/edit/${room.id}`}>
                <PencilIcon className="room-edit-icon" />
              </Link>
            </td>
            <td colSpan="1" className="align-middle">
              <TrashIcon
                className="x-icon"
                data-bs-toggle="modal"
                data-bs-target="#deleteConfirmationModal"
                value={room.room_name}
                onClick={(e) => showModal(e, room)}
              />
            </td>
          </tr>
        );
      });

      const buildingsWithRooms = (
        <div key={arr[i]} className="row">
          <div className="col-3 mb-0 fw-light building-title shadow">
            <span className="ms-2">{arr[i]}</span>
          </div>
          <div className="row table-responsive">
            <table className="bg-card-rooms table shadow">
              <thead>
                <tr>{tableHeaders()}</tr>
              </thead>
              <tbody>{roomsMapped}</tbody>
            </table>
          </div>
        </div>
      );

      buildingListOfRooms.push(buildingsWithRooms);
    }

    return buildingListOfRooms;
  };

  // Delete Room
  const handleDelete = async () => {
    const findRoom = rooms.find((room) => room.id === selectedRoom.id);

    try {
      if (findRoom) {
        console.log("deleted!", selectedRoom.id);
        // await deleteRoom(selectedRoom);

        loadRooms();
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  // Show Modal
  const showModal = ({ target }, room) => {
    console.log(room, target);
    setSelectedRoom(room);
  };

  const deleteConfirmationModal = (
    <div
      className="modal fade"
      id="deleteConfirmationModal"
      tabIndex="-1"
      aria-labelledby="deleteConfirmationModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteConfirmationModalLabel">
              Confirm Delete Item?
            </h5>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div>
              This operation cannot be undone. Are you sure you want to delete
              the template:{" "}
              <span className="fw-bold">{selectedRoom.room_name}</span> ?
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mt-3 mb-5 pb-5">
      {deleteConfirmationModal}
      <div className="row mb-3">
        <h2>Rooms</h2>
      </div>

      <div className="row">{roomRows()}</div>
    </div>
  );
};

export default RoomsList;
