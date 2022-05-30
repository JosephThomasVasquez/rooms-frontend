import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";

const NavMenu = () => {
  const [openNav, setOpenNav] = useState(false);

  console.log(openNav);
  const menuRef = useRef();

  return (
    <nav className="flex items-center justify-between flex-wrap bg-indigo-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link
          to="/"
          className="navbar-brand font-semibold text-xl tracking-tight"
        >
          <div className="" aria-current="page" href="#">
            Rooms
          </div>
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={() => setOpenNav(!openNav)}
          className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        >
          {!openNav ? (
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          ) : (
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link
            to="/dashboard"
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-indigo-200 mr-4"
          >
            Dashboard
          </Link>
          <Link
            to="/login"
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-indigo-200 mr-4"
          >
            Login
          </Link>
          <Link
            to="/dashboard"
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-indigo-200 mr-4"
          >
            Checklists
          </Link>
          <Link
            to="/dashboard"
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-indigo-200 mr-4"
          >
            Reports
          </Link>
        </div>
        <div>
          <div
            href="#"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          >
            User
          </div>
        </div>
      </div>
      <Transition
        show={openNav}
        enter="transition ease-out duration-200 transform"
        enterFrom="transition ease-out duration-200 opacity-0 scale-95"
        enterTo="transition ease-out duration-200 opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="transition ease-out duration-200 opacity-100 scale-100"
        leaveTo="transition ease-out duration-200 opacity-0 scale-95"
      >
        <div className="md:hidden" id="mobile-menu">
          <div ref={menuRef} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#"
              className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Dashboard
            </a>

            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Team
            </a>
          </div>
        </div>
      </Transition>
    </nav>
  );
};

export default NavMenu;
