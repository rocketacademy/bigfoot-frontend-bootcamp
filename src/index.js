import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SightingsList from "./Components/SightingsList";
import Sighting from "./Components/Sighting";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/sightings" element={<SightingsList />} />
      <Route path="/sightings/:sightingIndex" element={<Sighting />} />
      <Route path="*" element={"Oops! Something went wrong."} />
      {/* </Route> */}
    </Routes>
  </BrowserRouter>
);
