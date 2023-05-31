import React from "react";
import { Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Sightings from "./components/sightings";
import NewSightingsForm from "./components/newSightings";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="sightings/:id" element={<Sightings />} />
        <Route path="new" element={<NewSightingsForm />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
