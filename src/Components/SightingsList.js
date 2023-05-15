import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../constants";
import Navbar from "./Navbar";

function SightingsList() {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/sightings`).then((res) => {
      console.log(res.data);
      setSightings(res.data);
    });
  }, []);

  const sightingsList = sightings.map((sighting, index) => (
    <Link to={`/sightings/${index}`} key={index} className="sightings-list">
      <div>
        {sighting.YEAR} {sighting.SEASON} {sighting.MONTH}
      </div>
    </Link>
  ));

  return (
    <div className="App">
      <Navbar />
      <div className="sightings-list-ctn">{sightingsList}</div>
    </div>
  );
}

export default SightingsList;
