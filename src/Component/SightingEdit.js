import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../constant";

export default function SightingEdit() {
  const { sightingIndex } = useParams();
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const navi = useNavigate();

  useEffect(() => {
    const getOneData = async () => {
      const newData = await axios.get(
        `${BACKEND_URL}/sightings/${sightingIndex}`
      );
      setDate(newData.data.date.substring(0, 16));
      setLocation(newData.data.location);
      setNotes(newData.data.notes);
    };
    getOneData();
  }, [sightingIndex]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      date: date,
      location: location,
      notes: notes,
    };
    await axios.put(`${BACKEND_URL}/sightings/${sightingIndex}`, newData);
    navi(`/sightingSearch/${sightingIndex}`);
  };

  return (
    <div className="index-div">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Date and Time</label>
        <input
          value={date}
          type="datetime-local"
          onChange={(e) => setDate(e.target.value)}
        />
        <label>Location</label>
        <textarea
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
          className="note-input"
        />
        <label>Note</label>
        <textarea
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
          }}
          className="note-input"
        />
        <input type="submit" />
      </form>
      <Link to={`/sightingSearch/${sightingIndex}`}>
        <button>Cancel</button>
      </Link>
    </div>
  );
}
