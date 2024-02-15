import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import SightingPage from "./components/SightingPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/sightings" element={<SightingPage />} />
      <Route path="/sightings/:index" element={<SightingPage />} />
    </Routes>
  </BrowserRouter>
);
