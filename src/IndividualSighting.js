import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { BACKEND_URL } from "./constants.js";

export default function CallIndividualSighting() {
  let { sightingIndex } = useParams();
  console.log(sightingIndex);
  const [individualSighting, setIndividualSighting] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/sightings/${sightingIndex}`)
      .then((response) => {
        setIndividualSighting(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  function onButtonClick() {
    navigate(-1);
  }

  return (
    <div>
      <Button onClick={onButtonClick}>Go back</Button>
      <br />
      Year: {individualSighting.YEAR}
      <br />
      Month:{" "}
      {individualSighting.MONTH ? individualSighting.MONTH : "Not recorded."}
      <br />
      Season: {individualSighting.SEASON}
      <br />
      <br />
      <br />
      Observed: {individualSighting.OBSERVED}
      <p>Yea man.</p>
    </div>
  );
}
