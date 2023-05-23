import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App home-ctn">
      <h1 className="home-header">Bigfoot Wiki</h1>
      <Link to="/new" className="home-link">
        <button>REPORT A SIGHTING</button>
      </Link>
      <Link to="/sightings" className="home-link">
        <button>VIEW REPORTED SIGHTINGS</button>
      </Link>
    </div>
  );
}

export default App;
