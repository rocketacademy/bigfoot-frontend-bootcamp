import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import axios from "axios";
import { Backend_URL } from "../Backend_URL.js";

export default function AllSightings() {
  const navigate = useNavigate();

  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    axios.get(`${Backend_URL}/sightings`).then((response) => {
      setSightings(response.data);
    });
  }, []);

  const sightingPreview = sightings.map((sightings) => (
    <div>
      <Typography>Date: {sightings.date}</Typography>
      <Typography>Location: {sightings.location}</Typography>
      <Typography>Notes: {sightings.notes}</Typography>
      <CardActions>
        <Button onClick={() => navigate(`/sightings/${sightings.id}`)}>
          Details
        </Button>
      </CardActions>
    </div>
  ));

  return (
    <div>
      <Card>
        <CardContent>{sightingPreview}</CardContent>
      </Card>
    </div>
  );
}
