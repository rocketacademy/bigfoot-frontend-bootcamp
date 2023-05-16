import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constants";
import Navbar from "./Navbar";
import Filter from "./Filter";

function SightingsList() {
  const [sightings, setSightings] = useState([]);
  const [filters, setFilters] = useState({
    year: "",
    season: "",
    month: "",
  });

  const navigate = useNavigate();

  const fetchSightings = async () => {
    const urlParams = new URLSearchParams(filters);
    const url = `${BACKEND_URL}/sightings?${urlParams.toString()}`;

    try {
      await axios.get(url).then((res) => {
        setSightings(res.data);
      });
    } catch (error) {
      console.log("Error fetching sightings: ", error);
    }
  };

  useEffect(() => {
    fetchSightings();

    const hasQueryParams = Object.values(filters).some((value) => value !== "");

    if (!hasQueryParams) {
      navigate("/sightings");
    }
  }, [navigate, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));

    const urlParams = new URLSearchParams(filters);
    const queryString = urlParams.toString();

    navigate(`?${queryString}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchSightings();
  };

  return (
    <div className="App">
      <Navbar />
      <Filter
        filters={filters}
        onFilterChange={handleFilterChange}
        onSubmit={handleSubmit}
      />
      {sightings.map((sighting, index) => (
        <li key={index} className="sightings-list-ctn">
          <div className="sightings-list">
            <Link to={`/sightings/${index}`} className="sightings-list">
              {" "}
              {sighting.YEAR} {sighting.SEASON} {sighting.MONTH}
            </Link>
          </div>
        </li>
      ))}
    </div>
  );
}

export default SightingsList;
