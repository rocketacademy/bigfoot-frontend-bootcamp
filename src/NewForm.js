import axios from "axios";
import React, { useEffect, useState } from "react";
import { FormControl, FormLabel, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "./constants";

const NewForm = () => {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    switch (event.target.name) {
      case "date":
        setDate(event.target.value);
        break;
      case "location":
        setLocation(event.target.value);
        break;
      case "notes":
        setNotes(event.target.value);
        break;
      default:
    }
  };

  const handleSubmit = (event) => {
    // Prevent default form redirect on submission
    event.preventDefault();

    // Send request to create new sighting in backend
    axios
      .post(`${BACKEND_URL}/sightings/new`, {
        date,
        location,
        notes,
      })
      .then((res) => {
        setDate("");
        setLocation("");
        setNotes("");

        // Navigate to sighting-specific page after submitting form
        navigate(`/sightings/${res.data.id}`);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Date and Time</FormLabel>
        <TextField
          // datetime-local input type allows user to input both date and time
          type="datetime-local"
          name="date"
          value={date}
          onChange={handleChange}
        />
        <FormLabel>Location</FormLabel>
        <TextField
          type="text"
          name="location"
          value={location}
          onChange={handleChange}
          placeholder="New Mexico"
        />
        <FormLabel>Notes</FormLabel>
        <TextField
          type="text"
          name="notes"
          value={notes}
          onChange={handleChange}
          multiline
          placeholder="Describe your encounter"
        />
      </FormControl>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default NewForm;
