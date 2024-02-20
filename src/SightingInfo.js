import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "./constants";
import "./App.css";

const SightingInfo = () => {
  const [specificSightings, setSpecificSightings] = useState({});
  const { int } = useParams();

  useEffect(() => {
    const getSpecificSightings = async () => {
      const freshSightings = await fetch(BACKEND_URL + "/sightings/" + int, {
        method: "get",
      });
      const sightingsJson = await freshSightings.json();
      setSpecificSightings(sightingsJson);
    };
    getSpecificSightings();
  }, [int]);

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/" className="top-left">
          Back
        </Link>
        <h1>Report ID: {specificSightings.id}</h1>
        <h3>Date: {specificSightings.date}</h3>
        <h3>Location Details: {specificSightings.location}</h3>
        <h2>Notes</h2>
        <p>{specificSightings.notes}</p>
      </header>
    </div>
  );
};

export default SightingInfo;
