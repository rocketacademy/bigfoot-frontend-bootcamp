import React from "react";
import "./App.css";

// Import Libraries
import { Routes, Route } from "react-router-dom";

// Import Pages
import { HomePage } from "./Pages/HomePage";
import { SightID } from "./Pages/SightID";

// Import Components
import { Information } from "./Components/Information";

// Import Constants
import { BACKEND_URL } from "./util/constants.js";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="sightings/:sightingIndex"
          element={<SightID backend_url={BACKEND_URL} />}
        >
          <Route path="information" element={<Information />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
