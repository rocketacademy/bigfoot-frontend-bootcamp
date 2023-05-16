import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App home-ctn">
      <h1 className="home-header">Bigfoot Wiki</h1>
      <Link to="/sightings" className="home-link">
        <h2>VIEW SIGHTINGS</h2>
      </Link>
    </div>
  );
}

export default App;
