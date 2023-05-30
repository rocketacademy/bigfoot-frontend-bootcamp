import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "./constants";
import { Link } from "react-router-dom";
import axios from "axios";
import "./App.css";

const App = () => {
  const [sightings, setSightings] = useState(null);
  useEffect(() => {
    const getSightingsDataAPI = async () => {
      const sightingsData = await axios.get(`${BACKEND_URL}/sightings`);
      console.log(sightingsData);
      setSightings(sightingsArray(sightingsData.data));
    };
    getSightingsDataAPI();
  }, []);
  const sightingsArray = (data) => {
    const res = data.map((sighting) => {
      return (
        <div key={sighting.id}>
          <Link to={`sightings/${sighting.id}`}>Sighting {sighting.id}</Link>
          <div>{sighting.date}</div>
          <div>{sighting.location}</div>
        </div>
      );
    });
    return res;
  };
  return (
    <div className="App">
      <div className="App-header">
        <h3>Home Page</h3>
        <div>
          <Link to="/new">Create New Sighting</Link>
        </div>
        <h3>Sightings List</h3>
        <div>{sightings}</div>
      </div>
    </div>
  );
};

export default App;
