import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SightingsList() {
  const [sightings, setSightings] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get("http://localhost:3000/sightings");
        console.log(data.data);
        setSightings(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const newSightings = (
    <ol>
      {sightings.map((sighting) =>
        sighting.YEAR && sighting.SEASON && sighting.STATE ? (
          <li>
            <p>Year: {sighting.YEAR}</p>
            <p> Season: {sighting.SEASON}</p>
            <p> State: {sighting.STATE}</p>
            {/* <p> Location: {sighting.LOCATION_DETAILS} </p> */}
          </li>
        ) : null
      )}
    </ol>
  );
  return <div>{newSightings}</div>;
}
