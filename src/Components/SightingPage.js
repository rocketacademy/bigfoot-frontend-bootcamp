import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader } from "@mui/material";
import "./SightingPage.css";

export default function SightingPage() {
  const { index } = useParams();
  const [sighting, setSighting] = useState();
  useEffect(() => {
    const fetchSightingData = async () => {
      try {
        const data = await axios.get(
          `http://localhost:3000/sightings/${index}`
        );
        console.log(data.data);
        setSighting(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSightingData();
  }, [index]);
  const newSighting = sighting ? (
    <Card
      sx={{
        width: 800,
        minHeight: 300,
        display: "flex",
        justifyContent: "center",
        marginTop: 20,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <CardContent>
        <h4>
          {sighting.STATE} {sighting.YEAR}
        </h4>
        <p>Season: {sighting.SEASON}</p>
        <p>
          Date: {sighting.MONTH} {sighting.DATE}
        </p>
        <p>County: {sighting.COUNTY}</p>
        <p>Location: {sighting.LOCATION_DETAILS}</p>
        <p>{sighting.OBSERVED}</p>
        <p>Report number: {sighting.REPORT_NUMBER}</p>
      </CardContent>
    </Card>
  ) : null;

  return <div className="sighting-page">{newSighting}</div>;
}
