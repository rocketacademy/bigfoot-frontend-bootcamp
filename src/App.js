import React from "react";
import "./App.css";
import logo from "./logo.png";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AllSightings from "./components/AllSightings";
import DetailSightings from "./components/DetailSightings";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AllSightings />} />
            <Route path="/DetailSightings/:id" element={<DetailSightings />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
