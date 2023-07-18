import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Display = () => {
  const [sightingIndex, setSightingIndex] = useState();
  const [sighting, setSighting] = useState();
  const BACKEND_URL = "http://localhost:3000";

  useEffect(() => {
    // If there is a sightingIndex, retrieve the sighting data
    axios.get(`${BACKEND_URL}/sightings/${sightingIndex}`).then((response) => {
      console.log(`SightingIndex: ${JSON.stringify(sightingIndex)}`);
      console.log(`Response: ${JSON.stringify(response)}`);
      console.log(`Data: ${JSON.stringify(response.data)}`);
      setSighting(response.data);
    });

    // Only run this effect on change to sightingIndex
  });

  // Update sighting index in state if needed to trigger data retrieval
  const params = useParams();
  if (sightingIndex !== params.sightingIndex) {
    setSightingIndex(params.sightingIndex);
  }

  return (
    <div>
      {sighting && `${sighting.YEAR} ${sighting.SEASON} ${sighting.MONTH}`}
      <h1>Observation:</h1>
      <div>{sighting && `${sighting.OBSERVED}`}</div>
      <Link to={"/"}>Home</Link>
    </div>
  );
};

export default Display;
