import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { BACKEND_URL } from "./constants";

const App = () => {
  const [sightings, setSightings] = useState([]);
  const [sightingLinks, setSightingLinks] = useState([]);

  useEffect(() => {
    const getSightings = async () => {
      const freshSightings = await fetch(BACKEND_URL + "/sightings", {
        method: "get",
      });
      const sightingsJson = await freshSightings.json();
      setSightings(sightingsJson);
    };
    getSightings();
  }, []);

  useEffect(() => {
    const sightingsMap = sightings.map((sighting) => {
      const id = sighting.id;
      const date = sighting.date;
      const location = sighting.location;
      return (
        <Link to={"sightings/" + id} key={id}>
          Date: {date}, Location: {location}
        </Link>
      );
    });

    setSightingLinks(sightingsMap);
  }, [sightings]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Add your sighting below!</h1>
        <Link to={"/new"}>Add new sighting</Link>
        <h2>No verification needed, we trust you :)</h2>
        <h1>List of totally true bigfoot sightings!</h1>
        {sightingLinks}
      </header>
    </div>
  );
};

export default App;
