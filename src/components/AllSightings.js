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
      console.log(response.data);
      setSightings(response.data);
    });
  }, []);

  return (
    <div>
      {sightings.map((item, index) => (
        <Card>
          <CardContent>
            <Typography>YEAR: {item.YEAR}</Typography>
            <Typography>STATE: {item.STATE}</Typography>
            <Typography>COUNTY: {item.COUNTY}</Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => navigate(`/DetailSightings/${index}`)}>
              Details
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
