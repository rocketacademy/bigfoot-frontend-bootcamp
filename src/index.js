import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./components/App";
import Sightings from "./components/Sightings";
import SightingPreviewList from "./components/SightingPreviewList";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      {/* Route that provides base app UI */}
      <Route path="/" element={<App />}>
        {/* Route that renders all sightings */}
        <Route index element={<SightingPreviewList />} />
        {/* Route that renders individual sightings */}
        <Route path="sightings/:sightingIndex" element={<Sightings />} />
        {/* Route that matches all other paths */}
        <Route path="*" element={"Nothing here!"} />
      </Route>
    </Routes>
  </BrowserRouter>
);
