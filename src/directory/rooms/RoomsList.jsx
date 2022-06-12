import React, { useState, useEffect } from "react";
import { getRooms } from "../../utils/apiRequests";

const RoomsList = ({ errorHandler }) => {
  const [rooms, setRooms] = useState(null);
  const [roomsError, setRoomsError] = useState(null);

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
        <th scope="col" key={head} className="text-primary">
          {head[0].toUpperCase() + head.slice(1)}
        </th>
      ));

      return values;
    }
  };

  const roomRows = () => {
    return rooms?.map((room, index) => {
      const {
        id,
        floor,
        room_name,
        room_type,
        area_of_building,
        max_capacity,
        room_status,
        building_id,
        building_name,
      } = room;
      //   console.log(room);

      return (
        <tr key={index} scope="row">
          <td colSpan="1" className="align-middle">
            {id}
          </td>
          <td colSpan="1" className="align-middle">
            {floor}
          </td>
          <td colSpan="1" className="align-middle">
            {room_name}
          </td>
          <td colSpan="1" className="align-middle">
            {room_type}
          </td>
          <td colSpan="1" className="align-middle">
            {area_of_building}
          </td>
          <td colSpan="1" className="align-middle">
            {max_capacity}
          </td>
          <td colSpan="1" className="align-middle">
            {room_status}
          </td>
          <td colSpan="1" className="align-middle">
            {building_name}
          </td>
        </tr>
      );
    });
  };

  <table>
    <tr>
      <th>Company</th>
      <th>Contact</th>
      <th>Country</th>
    </tr>
    <tr>
      <td>Alfreds Futterkiste</td>
      <td>Maria Anders</td>
      <td>Germany</td>
    </tr>
    <tr>
      <td>Centro comercial Moctezuma</td>
      <td>Francisco Chang</td>
      <td>Mexico</td>
    </tr>
  </table>;

  return (
    <div className="container">
      <div className="row mb-3">
        <h2>Rooms</h2>
      </div>

      <table className="table shadow rounded">
        <thead>
          <tr>{tableHeaders()}</tr>
        </thead>
        <tbody>{roomRows()}</tbody>
      </table>
    </div>
  );
};

export default RoomsList;
