import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constants";

function Filter({ onFilter }) {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [dateFilter, setDateFilter] = useState(searchParams.get("date") || "");
  const [locationFilter, setLocationFilter] = useState(
    searchParams.get("location") || ""
  );
  const [notesFilter, setNotesFilter] = useState(
    searchParams.get("notes") || ""
  );

  const navigateWithFilters = () => {
    const newSearchParams = new URLSearchParams();

    if (dateFilter) {
      newSearchParams.set("date", dateFilter);
    }

    if (locationFilter) {
      newSearchParams.set("location", locationFilter);
    }

    if (notesFilter) {
      newSearchParams.set("notes", notesFilter);
    }

    navigate(`?${newSearchParams.toString()}`, { replace: true });
  };

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
  };

  const handleLocationFilterChange = (e) => {
    setLocationFilter(e.target.value);
  };

  const handleNotesFilterChange = (e) => {
    setNotesFilter(e.target.value);
  };

  const handleFilter = (e) => {
    e.preventDefault();

    onFilter({
      date: dateFilter,
      location: locationFilter,
      notes: notesFilter,
    });

    navigateWithFilters();

    setDateFilter("");
    setLocationFilter("");
    setNotesFilter("");
  };

  return (
    <div>
      <h2 className="filter-header">Filter Sightings</h2>

      <form onSubmit={handleFilter} className="search-form">
        <label htmlFor="dateFilter">Date:</label>
        <input
          type="text"
          name="dateFilter"
          id="dateFilter"
          value={dateFilter}
          onChange={handleDateFilterChange}
          className="search-input"
        />
        <label htmlFor="locationFilter">Location:</label>
        <input
          type="text"
          name="locationFilter"
          id="locationFilter"
          value={locationFilter}
          onChange={handleLocationFilterChange}
          className="search-input"
        />
        <label htmlFor="notesFilter">Notes:</label>
        <input
          type="text"
          name="notesFilter"
          id="notesFilter"
          value={notesFilter}
          onChange={handleNotesFilterChange}
          className="search-input"
        />
        <button type="submit" className="search-btn">
          Apply
        </button>
      </form>
    </div>
  );
}

export default Filter;

// import React from "react";

// function Filter({ filters, onFilterChange, onSubmit }) {
//   return (
//     <div>
//       <h2 className="filter-header">Filter Sightings</h2>

//       <form onSubmit={onSubmit} className="search-form">
//         <label htmlFor="year">Year:</label>
//         <input
//           type="text"
//           name="year"
//           id="year"
//           value={filters.year}
//           onChange={onFilterChange}
//           className="search-input"
//         />
//         <label htmlFor="season">Season:</label>
//         <input
//           type="text"
//           name="season"
//           id="season"
//           value={filters.season}
//           onChange={onFilterChange}
//           className="search-input"
//         />
//         <label htmlFor="month">Month:</label>
//         <input
//           type="text"
//           name="month"
//           id="month"
//           value={filters.month}
//           onChange={onFilterChange}
//           className="search-input"
//         />
//         <button type="submit" className="search-btn">
//           Apply Filters
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Filter;
