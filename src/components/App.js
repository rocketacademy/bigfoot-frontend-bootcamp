import React, { useState, useEffect } from "react";
import logo from "../logo.png";
import "./App.css";
import axios from "axios";

const App = () => {
  const [sightings, setSightings] = useState([]);
  const [indexedSightings, setIndexSightings] = useState([]);

  const displaySightings = async () => {
    try {
      const res = await axios.get("http://localhost:3000/sightings");
      setSightings(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    displaySightings();
  }, []);

  const displaySightingsIndex = async () => {
    try {
      const res = await axios.get("http://localhost:3000/sightings/3");
      setIndexSightings(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    displaySightingsIndex();
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p key={indexedSightings.REPORT_NUMBER}>
          {indexedSightings.REPORT_NUMBER}
        </p>
        <div>
          {sightings.map((sighting) => (
            <p key={sighting.index}>{sighting.REPORT_NUMBER}</p>
          ))}
        </div>
      </header>
    </div>
  );
};

export default App;
