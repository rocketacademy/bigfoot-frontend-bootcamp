import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { Outlet } from "react-router-dom";
//import { BACKEND_URL } from "./Constants";

export const YEARLIST = [
  "before_1960",
  "1960-69",
  "1970-79",
  "1980-89",
  "1990-99",
  "2000-2009",
  "after_2010",
  
];

class YearSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedYear: "",
    };
  }
  handleYearChange = (event) => {
    this.setState({ selectedYear: event.target.value });
    // Do something with the selected year, e.g., filter data based on the selected year.
    // You can call a function here or use the selectedYear state to update your data.
  };
  shouldRender() {
    const { pathname } = window.location;

    return pathname === "/year" || pathname === "/year/";
  }
  render() {
    const { selectedYear } = this.state;
    const shouldRender = this.shouldRender();
    return (
      <div>
        <Outlet />

        {shouldRender && (
          <div>
            <select
              onChange={this.handleYearChange}
              value={this.state.selectedYear}
            >
              <option value="">Select a year</option>
              {YEARLIST.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <br />
            <Link
              to={`/year/${selectedYear}`}
              style={{ textDecoration: "none" }}
            >
              <button className="search-button">Search</button>
            </Link>
            <br />
            <Link to="/" style={{ textDecoration: "none" }}>
          <button>Back</button>
        </Link>
          </div>
        )}
      </div>
    );
  }
}

export default YearSearch;
