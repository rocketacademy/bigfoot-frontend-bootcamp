// CommentForm.js
import React, { useState } from "react";
import axios from "axios";

export default function SightingForm({ displaySightings }) {
  const [sighting, setSighting] = useState({
    location: "",
    notes: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSighting({
      location: "",
      notes: "",
    });
    // Send a POST request to the API
    await axios.post(`http://localhost:3000/sightings/`, {
      date: new Date(),
      location: sighting.location,
      notes: sighting.notes,
    });
    displaySightings();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        New sighting:
        <input
          type="text"
          placeholder="Location"
          onChange={(event) => setSighting(event.target.value)}
        />
        <input
          type="text"
          placeholder="Notes"
          onChange={(event) => setSighting(event.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
