import React from "react";
import logo from "./logo.png";
import "./App.css";
import List from "./Components/List";
import Sighting from "./Components/Sighting";
import { Routes, Route } from "react-router-dom";
import Form from "./Components/Form";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Routes>
          <Route index element={<List />} />
          <Route path="/sightings/:sightingId" element={<Sighting />} />
          <Route path="/new" element={<Form />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
