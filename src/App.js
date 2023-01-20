import React, { useEffect } from "react";
import logo from "./bigfoot.jpg";
import "./App.css";
import axios from "axios";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { BACKEND_URL } from "./constants";

export default function App() {
  const [allSightings, setAllSightings] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/sightings`).then((response) => {
      setAllSightings(response.data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Link to={`/`}>
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
        <h1>BIGFOOT REPORTS</h1>
      </header>
      <div className="App-body">
        <div>
          <h1>Reported Sightings</h1>
          <Link to={`/sighting/new`}>Report New Sighting</Link>
          <ul className="sightings-list">
            {allSightings.map((sighting, index) => (
              <li key={index}>
                <Link to={`/sighting/${sighting.id}`}>
                  {sighting.date}, {sighting.location}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="Sighting-info">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
