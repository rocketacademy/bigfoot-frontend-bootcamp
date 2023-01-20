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

// const DetailSightings = (sightings) => {
//   return (
//     <Card>
//       <CardContent>{`${sightings}`}</CardContent>
//     </Card>
//   );
// };

// export default DetailSightings;

const DetailSightings = () => {
  const [sighting, setSighting] = useState([]);
  const [sightingId, setSightingId] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${Backend_URL}/sightings/${sightingId}`).then((response) => {
      console.log(response.data);
      setSighting(response.data);
    });
  }, [sightingId]);

  const params = useParams();
  if (sightingId !== params.sightingId) {
    setSightingId(params.sightingId);
  }

  const sightingDetails = Object.entries(sighting).map((sightings) => (
    <div>
      <Typography>Date: {sighting.date}</Typography>
      <Typography>Location: {sighting.location}</Typography>
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
};

export default DetailSightings;
