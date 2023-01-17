import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import DetailSightings from "./components/DetailSightings";
import NewSighting from "./components/NewSighting";
import HomePage from "./components/HomePage";
import AllSightings from "./components/AllSightings";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route index element={<HomePage />} />
      <Route path="/AllSighitngs" element={<AllSightings />} />
      <Route path="/DetailSightings/:id" element={<DetailSightings />} />
      <Route path="/New" element={<NewSighting />} />
    </Routes>
  </BrowserRouter>
);
