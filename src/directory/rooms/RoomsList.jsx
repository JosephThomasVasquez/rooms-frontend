import React, { useState, useEffect } from "react";
import { getRooms } from "../../utils/apiRequests";

const RoomsList = ({ errorHandler }) => {
  const [rooms, setRooms] = useState(null);

  // fetches checklists from the backend
  const loadRooms = () => {
    const abortController = new AbortController();
    getRooms(abortController.signal)
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

  //   const mapRooms = rooms?.map((room, index) => (
  //     <div key={room.id} className="col">
  //       {room.room_name}
  //     </div>
  //   ));

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
        "Details",
        "Edit",
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

    // console.log(roomsByBuilding);

    const arr = Array.from(roomsByBuilding);

    const buildingListOfRooms = [];

    for (let i = 0; i < arr.length; i++) {
      const filteredRooms = rooms?.filter((room) => {
        // console.log("ids:", building);
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
          </tr>
        );
      });

      const buildingsWithRooms = (
        <div key={arr[i]} className="row">
          <div className="col-3 mb-0 fw-light building-title shadow">
            <span className="ms-2">{arr[i]}</span>
          </div>
          <div className="row">
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

  return (
    <div className="container mt-3 mb-5 pb-5">
      <div className="row mb-3">
        <h2>Rooms</h2>
      </div>

      <div className="row">{roomRows()}</div>
    </div>
  );
};

export default RoomsList;
