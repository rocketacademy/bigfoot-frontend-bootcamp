import React from "react";
import logo from "./logo.png";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Sightings } from "./components/Sightings";
import { SightingReport } from "./components/SightingReport";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sightings" element={<Sightings />} />
        <Route path="/sightings/:sightingIndex" element={<SightingReport />} />

        <Route path="*" element={<Navigate to="/sightings" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
/*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
      </header>
  </div>*/
