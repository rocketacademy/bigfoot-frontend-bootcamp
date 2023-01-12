import React, { useState, useEffect, startTransition } from "react";
import axios from "axios";
import { serverURL } from "../ServerURL";
import { useParams, Link } from "react-router-dom";
import { Card } from "antd";

const Sighting = () => {
  const [sightings, setSightings] = useState([]);
  const [sightingID, setSightingID] = useState(0);
  const params = useParams();

  useEffect(() => {
    axios
      .get(`${serverURL}/${sightingID}`)
      .then((response) => setSightings(response.data));
  }, [sightingID]);

  if (sightingID != params.sightingID) setSightingID(params.sightingID);

  return (
    <div>
      <Card
        title={`Sighting No.: ${sightingID}`}
        extra={<Link to="/">Back</Link>}
        style={{
          width: 300,
          textAlign: "left",
          margin: 50,
        }}
      >
        <p>Date: {sightings.date}</p>
        <p>Location: {sightings.location}</p>
        <p>Notes: {sightings.notes}</p>
      </Card>
    </div>
  );
};

export default Sighting;
