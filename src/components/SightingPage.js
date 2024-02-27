import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { BACKEND_URL } from "../constants";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../App.css";

export default function SightingPage() {
  const params = useParams();
  const id = params.sightingId;
  const [sighting, setSighting] = useState();

  useEffect(() => {
    const takeSightings = async () => {
      try {
        const sightingData = await axios.get(`${BACKEND_URL}/sightings/${id}`);
        const sightingInfo = sightingData.data;
        setSighting(sightingInfo);
      } catch (error) {
        console.error(error);
      }
    };
    takeSightings();
  }, [id]);

  let sightingMoreInfo = null;

  if (sighting) {
    sightingMoreInfo = (
      <div>
        <Card className="page-layout">
          <CardContent>
            <Typography>{sighting.location}</Typography>
            <Typography>{sighting.date}</Typography>
            <Typography>{sighting.notes}</Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h3>Entry #{id}</h3>
        </div>
        <div className="page-layout">{sighting && sightingMoreInfo}</div>
      </header>
    </div>
  );
}
