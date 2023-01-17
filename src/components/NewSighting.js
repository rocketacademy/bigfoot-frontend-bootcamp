import React, { useState } from "react";
import axios from "axios";
import { Backend_URL } from "../Backend_URL";
import { Card, CardContent, CardActions, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NewSighting() {
  let navigate = useNavigate();
  const [newSighting, setNewSighting] = useState({
    date: "",
    location: "",
    notes: "",
  });
  const handleUserInput = (e) => {
    setNewSighting({
      ...newSighting,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${Backend_URL}`, {
        date: newSighting.date,
        location: newSighting.location,
        notes: newSighting.notes,
      })
      .then((response) => {
        setNewSighting({});
        navigate(`/sightings/${response.date.id}`);
      });
  };

  return (
    <Card>
      <CardContent>
        <p>
          <label htmlFor="sightingDate">Date: </label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={newSighting.date}
            placeholder={new Date()}
            onChange={handleUserInput}
          />
        </p>
        <p>
          <label htmlFor="sightingLocation">Location: </label>
          <input
            type="text"
            id="location"
            name="location"
            required
            value={newSighting.location}
            placeholder="Location"
            onChange={handleUserInput}
          />
        </p>
        <p>
          <label htmlFor="SightingNotes">Notes: </label>
          <textarea
            id="notes"
            name="notes"
            required
            placeholder="Information on Sighting"
            value={newSighting.notes}
            onChange={handleUserInput}
          />
        </p>
      </CardContent>
      <CardActions>
        <Button onClick={handleSubmit}>Submit</Button>
      </CardActions>
    </Card>
  );
}
