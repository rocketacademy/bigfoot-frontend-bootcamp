import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BACKEND_URL from "./constant";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Display = () => {
  const [sightingIndex, setSightingIndex] = useState();
  const [sighting, setSighting] = useState();
  const history = useNavigate();

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

  const handleButtonClick = (text) => {
    history(`/`);
  };

  return (
    <div className="text-content">
      <h2>Observation:</h2>
      <b>Date:</b>{" "}
      {sighting && `${sighting.SEASON} ${sighting.MONTH} ${sighting.YEAR} `}
      <br></br>
      <b>Location:</b>{" "}
      <div>
        {sighting &&
          `${sighting.STATE}: ${sighting.COUNTY}, ${sighting["NEAREST_TOWN"]}`}
      </div>
      <br></br>
      <b>Loc. Details:</b>{" "}
      <div>{sighting && `${sighting.LOCATION_DETAILS}`}</div>
      <br></br>
      <b>Description:</b> <div>{sighting && `${sighting.OBSERVED}`}</div>
      <br></br>
      <Button onClick={handleButtonClick}>Return to Page</Button>
    </div>
  );
};

export default Display;
