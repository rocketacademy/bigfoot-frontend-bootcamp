import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { BACKEND_URL } from "../constants";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../App.css";

export default function SightingPage() {
  const { index } = useParams();
  const [sighting, setSighting] = useState();

  useEffect(() => {
    const takeSightings = async () => {
      try {
        const sightingData = await axios.get(
          `${BACKEND_URL}/sightings/${index}`
        );
        const sightingInfo = sightingData.data;
        setSighting(sightingInfo);
      } catch (error) {
        console.error(error);
      }
    };
    takeSightings();
  }, [index]);

  let sightingMoreInfo = null;

  if (sighting) {
    sightingMoreInfo = (
      <div>
        <Card className="page-layout">
          <CardContent>
            <Typography>
              {sighting.COUNTY}, {sighting.STATE}
            </Typography>
            <Typography>{sighting.OBSERVED}</Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h3>Entry #{index}</h3>
        </div>
        <div className="page-layout">{sighting && sightingMoreInfo}</div>
      </header>
    </div>
  );
}
