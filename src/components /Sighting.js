import React, { useState, useEffect, startTransition } from "react";
import axios from "axios";
import { serverURL } from "../ServerURL";
import { useParams, Link } from "react-router-dom";
import { Card } from "antd";

const Sighting = () => {
  const [sightings, setSightings] = useState([]);
  const [sightingIndex, setSightingIndex] = useState(0);
  const params = useParams();
  console.log(params.sightingIndex);

  useEffect(() => {
    axios
      .get(`${serverURL}/${sightingIndex}`)
      .then((response) => setSightings(response.data));
  }, [sightingIndex]);

  if (sightingIndex != params.sightingIndex)
    setSightingIndex(params.sightingIndex);

  return (
    <div>
      <Card
        title={`Sighting No.: ${sightingIndex}`}
        extra={<Link to="/">Back</Link>}
        style={{
          width: 300,
          textAlign: "left",
          margin: 50,
        }}
      >
        <p>Year: {sightings.YEAR}</p>
        <p>Season: {sightings.SEASON}</p>
        <p>
          Date: {sightings.DATE} {sightings.MONTH}
        </p>
        <p>
          Location: {sightings.STATE} {sightings.COUNTY}
        </p>
        <p>Directions: {sightings.LOCATION_DETAILS}</p>
        <p>Observation: {sightings.OBSERVED}</p>
      </Card>
    </div>
  );
};

export default Sighting;
