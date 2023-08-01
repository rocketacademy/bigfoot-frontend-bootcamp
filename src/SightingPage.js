import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Typography } from "@mui/material";
import { BACKEND_URL } from "./constants";

function SightingPage() {
  const [sighting, setSighting] = useState({});
  let { id } = useParams();

  useEffect(() => {
    const fetchSightingPage = async () => {
      try {
        const data = await axios.get(`${BACKEND_URL}/sightings/${id}`);
        const sighting = data.data;
        setSighting(sighting);
        console.log(sighting);
      } catch (error) {
        console.error("Error fetching sighting:", error);
      }
    };

    fetchSightingPage();
  }, []);

  return (
    <div>
      <Link to="/">Return home</Link>
      <Card bg="light">
        <Typography gutterBottom variant="h2">
          Sighting #{sighting.id}
        </Typography>
        <Typography variant="h5">{sighting.date}</Typography>
        <Typography variant="h5">{sighting.location}</Typography>
        <Typography variant="body2" color="text.secondary">
          {sighting.notes}
        </Typography>
      </Card>
    </div>
  );
}

export default SightingPage;
