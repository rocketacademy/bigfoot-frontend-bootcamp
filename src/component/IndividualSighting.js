import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../constants";

const IndividualSighting = () => {
  const [sightings, setSightings] = useState([]);
  const { sightingId } = useParams();

  useEffect(() => {
    if (sightingId) {
      axios.get(`${BACKEND_URL}/sightings/${sightingId}`).then((response) => {
        setSightings(response.data);
      });
    }
  }, [sightingId]);

  const sightingInfo = [];
  const keys = Object.keys(sightings);
  keys.forEach((key, index) => {
    sightingInfo.push(`${key}: ${sightings[key]}`);
  });

  const details = sightingInfo.map((sighting) => {
    return <p>{sighting}</p>;
  });

  return (
    <>
      <div className="grid grid-cols-1 text-center">{details}</div>
    </>
  );
};

export default IndividualSighting;
