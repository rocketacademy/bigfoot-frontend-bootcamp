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
  const params = useParams();
  const navigate = useNavigate();

  const [sighting, setSighting] = useState({});

  useEffect(() => {
    axios.get(`${Backend_URL}/sightings/${params.id}`).then((response) => {
      console.log(response.data);
      setSighting(response.data);
    });
  }, [params.id]);

  const items = Object.entries(sighting).map(([key, value]) => (
    <div>
      <Typography>
        {key}: {value}
      </Typography>
    </div>
  ));

  return (
    <Card>
      <CardContent>{items}</CardContent>
      <CardActions>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </CardActions>
    </Card>
  );
}
