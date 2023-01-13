import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Link, Route, useParams } from "react-router-dom";
import CallSightings from "./Sightings";
import CallIndividualSighting from "./IndividualSighting";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path={`/sightings`} element={<CallSightings />} />
          <Route
            path="/sightings/:sightingIndex"
            element={<CallIndividualSighting />}
          />
        </Routes>
      </header>
    </div>
  );
}

export default App;
