import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { BACKEND_URL } from "../constants.js";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Container,
  CardActions,
  Stack,
} from "@mui/material";

export default function SightingDetail() {
  const params = useParams();
  const navigate = useNavigate();

  const [sighting, setSighting] = useState({});

  useEffect(() => {
    axios.get(`${BACKEND_URL}/sightings/${params.id}`).then((response) => {
      console.log(response.data);
      setSighting(response.data);
    });
  }, [params.id]);

  const items = Object.entries(sighting).map(([key, value]) => (
    <Stack direction="row" spacing={1}>
      <Typography>{key}:</Typography>
      <Typography>{value}</Typography>
    </Stack>
  ));

  return (
    <Container sx={{ mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
        }}
      >
        <Card>
          <CardActions>
            <Button onClick={() => navigate(-1)}>Back</Button>
          </CardActions>
          <CardContent>{items}</CardContent>
        </Card>
      </Box>
    </Container>
  );
}
