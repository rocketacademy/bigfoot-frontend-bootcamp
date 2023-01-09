import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";

import { BACKEND_URL } from "./constants.js";

const Sighting = () => {
  const [sightingIndex, setSightingIndex] = useState();
  const [sighting, setSighting] = useState();

  useEffect(() => {
    if (sightingIndex) {
      axios
        .get(`${BACKEND_URL}/sightings/${sightingIndex}`)
        .then((response) => {
          setSighting(response.data[0]);
        });
    }
    // Only run this effect on change to sightingIndex
  }, [sightingIndex]);

  // Update sighting index in state if needed to trigger data retrieval
  const params = useParams();
  if (sightingIndex !== params.sightingIndex) {
    setSightingIndex(params.sightingIndex);
  }

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
        <Card.Body>
          <Card.Title>
            {sighting &&
              `${sighting.YEAR} ${sighting.SEASON} ${sighting.MONTH}`}
          </Card.Title>
          {sightingDetails}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Sighting;
