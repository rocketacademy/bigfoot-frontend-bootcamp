import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "./constants";
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
          <h3>Sighting {sighting.id}</h3>
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
        <p>Home Page</p>
        {sightings}
      </div>
    </div>
  );
};

export default App;
