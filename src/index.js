import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import SightingPage from "./components/SightingPage";
import Homepage from "./components/Homepage";
import New from "./components/New";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/new" element={<New />} />
      <Route path="/sightings/:sightingId" element={<SightingPage />} />
    </Routes>
  </BrowserRouter>
);
