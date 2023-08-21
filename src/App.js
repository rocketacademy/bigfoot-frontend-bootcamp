import React from "react";
import logo from "./logo.png";
import "./App.css";
import { Routes, Route } from "react-router-dom";
// import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.min.css";

import SightingList from "./Components/SightingList.js";
import SightingPage from "./Components/SightingPage.js";
import CreateSighting from "./Components/CreateSighting.js";
import HomeNav from "./Components/HomeNav.js";
import EditSightingPage from "./Components/EditSightingPage.js";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <br />

        <Routes>
          <Route path="/" element={<HomeNav />} />
          <Route path="sightings" element={<SightingList />} />
          <Route path="sightings/:sightingId" element={<SightingPage />} />
          <Route path="sightings/new" element={<CreateSighting />} />
          <Route
            path="sightings/:sightingId/edit"
            element={<EditSightingPage />}
          />
        </Routes>
      </header>
    </div>
  );
};

export default App;
