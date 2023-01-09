import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import SightingPreviewList from "./SightingPreviewList";
import Sighting from "./Sighting";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<SightingPreviewList />} />
        <Route path="/sightings/:sightingIndex" element={<Sighting />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
