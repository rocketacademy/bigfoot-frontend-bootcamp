import axios from "axios";
import React, { useState } from "react";
import { BACKEND_URL } from "../constants";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(`${BACKEND_URL}/sightings`, {
      date: date,
      location: location,
      notes: notes,
    });

    console.log(data);

    navigate(`/sightings/${data.id}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Add your sighting here:</label>
        <br />
        <input
          type="datetime-local"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <br />
        <input
          type="text"
          value={location}
          placeholder="Location"
          onChange={({ target }) => setLocation(target.value)}
        />
        <br />
        <input
          type="text"
          value={notes}
          placeholder="Notes"
          onChange={({ target }) => setNotes(target.value)}
        />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
