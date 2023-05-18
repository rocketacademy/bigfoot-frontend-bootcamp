import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "./constants";
import axios from "axios";
import "./App.css";
import { useParams } from "react-router-dom";

const Sightings = () => {
  const { sightingIndex } = useParams();
  const [singleSighting, setSingleSighting] = useState(null);
  useEffect(() => {
    console.log("Sighting Index: ", sightingIndex);
    const getSightingsDataAPI = async () => {
      const sightingsEvent = await axios.get(
        `${BACKEND_URL}/sightings/${sightingIndex}`
      );
      console.log("sightingsEvent: ", sightingsEvent);
      /* sightingsEvent has many keys like data, config, status etc..
         sightingsEvent.data = {
           success: true,
           data: JSON
         }
      */
      const { data } = sightingsEvent.data;
      console.log("data: ", data);
      setSingleSighting(data);
    };
    getSightingsDataAPI();
  }, []);
  return (
    <div className="App">
      <div className="App-header">
        {singleSighting && (
          <div>
            <h1>Sighting {sightingIndex} </h1>
            <p>Year: {singleSighting.YEAR}</p>
            <p>Date: {singleSighting.DATE}</p>
            <p>Month: {singleSighting.MONTH}</p>
            <div>Observed: </div>
            <div className="observed-text-container">
              <p className="observed-text">{singleSighting.OBSERVED} </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sightings;
