import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Container,
  CardActions,
  Button,
} from "@mui/material";
import axios from "axios";
import { BACKEND_URL } from "../constants.js";
import { Stack } from "@mui/system";

export default function SightingAll() {
  const navigate = useNavigate();

  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/sightings`).then((response) => {
      console.log(response.data);
      setSightings(response.data);
    });
  }, []);

  return (
    <Container>
      <Box sx={{ display: "flex", flexGrow: 1, flexWrap: "wrap", mt: 2 }}>
        {sightings.map((item, index) => (
          <Card key={index} sx={{ minWidth: 350 }}>
            <CardContent>
              <Stack direction="row" spacing={1}>
                <Typography>YEAR:</Typography>
                <Typography>{item.YEAR}</Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography>STATE:</Typography>
                <Typography>{item.STATE}</Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography>COUNTY:</Typography>

                <Typography>{item.COUNTY}</Typography>
              </Stack>
            </CardContent>
            <CardActions>
              <Button onClick={() => navigate(`/SightingDetail/${index}`)}>
                Details
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
