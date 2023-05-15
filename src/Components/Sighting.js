import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_URL } from "../constants";
import Navbar from "./Navbar";

function Sighting() {
  const [sighting, setSighting] = useState();
  const [sightingIndex, setSightingIndex] = useState();

  const params = useParams();

  useEffect(() => {
    if (sightingIndex) {
      axios.get(`${BACKEND_URL}/sightings/${sightingIndex}`).then((res) => {
        setSighting(res.data);
      });
    }
  }, [sightingIndex]);

  if (sightingIndex !== params.sightingIndex) {
    setSightingIndex(params.sightingIndex);
  }

  const sightingInfo = [];
  if (sighting) {
    for (const key in sighting) {
      sightingInfo.push(<div key={key}>{`${key}: ${sighting[key]}`}</div>);
    }
  }

  return (
    <div className="sighting-ctn App">
      <Navbar />
      <div className="sighting-header">
        {sighting && `${sighting.YEAR} ${sighting.SEASON} ${sighting.MONTH}`}
      </div>
      <div className="sighting-body">{sightingInfo}</div>
    </div>
  );
}

export default Sighting;
