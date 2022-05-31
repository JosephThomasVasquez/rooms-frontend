import React, { useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";

const NavMenu = () => {
  const [openNav, setOpenNav] = useState(false);

  console.log(openNav);
  const menuRef = useRef();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="#">
          Rooms
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/dashboard"
                className="nav-link active"
                aria-current="page"
                href="#"
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/checklists"
                className="nav-link"
                aria-current="page"
                href="#"
              >
                Checklists
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink
                    to="/checklists"
                    className="dropdown-item"
                    aria-current="page"
                    href="#"
                  >
                    Checklists
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/checklists/create"
                    className="dropdown-item"
                    aria-current="page"
                    href="#"
                  >
                    New Checklist
                  </NavLink>
                </li>
                <li>className="dropdown-divider"></li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled">Disabled</a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
