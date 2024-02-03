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
        <h1>Report Number: {specificSightings.REPORT_NUMBER}</h1>
        <h3>Report Class: {specificSightings.REPORT_CLASS}</h3>
        <h3>
          Date: {specificSightings.DATE} {specificSightings.MONTH}{" "}
          {specificSightings.YEAR}
        </h3>
        <h3>Season: {specificSightings.SEASON}</h3>
        <h3>County: {specificSightings.COUNTY}</h3>
        <h3>Location Details: {specificSightings.LOCATION_DETAILS}</h3>
        <h2>Observations</h2>
        <p>{specificSightings.OBSERVED}</p>
      </header>
    </div>
  );
};

export default SightingInfo;
