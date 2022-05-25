import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./components/App";
import Sighting from "./components/Sighting";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      {/* Route that renders all sightings */}
      <Route path="/" element={<App />}>
        {/* Route that matches specific sighting indexes */}
        <Route path=":sightingIndex" element={<Sighting />} />
        {/* Route that matches all other paths */}
        <Route path="*" element={"Nothing here!"} />
      </Route>
    </Routes>
  </BrowserRouter>
);
