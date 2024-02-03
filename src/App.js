import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [sightings, setSightings] = useState([]);
  const [sightingLinks, setSightingLinks] = useState([]);

  useEffect(() => {
    const getSightings = async () => {
      const freshSightings = await fetch("http://localhost:3001/sightings", {
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
        <a href={"http://localhost:3000/" + index} key={index}>
          Date: {date}, Report Number: {reportNum}
        </a>
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
