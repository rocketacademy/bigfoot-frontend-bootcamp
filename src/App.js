import React from "react";
import logo from "./logo.png";
import "./App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";

import { Routes, Route, Link, Outlet } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const [sightingsData, setSightingsData] = useState();
  const [showSightings, setShowSightings] = useState(true);
  // call backend here
  useEffect(() => {
    const getSightingsData = async () => {
      const data = await axios.get("http://localhost:3000/sightings");
      setSightingsData(data.data);
    };
    getSightingsData();
  }, []);

  console.log(sightingsData);

  if (sightingsData == null) {
    return <p>Loading...</p>;
  }

  const navigateToNewSightings = () => {
    navigate(`/new`);
  };

  const toggleSightings = () => {
    setShowSightings(!showSightings);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={navigateToNewSightings}>
          Click here to report new sighting
        </button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={toggleSightings}>
          {showSightings ? "Hide Sightings" : "Show Sightings"}
        </button>

        {showSightings &&
          sightingsData.map((sighting) => (
            <div key={sighting.id}>
              <p>Date: {sighting.date}</p>
              <p>Location: {sighting.location}</p>
              <p>
                Categories:{" "}
                {sighting.categories.length > 0 &&
                  sighting.categories.map((category) => (
                    <div key={category.id}>
                      <p>{category.name}</p>
                    </div>
                  ))}
              </p>
            </div>
          ))}
        <Outlet />
      </header>
    </div>
  );
};

export default App;
