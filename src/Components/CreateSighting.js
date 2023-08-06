import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";

import { BACKEND_URL } from "../constants";

const CreateSightingPage = () => {
  const [dateInput, setDateInput] = useState(
    new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16)
  );
  const [locationInput, setLocationInput] = useState("");
  const [notesInput, setNotesInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [countryInput, setCountryInput] = useState("");
  const navigate = useNavigate();

  const handleSightingSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(`${BACKEND_URL}/new`, {
      date: dateInput,
      location_discription: locationInput,
      notes: notesInput,
      city: cityInput,
      country: countryInput,
    });

    const sightingId = res.data;

    setDateInput("");
    setLocationInput("");
    setNotesInput("");

    navigate(`/sightings/${sightingId}`);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/");
        }}
      >
        Back
      </Button>
      <br />
      <br />
      <form onSubmit={handleSightingSubmit}>
        Date:{" "}
        <input
          type="datetime-local"
          name="meeting-time"
          value={dateInput}
          min="1900-06-07T00:00"
          // max="2023-07-01T00:00"
          onChange={(e) => setDateInput(e.target.value)}
        />
        <br />
        Location:{" "}
        <input
          type="text"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
        />
        <br />
        Notes:{" "}
        <input
          type="text"
          value={notesInput}
          onChange={(e) => setNotesInput(e.target.value)}
        />
        <br />
        City:{" "}
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <br />
        Country:{" "}
        <input
          type="text"
          value={countryInput}
          onChange={(e) => setCountryInput(e.target.value)}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default CreateSightingPage;
