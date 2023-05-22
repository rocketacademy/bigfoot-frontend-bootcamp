import React from "react";

function Filter({ filters, onFilterChange, onSubmit }) {
  return (
    <div>
      <div className="filter-header">Filter Sightings by</div>
      <form onSubmit={onSubmit} className="search-form">
        <label htmlFor="year">Year:</label>
        <input
          type="text"
          name="year"
          id="year"
          value={filters.year}
          onChange={onFilterChange}
          className="search-input"
        />
        <label htmlFor="season">Season:</label>
        <input
          type="text"
          name="season"
          id="season"
          value={filters.season}
          onChange={onFilterChange}
          className="search-input"
        />
        <label htmlFor="month">Month:</label>
        <input
          type="text"
          name="month"
          id="month"
          value={filters.month}
          onChange={onFilterChange}
          className="search-input"
        />
        <button type="submit" className="search-btn">
          Apply Filters
        </button>
      </form>
    </div>
  );
}

export default Filter;
