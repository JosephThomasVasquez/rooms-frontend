import React, { useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = ({ target }) => {
    setSearchTerm(target.value);
  };

  return (
    <div className="row justify-content-center">
      <form role="search" className="d-flex">
        <input
          type="search"
          className="form-control border-end-0 border rounded-pill shadow-sm"
          value={searchTerm}
          id="example-search-input"
          placeholder="Search"
          aria-label="Search"
          onChange={handleChange}
        />
        <span className="input-group-append">
          <button
            className="btn bg-white border-start-0 border rounded-pill search-btn"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="rgba(0, 191, 140, 1)"
              strokeWidth="3"
              width="20px"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </span>
      </form>
    </div>
  );
};

export default SearchForm;
