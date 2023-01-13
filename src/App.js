import React, { useEffect, useState } from "react";

import "./App.css";
import { BACKEND_URL } from "./constants";
import axios from "axios";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Sightings } from "./components/Sightings";
import { OneSighting } from "./components/OneSighting";

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          path="/sightings"
          element={<Sightings />}
        />
        <Route
          path="/sightings/:sightingIndex"
          element={<OneSighting />}
        />
        <Route path="*" element={<Navigate to="/sightings" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
