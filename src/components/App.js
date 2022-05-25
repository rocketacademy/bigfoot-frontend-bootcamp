import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

import "./App.css";
import SightingPreview from "./SightingPreview";
import logo from "../logo.png";

const App = () => {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000").then((response) => {
      setSightings(response.data);
    });
    // Specify empty dependency array so useEffect only runs on mount
  }, []);

  const sightingPreviews = sightings.map((sighting, index) => (
    <SightingPreview key={index} data={sighting} />
  ));

  const params = useParams();
  console.log(params.sightingIndex);
  const body = params.sightingIndex ? (
    sightingPreviews
  ) : (
    <Outlet sightingIndex={params.sightingIndex} />
  );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {body}
      </header>
    </div>
  );
};

export default App;
