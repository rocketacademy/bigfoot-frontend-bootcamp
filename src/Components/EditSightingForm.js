// To do: Update form to work with city, country data

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { BACKEND_URL } from "../constants";

const EditSightingForm = (props) => {
  // console.log(props.data);

  const [date, setDate] = useState(props.data.date);
  const [location, setLocation] = useState(props.data.location);
  const [notes, setNotes] = useState(props.data.notes);
  const [city, setCity] = useState(props.data.city);
  const [country, setCountry] = useState(props.data.country);
  const navigate = useNavigate();

  const handleSightingSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.put(`${BACKEND_URL}/${props.sightingId}/edit`, {
      date: date,
      location_discription: location,
      notes: notes,
      city: city,
      country: country,
      id: props.sightingId,
    });

    const sightingId = res.data;

    setDate("");
    setLocation("");
    setNotes("");

    navigate(`/sightings/${sightingId}`);
  };

  return (
    <form onSubmit={handleSightingSubmit}>
      {/* {console.log(date)}
      {console.log(props.data.date)} */}
      Date:{" "}
      <input
        type="datetime-local"
        name="date"
        value={date}
        min="1900-06-07T00:00"
        // max="2023-07-01T00:00"
        onChange={(e) => {
          setDate(e.target.value);
        }}
      />
      <br />
      Location Discription:{" "}
      <textarea
        type="text"
        rows="3"
        cols="29"
        name="location"
        value={location}
        onChange={(e) => {
          setLocation(e.target.value);
        }}
      />
      <br />
      Notes:{" "}
      <textarea
        type="text"
        rows="3"
        cols="29"
        name="notes"
        value={notes}
        onChange={(e) => {
          setNotes(e.target.value);
        }}
      />
      <br />
      City:{" "}
      <input
        type="text"
        name="notes"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
      />
      <br />
      Country:{" "}
      <input
        type="text"
        name="notes"
        value={country}
        onChange={(e) => {
          setCountry(e.target.value);
        }}
      />
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default EditSightingForm;
