import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Backend_URL } from "../Backend_URL";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

export default function DetailSightings() {
  const [sighting, setSighting] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${Backend_URL}/sightings/${params.id}`).then((response) => {
      console.log(response.data);
      setSighting(response.data);
    });
  }, [params.id]);

  const sightingDetails = sighting.map(([sightings, value]) => (
    <div>
      <Typography>
        {sightings}: {value}
      </Typography>
    </div>
  ));

  return (
    <Card>
      <CardContent>{sightingDetails}</CardContent>
      <CardActions>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </CardActions>
    </Card>
  );
}
