import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

import { BACKEND_URL } from "./constants.js";

const SightingPreviewList = () => {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/sightings`).then((response) => {
      setSightings(response.data);
    });
    // Only run this effect on component mount
  }, []);

  const sightingPreviews = sightings.map((sighting, index) => (
    <Link to={`/sightings/${index}`} key={index}>
      <Card className="custom-class">
        <Card.Body>
          <Card.Title>
            {`${sighting.YEAR} ${sighting.SEASON} ${sighting.MONTH}`}
          </Card.Title>
        </Card.Body>
      </Card>
    </Link>
  ));

  return <div>{sightingPreviews}</div>;
};

export default SightingPreviewList;
