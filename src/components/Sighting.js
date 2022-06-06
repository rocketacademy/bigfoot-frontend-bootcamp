import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";

import { BACKEND_URL } from "../constants.js";

const Sighting = () => {
  const [sightingId, setSightingId] = useState();
  const [sighting, setSighting] = useState();

  useEffect(() => {
    // If there is a sightingId, retrieve the sighting data
    if (sightingId) {
      axios.get(`${BACKEND_URL}/sightings/${sightingId}`).then((response) => {
        setSighting(response.data);
      });
    }
    // Only run this effect on change to sightingId
  }, [sightingId]);

  // Update sighting ID in state if needed to trigger data retrieval
  const params = useParams();
  if (sightingId !== params.sightingId) {
    setSightingId(params.sightingId);
  }

  // Store a new JSX element for each property in sighting details
  const sightingDetails = [];
  if (sighting) {
    for (const key in sighting) {
      sightingDetails.push(
        <Card.Text key={key}>{`${key}: ${sighting[key]}`}</Card.Text>
      );
    }
  }

  return (
    <div>
      <Link to="/">Home</Link>
      <Card bg="dark">
        <Card.Body>{sightingDetails}</Card.Body>
      </Card>
    </div>
  );
};

export default Sighting;
