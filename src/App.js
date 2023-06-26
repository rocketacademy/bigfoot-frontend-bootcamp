import React from "react";
import logo from "./logo.png";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import List from "./Components/List";

function App() {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:3000/sightings");
      console.log(data);
      setSightings(data);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {sightings.map((sighting, index) => (
          <List sighting={sighting} index={index} />
        ))}
      </header>
    </div>
  );
}

export default App;
