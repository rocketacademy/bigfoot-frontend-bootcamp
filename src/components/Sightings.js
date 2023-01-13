import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom"; 

import { BACKEND_URL } from "../constants";

export default function Sightings(){
  const [sightingIndex, setSightingIndex] = useState();
  const [sightings, setSightings] = useState()

  useEffect(() => {
    // If there is a sightingIndex, retrieve the sighting data
    if (sightingIndex) {
      console.log(sightingIndex)
      axios
        .get(`${BACKEND_URL}/sightings/${sightingIndex}`)
        .then((response) => {
          setSightings(response.data);
        });
    }
    // Only run this effect on change to sightingIndex
  }, [sightingIndex]);

  const params = useParams();
  if (sightingIndex !== params.sightingIndex) {
    setSightingIndex(params.sightingIndex);
  }

  let element

  if(sightings === undefined){
    element = <p> NO SIGHTINGS OBSERVED</p>
  }
  else{
    element =  
    <div>
      <h2>Sighting #{sightings.REPORT_NUMBER}</h2>
      <h4>
        Date: {sightings.SEASON} {sightings.YEAR}
      </h4>
      <h4>
        Location: {sightings.STATE}, {sightings.COUNTY}
      </h4>
      <h4>Class: {sightings.REPORT_CLASS}</h4>
      <p>{sightings.OBSERVED}</p>
    </div>
  }

  return (
    <div>
      <Link to="/">Home</Link>
      {element}
    </div>
  );
}