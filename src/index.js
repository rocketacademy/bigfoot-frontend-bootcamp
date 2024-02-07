import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SightingPage from "./Components/SightingPage";
import SightingsList from "./Components/SightingsList";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/sightings">
        <Route index element={<SightingsList />}></Route>
        <Route path=":REPORT_NUMBER" element={<SightingPage />}></Route>
      </Route>
      <Route path="*" element={"Sorry, page not found!"} />
    </Routes>
  </Router>
);
