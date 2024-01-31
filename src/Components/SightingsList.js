import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
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

  const newSightings = sightings.map((sighting, index) =>
    sighting.YEAR && sighting.SEASON && sighting.STATE ? (
      <Card sx={{ marginBottom: 3 }}>
        <div key={index}>
          <p>{index + 1}</p>
          <p>Year: {sighting.YEAR}</p>
          <p> Season: {sighting.SEASON}</p>
          <p> State: {sighting.STATE}</p>
        </div>
      </Card>
    ) : null
  );

  return (
    <div>
      <h1>Bigfoot sightings</h1>
      {newSightings}
    </div>
  );
}
