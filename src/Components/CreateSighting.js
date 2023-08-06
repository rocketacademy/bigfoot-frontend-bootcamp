import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";

import { BACKEND_URL } from "../constants";

const CreateSightingPage = () => {
  const [dateInput, setDateInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [notesInput, setNotesInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [countryInput, setCountryInput] = useState("");

  const navigate = useNavigate();

  const handleDateInput = (e) => {
    setDateInput(e.target.value);
  };
  const handleLocationInput = (e) => {
    setLocationInput(e.target.value);
  };
  const handleNotesInput = (e) => {
    setNotesInput(e.target.value);
  };
  const handleCityInput = (e) => {
    setCityInput(e.target.value);
  };
  const handleCountryInput = (e) => {
    setCountryInput(e.target.value);
  };
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
        <label>
          Date:{" "}
          <input
            type="datetime-local"
            name="meeting-time"
            value={dateInput}
            min="1900-06-07T00:00"
            // max="2023-07-01T00:00"
            onChange={handleDateInput}
          />
          <br />
          Location:{" "}
          <input
            type="text"
            value={locationInput}
            onChange={handleLocationInput}
          />
          <br />
          Notes:{" "}
          <input type="text" value={notesInput} onChange={handleNotesInput} />
          <br />
          City:{" "}
          <input type="text" value={cityInput} onChange={handleCityInput} />
          <br />
          Country:{" "}
          <input
            type="text"
            value={countryInput}
            onChange={handleCountryInput}
          />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default CreateSightingPage;
