import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../constant";
import { Link, useNavigate } from "react-router-dom";

export default function SightingCreate() {
  const [dateTime, setDateTime] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");
  const navi = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = { date: dateTime, location: location, notes: note };

    const res = await axios.post(`${BACKEND_URL}/sightings`, newData);
    navi(`/sightingSearch/${res.data.id}`);
  };

  return (
    <div className="App-header">
      Create Sigthing Data
      <Link to="/" className="home-button">
        <button>Go Home</button>
      </Link>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Date and Time</label>
        <input
          value={dateTime}
          type="datetime-local"
          onChange={(e) => setDateTime(e.target.value)}
        />
        <label>Location</label>
        <input
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
        <label>Note</label>
        <input
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
          }}
        />
        <input type="submit" />
      </form>
    </div>
  );
}
