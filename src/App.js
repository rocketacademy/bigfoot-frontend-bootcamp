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
    const sightingsMap = sightings.map((sighting, index) => {
      const date = `${sighting.DATE} ${sighting.MONTH} ${sighting.YEAR}`;
      const reportNum = sighting.REPORT_NUMBER;
      return (
        <Link to={"sightings/" + index} key={index}>
          Date: {date}, Report Number: {reportNum}
        </Link>
      );
    });

    setSightingLinks(sightingsMap);
  }, [sightings]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>List of totally true bigfoot sightings!</h1>
        {sightingLinks}
      </header>
    </div>
  );
};

export default App;
