import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "./constants";
import axios from "axios";
import "./App.css";
import { Link } from "react-router-dom";

const SightingsAll = () => {
  const [sightings, setSightings] = useState(null);
  useEffect(() => {
    const getSightingsDataAPI = async () => {
      const sightingsData = await axios.get(`${BACKEND_URL}/sightings`);
      setSightings(sightingsArray(sightingsData.data));
    };
    getSightingsDataAPI();
  }, []);
  const sightingsArray = (data) => {
    const res = data.map((sighting) => {
      return (
        <div>
          <div>
            <Link to={`${sighting.id}`}>Sighting {sighting.id}</Link>
          </div>
        </div>
      );
    });
    return res;
  };
  return (
    <div className="App">
      <div className="App-header">
        <p>Sightings List</p>
        {sightings}
      </div>
    </div>
  );
};

export default SightingsAll;
