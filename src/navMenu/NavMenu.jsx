import React, { useState, useEffect, useRef } from "react";
import Logout from "../logout/Logout";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { isAuthenticated } from "../utils/cookieHandler";
// ICON Imports
import { SearchIcon, UserCircleIcon } from "@heroicons/react/solid";
import {
  ClipboardCheckIcon,
  ClipboardListIcon,
  CollectionIcon,
  PlusSmIcon,
  CheckIcon,
  OfficeBuildingIcon,
} from "@heroicons/react/outline";
// CSS
import "./navMenu.styles.css";

const NavMenu = ({ openNav, setOpenNav }) => {
  const auth = useAuth();
  const location = useLocation();
  const menuRef = useRef();

  const isUser = auth.getLoggedInUser();
  // console.log(isUser);

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isUser) {
      setUser(isUser);
    }
  }, [isUser]);

  const activeStyle = {
    backgroundColor: "rgba(73, 220, 181, 0.5)",
    color: "black",
  };

  return (
    <nav className="ps-5 navbar navbar-expand-lg navbar-light bg-navmenu py-3">
      <div className="container-fluid">
        <a
          className="navbar-brand fw-bold nav-brand d-flex align-items-center"
          href={`/dashboard/user?email=${isAuthenticated()?.email}`}
        >
          <ClipboardCheckIcon className="icon-navbar-brand" />
          <div>QuickList</div>
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
            <li className="nav-item my-auto">
              <Link
                to={`/dashboard/user?email=${isAuthenticated()?.email}`}
                className="nav-link"
                aria-current="page"
                href="#"
              >
                <div>Dashboard</div>
              </Link>
            </li>

            <li className="nav-item my-auto mx-2">
              <Link
                to={`/account/checklists/create`}
                className="nav-link d-flex align-items-center"
                aria-current="new-checklist-page"
                href="checklists/create"
              >
                <PlusSmIcon className="icon-nav" />
                <div>Create</div>
              </Link>
            </li>
            <li className="my-auto">
              <Link
                to={`/checklists?group=any&page=1`}
                className="nav-link d-flex align-items-center"
                aria-current="checklists-page"
                href="checklists"
              >
                <CollectionIcon className="icon-nav" />
                <div>Checklists</div>
              </Link>
            </li>
            <li className="nav-item mx-2 my-auto dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="dropdown"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <ClipboardListIcon className="icon-nav" />
                <div>Templates</div>
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink
                    to="/checklist-templates/create"
                    className="dropdown-item"
                    aria-current="page"
                    href="/checklist-templates/create"
                    style={
                      location.pathname === "/checklist-templates/create"
                        ? activeStyle
                        : null
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
                    href="/checklist-templates"
                    style={
                      location.pathname === "/checklist-templates"
                        ? activeStyle
                        : null
                    }
                  >
                    Templates
                  </NavLink>
                </li>
              </ul>
            </li>
            {user?.account_id > 1 ? (
              <li className="nav-item me-2 my-auto dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  href="dropdown"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <OfficeBuildingIcon className="icon-nav" />
                  <div>Directory</div>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink
                      to={`/rooms?user=${isAuthenticated().email}`}
                      className="dropdown-item"
                      aria-current="page"
                      href="#"
                      style={
                        location.pathname === "/rooms" ? activeStyle : undefined
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
                      style={
                        location.pathname === "/buildings"
                          ? activeStyle
                          : undefined
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
            ) : null}
          </ul>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto me-5 mb-2 mb-lg-0">
              {user ? (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle user-link d-flex align-items-center"
                    href="dropdown"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <UserCircleIcon className="icon-nav-user me-1" />
                    <div>{user ? user.email : "User"}</div>
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <NavLink
                        to={`/user/profile/user?email=${user.email}`}
                        className="dropdown-item"
                        aria-current="page"
                        href="#"
                        style={
                          location.pathname === "/user/profile/user"
                            ? activeStyle
                            : undefined
                        }
                      >
                        Profile
                      </NavLink>
                    </li>
                    {user.role === "admin" ? (
                      <>
                        <li>
                          <NavLink
                            to={`/admin/checklists?group=any&page=1`}
                            className="dropdown-item"
                            aria-current="page"
                            href="admin"
                            style={
                              location.pathname === "/admin/checklists"
                                ? activeStyle
                                : undefined
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
                            to={`/admin/users`}
                            className="dropdown-item"
                            aria-current="page"
                            href="/admin/users"
                            style={
                              location.pathname === "/admin/users"
                                ? activeStyle
                                : undefined
                            }
                          >
                            Users
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to={`/account/admin/user/create`}
                            className="dropdown-item"
                            aria-current="page"
                            href="/account/admin/user/create"
                            style={
                              location.pathname === "/account/admin/user/create"
                                ? activeStyle
                                : undefined
                            }
                          >
                            Add User
                          </NavLink>
                        </li>
                        <hr className="dropdown-divider" />
                        <li>
                          <NavLink
                            to={`/account/admin/rooms/create`}
                            className="dropdown-item"
                            aria-current="page"
                            href="/account/admin/rooms/create"
                            style={
                              location.pathname ===
                              "/account/admin/rooms/create"
                                ? activeStyle
                                : undefined
                            }
                          >
                            Add Room
                          </NavLink>
                        </li>
                      </>
                    ) : null}
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Logout />
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  {" "}
                  <li className="nav-item">
                    <Link
                      to="/user/login"
                      className="nav-link active"
                      aria-current="page"
                      href="#"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/user/signup"
                      className="nav-link active"
                      aria-current="page"
                      href="#"
                    >
                      Signup
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          {openNav}
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
