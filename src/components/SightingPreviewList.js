import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SightingPreview from "./SightingPreview";
import { BACKEND_URL } from "../constants.js";

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
      <SightingPreview data={sighting} />
    </Link>
  ));

  return <div>{sightingPreviews}</div>;
};

export default SightingPreviewList;
