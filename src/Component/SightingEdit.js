import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../constant";

export default function SightingEdit() {
  const { sightingId } = useParams();
  const [date, setDate] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [locationDescription, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const navi = useNavigate();

  useEffect(() => {
    const getOneData = async () => {
      const newData = await axios.get(`${BACKEND_URL}/sightings/${sightingId}`);
      setDate(newData.data.date.substring(0, 16));
      setLocation(newData.data.locationDescription);
      setNotes(newData.data.notes);
      setCountry(newData.data.country);
      setCity(newData.data.city);
    };
    getOneData();
  }, [sightingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      date: date,
      locationDescription: locationDescription,
      notes: notes,
      city: city,
      country: country,
    };
    await axios.put(`${BACKEND_URL}/sightings/${sightingId}`, newData);
    navi(`/sightingSearch/${sightingId}`);
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
        <label>City</label>
        <textarea
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
          className="note-input"
        />
        <label>Country</label>
        <textarea
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
          }}
          className="note-input"
        />
        <label>Location</label>
        <textarea
          value={locationDescription}
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
      <Link to={`/sightingSearch/${sightingId}`}>
        <button>Cancel</button>
      </Link>
    </div>
  );
}
