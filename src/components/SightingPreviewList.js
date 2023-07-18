import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BACKEND_URL from "./constant";

import SightingPreview from "../components/SightingPreview";

const SightingPreviewList = () => {
  const [sightings, setSightings] = useState([]);

  //1. Pulling all sightings from server
  useEffect(() => {
    axios.get(`${BACKEND_URL}/sightings`).then((response) => {
      setSightings(response.data);
    });
    // Only run this effect on component mount
  }, []);

  //2. Mapping the sighting to sighting and index them via mapping; It creates custom links in a loop > each custom link (i.e. reprsented by Sighting Preview) is linked to a route that shows the full sighting
  const sightingPreviews = sightings.map((sighting, index) => (
    <Link to={`/sightings/${index}`} key={index}>
      <SightingPreview data={sighting} />
    </Link>
  ));

  return <div>{sightingPreviews}</div>;
};

export default SightingPreviewList;
