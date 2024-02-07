import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import { CardContent, Container } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import GoBackButton from "./GoBackButton";
import { BACKEND_URL } from "../constants.js";
import SearchPage from "./SearchPage.js";

export default function SightingsList() {
  const [sightings, setSightings] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const stateQuery = searchParams.get("state") || "";
  const yearQuery = searchParams.get("year") || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = {};
        if (stateQuery) {
          query.state = stateQuery;
        }
        if (yearQuery) {
          query.year = yearQuery;
        }
        const { data } = await axios.get(`${BACKEND_URL}/sightings`, {
          params: query,
        });
        setSightings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [stateQuery, yearQuery]);

  console.log(sightings);

  const newSightings = sightings.map((sighting, index) =>
    sighting.YEAR && sighting.STATE ? (
      <Link to={`./${sighting.REPORT_NUMBER}`} key={index}>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card sx={{ marginBottom: 3, width: 300 }}>
            <CardContent sx={{ display: "flex", justifyContent: "flex-start" }}>
              <p>
                {index + 1}. {sighting.STATE} {sighting.YEAR}
              </p>
            </CardContent>
          </Card>
        </Container>
      </Link>
    ) : null
  );

  return (
    <div>
      <GoBackButton />
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 3,
          marginBottom: 3,
        }}
      >
        <h1 className="page-title">Bigfoot sightings</h1>
      </Container>
      <SearchPage setSearchParams={setSearchParams} />
      {newSightings}
    </div>
  );
}
