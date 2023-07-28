import React, { useState } from "react";
import logo from "./logo.png";
import "./App.css";
import List from "./Components/List";
import Sighting from "./Components/Sighting";
import { Routes, Route } from "react-router-dom";
import Form from "./Components/Form";
import SightingEditForm from "./Components/SightingEditForm";

function App() {
  const [sighting, setSighting] = useState({});

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Routes>
          <Route index element={<List />} />
          <Route
            path="/sightings/:sightingId"
            element={<Sighting sighting={sighting} setSighting={setSighting} />}
          />
          <Route path="/new" element={<Form />} />
          <Route
            path="/sightings/:sightingId/edit"
            element={
              <SightingEditForm sighting={sighting} setSighting={setSighting} />
            }
          />
        </Routes>
      </header>
    </div>
  );
}

export default App;
