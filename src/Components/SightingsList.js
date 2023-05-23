import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constants";
import Navbar from "./Navbar";
import Filter from "./Filter";

function SightingsList() {
  const [sightings, setSightings] = useState([]);
  const [filteredSightings, setFilteredSightings] = useState([]);

  const navigate = useNavigate();

  const fetchSightings = async () => {
    const url = `${BACKEND_URL}/sightings`;

    try {
      await axios.get(url).then((res) => {
        setSightings(res.data);
        setFilteredSightings(res.data);
      });
    } catch (error) {
      console.log("Error fetching sightings: ", error);
    }
  };

  useEffect(() => {
    fetchSightings();
  }, []);

  const filterSightings = (filterValues) => {
    const { date, location, notes } = filterValues;
    const filtered = sightings.filter((sighting) => {
      const matchDate = !date || sighting.date.includes(date);
      const matchLocation = !location || sighting.location.includes(location);
      const matchNotes = !notes || sighting.notes.includes(notes);
      return matchDate && matchLocation && matchNotes;
    });
    setFilteredSightings(filtered);
  };

  return (
    <div className="App">
      <Navbar />
      <Filter onFilter={filterSightings} />
      {filteredSightings.map((sighting) => (
        <li key={sighting.id} className="sightings-list-ctn">
          <div className="sightings-list">
            <Link to={`/sightings/${sighting.id}`} className="sightings-list">
              {" "}
              {sighting.date.slice(0, 4)} - {sighting.location}
            </Link>
          </div>
        </li>
      ))}
    </div>
  );
}

export default SightingsList;
