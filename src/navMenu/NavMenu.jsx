import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { SearchIcon } from "@heroicons/react/solid";
import { useAuth } from "../auth/useAuth";
import { isAuthenticated } from "../utils/cookieHandler";
import "./navMenu.styles.css";

const NavMenu = () => {
  const [openNav, setOpenNav] = useState(false);
  const [user, setUser] = useState(null);

  const auth = useAuth();

  const isUser = auth.getLoggedInUser();

  useEffect(() => {
    if (isUser) {
      setUser(isUser);
    }
  }, [auth.getLoggedInUser()]);

  // console.log(openNav);
  const menuRef = useRef();

  const activeStyle = {
    backgroundColor: "#0088cc",
  };

  return (
    <nav className="ps-5 navbar navbar-expand-lg navbar-dark bg-dark py-3">
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

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Directory
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink
                    to="/rooms"
                    className="dropdown-item"
                    aria-current="page"
                    href="#"
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                  >
                    Rooms
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/buildings"
                    className="dropdown-item"
                    aria-current="page"
                    href="#"
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                  >
                    Buildings
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
              </ul>
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
                Checklists
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink
                    to="/checklists/create"
                    className="dropdown-item"
                    aria-current="page"
                    href="#"
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                  >
                    New Checklist
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/checklists"
                    className="dropdown-item"
                    aria-current="page"
                    href="#"
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                  >
                    Checklists
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <NavLink
                    to="/checklist-templates/create"
                    className="dropdown-item"
                    aria-current="page"
                    href="#"
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                  >
                    New Template
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/checklist-templates"
                    className="dropdown-item"
                    aria-current="page"
                    href="#"
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                  >
                    Templates
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
          <form className="d-flex align-items-center me-5" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <SearchIcon className="search-icon" type="submit" />
          </form>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto me-5 mb-2 mb-lg-0">
              {user ? (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.email}
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <NavLink
                        to="/user/profile"
                        className="dropdown-item"
                        aria-current="page"
                        href="#"
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                      >
                        User
                      </NavLink>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <Link
                    to="/login"
                    className="nav-link active"
                    aria-current="page"
                    href="#"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
