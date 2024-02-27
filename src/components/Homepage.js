import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../constants";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../App.css";

export default function Homepage() {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    const takeSightings = async () => {
      const sightingData = await axios.get(`${BACKEND_URL}/sightings`);
      const sightingInfo = sightingData.data;
      setSightings(sightingInfo);
      console.log(sightings);
    };
    takeSightings();
  }, []);

  console.log(sightings);

  const sightlingList = sightings.map((sighting) => {
    return (
      <Card className="homepage-list" key={sighting.id}>
        <Link to={`/sightings/${sighting.id}`} key={sighting.id}>
          <CardContent>
            <Typography variant="body2">{sighting.location}</Typography>
            <Typography variant="body2">{sighting.date}</Typography>
          </CardContent>
        </Link>
      </Card>
    );
  });

  return (
    <div className="page-layout">
      <Link to={`/new`}>New</Link>
      {sightlingList}
    </div>
  );
}
