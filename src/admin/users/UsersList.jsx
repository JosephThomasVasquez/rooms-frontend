import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAccountUsers } from "../../utils/apiRequests";
import { isAuthenticated } from "../../utils/cookieHandler";
// import { CheckIcon, XIcon } from "@heroicons/react/solid";
import dayjs from "dayjs";
import "../../checklists/checklist.styles.css";

const UsersList = ({ errorHandler }) => {
  const [accountUsers, setAccountUsers] = useState(null);

  // fetches checklists from the backend
  const loadAccountUsers = () => {
    const adminUser = isAuthenticated();

    const abortController = new AbortController();
    getAccountUsers(adminUser, abortController.signal)
      .then(setAccountUsers)
      .catch((error) => errorHandler(error));
    return () => abortController.abort();
  };

  useEffect(loadAccountUsers, [setAccountUsers]);

  const tableHeaders = () => {
    if (accountUsers?.length > 0) {
      let headers = [
        "ID",
        "EMAIL",
        "FIRSTNAME",
        "LASTNAME",
        "ROLE",
        "CREATED",
        "EDIT",
        "DELETE",
      ];

      const values = headers.map((head, index) => (
        <th
          scope="col"
          key={`header=${head + index}`}
          className="table-headers text-center align-middle"
        >
          {head[0].toUpperCase() + head.slice(1)}
        </th>
      ));

      return values;
    }
  };

  const usersRows = () => {
    const usersArray = Array.from(accountUsers);

    return usersArray?.map((user, index) => {
      const { id, email, firstname, lastname, role, created_at } = user;

      const urlDate = dayjs(created_at).format("MM-DD-YYYY");

      return (
        <tr key={`checklist-id-${id}`} scope="row">
          <td
            colSpan="1"
            className="d-flex justify-content-center align-middle"
          >
            {id}
          </td>
          <td colSpan="1" className="align-middle text-center">
            {email}
          </td>
          <td colSpan="1" className="align-middle text-center">
            <Link to={`/account/users/${id}`} className="table-row">
              {firstname}
            </Link>
          </td>
          <td colSpan="1" className="align-middle text-center">
            {lastname}
          </td>
          <td colSpan="1" className="align-middle text-center">
            {role}
          </td>
          <td colSpan="1" className="align-middle text-center">
            {dayjs(created_at).format("MMM DD, YYYY")}
          </td>
          <td colSpan="1" className="align-middle text-center">
            <Link to={`/account/users/${id}`} className="table-row">
              (Edit)
            </Link>
          </td>
          <td colSpan="1" className="align-middle text-center">
            <Link to={`/account/users/${id}`} className="table-row">
              (Del)
            </Link>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="container px-5">
      <div className="row mb-3">
        <h2>Users</h2>
      </div>

      {accountUsers && (
        <table className="table table-base shadow rounded">
          <thead>
            <tr>{tableHeaders()}</tr>
          </thead>
          {/* <div>{JSON.stringify(accountUsers)}</div> */}
          <tbody>{usersRows()}</tbody>
        </table>
      )}
    </div>
  );
};

export default UsersList;
