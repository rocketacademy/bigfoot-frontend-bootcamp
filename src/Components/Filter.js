import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constants";

function Filter({ onFilter }) {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [dateFilter, setDateFilter] = useState(searchParams.get("date") || "");
  const [locationDescriptionFilter, setLocationDescriptionFilter] = useState(
    searchParams.get("locationDescription") || ""
  );
  const [countryFilter, setCountryFilter] = useState(
    searchParams.get("country") || ""
  );
  const [cityTownFilter, setCityTownFilter] = useState(
    searchParams.get("cityTownFilter") || ""
  );
  const [notesFilter, setNotesFilter] = useState(
    searchParams.get("notes") || ""
  );

  const navigateWithFilters = () => {
    const newSearchParams = new URLSearchParams();

    if (dateFilter) {
      newSearchParams.set("date", dateFilter);
    }

    if (locationDescriptionFilter) {
      newSearchParams.set("locationDescription", locationDescriptionFilter);
    }

    if (countryFilter) {
      newSearchParams.set("country", countryFilter);
    }

    if (cityTownFilter) {
      newSearchParams.set("cityTown", cityTownFilter);
    }

    if (notesFilter) {
      newSearchParams.set("notes", notesFilter);
    }

    navigate(`?${newSearchParams.toString()}`, { replace: true });
  };

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
  };

  const handleLocationDescriptionFilterChange = (e) => {
    setLocationDescriptionFilter(e.target.value);
  };

  const handleCountryFilterChange = (e) => {
    setCountryFilter(e.target.value);
  };

  const handleCityTownFilterChange = (e) => {
    setCityTownFilter(e.target.value);
  };

  const handleNotesFilterChange = (e) => {
    setNotesFilter(e.target.value);
  };

  const handleFilter = (e) => {
    e.preventDefault();

    onFilter({
      date: dateFilter,
      locationDescription: locationDescriptionFilter,
      country: countryFilter,
      cityTown: cityTownFilter,
      notes: notesFilter,
    });

    navigateWithFilters();

    setDateFilter("");
    setLocationDescriptionFilter("");
    setCountryFilter("");
    setCityTownFilter("");
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
        <label htmlFor="locationDescriptionFilter">Location Description:</label>
        <input
          type="text"
          name="locationDescriptionFilter"
          id="locationDescriptionFilter"
          value={locationDescriptionFilter}
          onChange={handleLocationDescriptionFilterChange}
          className="search-input"
        />
        <label htmlFor="countryFilter">Country:</label>
        <input
          type="text"
          name="countryFilter"
          id="countryFilter"
          value={countryFilter}
          onChange={handleCountryFilterChange}
          className="search-input"
        />
        <label htmlFor="cityTownFilter">City/Town:</label>
        <input
          type="text"
          name="cityTownFilter"
          id="cityTownFilter"
          value={cityTownFilter}
          onChange={handleCityTownFilterChange}
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
