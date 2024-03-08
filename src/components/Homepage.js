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
    };
    takeSightings();
  }, []);

  const sightlingList = sightings.map((sighting) => {
    //filter category
    const categoriesList = sighting.categories;
    const categoriesData = categoriesList.map((category, index) => (
      <span key={index}>{category.name} </span>
    ));

    return (
      <Card className="homepage-list" key={sighting.id}>
        <Link to={`/sightings/${sighting.id}`} key={sighting.id}>
          <CardContent>
            <Typography variant="body2">{sighting.location}</Typography>
            <Typography variant="body2">{sighting.date}</Typography>
            <Typography>Categories: {categoriesData}</Typography>
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
