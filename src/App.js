import React, { useState, useEffect } from "react";
import logo from "./logo.png";
import "./App.css";
import axios from "axios";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

const App = () => {
  const [sightings, setSightings] = useState([]);

  const getSightingData = async () => {
    const data = await axios.get("http://localhost:3000/sightings");

    setSightings(data.data);
  };

  useEffect(() => {
    getSightingData();
    return;
  }, []);

  const sightingList =
    // render list of sighting
    sightings.map((sighting, ind) => {
      return <li key={ind}>{`${sighting.YEAR}, ${sighting.STATE}`}</li>;
    });

  return (
    <div className="App">
      {console.log(sightings)}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <br />
        <ul className="sighting-list">{sightingList}</ul>
      </header>
    </div>
  );
};

export default App;
