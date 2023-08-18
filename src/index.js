import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SightingPf from "./SightingPf";
import NewForm from "./NewForm";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      {/* Route that provides base app UI */}
      <Route path="/" element={<App />} />
      {/* Route that renders individual sightings */}
      <Route path="sightings/:id" element={<SightingPf />} />
      <Route path="/new" element={<NewForm />} />
    </Routes>
  </BrowserRouter>
);
