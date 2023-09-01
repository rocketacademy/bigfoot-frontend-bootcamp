import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BACKEND_URL from "./constant";
import { Button } from "@mui/material";
import { useNavigate,useLocation } from "react-router-dom";

const Display = () => {
  const [sightingIndex, setSightingIndex] = useState();
  const [sighting, setSighting] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If there is a sightingIndex, retrieve the sighting data
    axios.get(`${BACKEND_URL}/sightings/${sightingIndex}`).then((response) => {
      console.log(`SightingIndex: ${JSON.stringify(sightingIndex)}`);
      console.log(`Response: ${JSON.stringify(response)}`);
      console.log(`Data: ${JSON.stringify(response.data)}`);
      setSighting(response.data);
    });

    // Only run this effect on change to sightingIndex
  }, [sightingIndex]);

  // Update sighting index in state if needed to trigger data retrieval
  const params = useParams();
  if (sightingIndex !== params.sightingIndex) {
    setSightingIndex(params.sightingIndex);
  }

  const handleButtonClick = (text) => {
    navigate(`/`);
  };

  const handleEditClick = () => {
    navigate(`${location.pathname}/edit`); 
  };

  //Convertion input into

  return (
    <div className="text-content">
      <h2>Observation:</h2>
      <b>Date:</b>{" "}
      {sighting && `${sighting.date} `}
      <br></br>
      <b>Location:</b>{" "}
      <div>
        {sighting &&
          `${sighting.country}, ${sighting.city}`}
      </div>
      <br></br>
      <b>Loc. Details:</b>{" "}
      <div>{sighting && `${sighting.location}`}</div>
      <br></br>
      <b>Description:</b> <div>{sighting && `${sighting.notes}`}</div>
      <br></br>
      <Button onClick={handleEditClick}>Edit</Button>
      <Button onClick={handleButtonClick}>Return to Page</Button>
      
    </div>
  );
};

export default Display;
