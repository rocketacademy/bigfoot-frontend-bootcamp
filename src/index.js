import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SightingPage from "./Components/SightingPage";
import SightingsList from "./Components/SightingsList";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/sightings" element={<SightingsList />}></Route>
      <Route path="/sightings/:index" element={<SightingPage />}></Route>
      <Route path="*" element={"Sorry, page not found!"} />
    </Routes>
  </BrowserRouter>
);
