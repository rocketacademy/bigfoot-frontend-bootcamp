import React, { useState, useEffect } from "react";
import logo from "./logo.png";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import SightingList from "./Components/SightingList.js";
import SightingPage from "./Components/SightingPage.js";

const App = () => {
  return (
    <div className="App">
      {/* {console.log(sightings)} */}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <br />
        <Routes>
          <Route path="/" element={<Link to="/sightings">Sightings</Link>} />
          <Route path="sightings" element={<SightingList />} />
          <Route path="sightings/:sightingIndex" element={<SightingPage />} />
        </Routes>
      </header>
    </div>
  );
};

export default App;
