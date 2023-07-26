import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import App from "./App";
import SightingList from "./pages/SightingList";
import Sighting from "./pages/Sighting";
import AddSighting from "./pages/AddSighting";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/new" element={<AddSighting />} />
        <Route path="/sightings">
          <Route index element={<SightingList />} />
          <Route path=":sightingId" element={<Sighting />} />
        </Route>
        <Route path="*" element={"Oops! There is nothing here!"} />
      </Route>
    </Routes>
  </BrowserRouter>
);
