import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Link } from "react-router-dom";

const SightingsAll = () => {
  const [sightings, setSightings] = useState(null);
  useEffect(() => {
    const getSightingsDataAPI = async () => {
      const sightingsData = await axios.get("http://localhost:3000/sightings");
      setSightings(sightingsArray(sightingsData.data));
    };
    getSightingsDataAPI();
  }, []);
  const sightingsArray = (data) => {
    const res = data.map((sighting, index) => {
      return (
        <div>
          <div>
            <Link to={index.toString()}>Sighting {index}</Link>
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
