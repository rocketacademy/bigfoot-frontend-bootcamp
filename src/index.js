import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Navbar from "./component/Navbar";
import SightingList from "./component/SightingList";
import About from "./component/About";
import IndividualSighting from "./component/IndividualSighting";
import Error from "./component/Error";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="sightings" element={<SightingList />}>
        <Route path="about" element={<About />} />
      </Route>
      <Route path="/sightings/:sightingId" element={<IndividualSighting />} />
      <Route path="*" element={<Error />} />
    </Routes>
  </Router>
);
