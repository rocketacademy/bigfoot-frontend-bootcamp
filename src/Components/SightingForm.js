import React, { useState } from "react";
import { BACKEND_URL } from "../constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function SightingForm() {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const navigate = useNavigate();

  const handleNewSighting = async (e) => {
    e.preventDefault();

    // Post request to create new sighting
    try {
      await axios
        .post(`${BACKEND_URL}/sightings`, {
          date,
          location,
          notes,
        })
        .then((res) => {
          // Reset form
          setDate("");
          setLocation("");
          setNotes("");

          // Navigate to new sighting page
          navigate(`/sightings/${res.data.id}`);
        });
    } catch (error) {
      console.log("Error creating new sighting: ", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="new-sighting-header">
        <h2>Report New Sighting</h2>
        <p>Have you seen Bigfoot? Tell us about your encounter.</p>
      </div>

      <form onSubmit={handleNewSighting} className="sighting-form">
        <label htmlFor="date">Date</label>
        <input
          type="datetime-local"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="sighting-input"
        />
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          placeholder="Enter a city, town, or country"
          className="sighting-input"
        />
        <label htmlFor="notes">Notes</label>
        <textarea
          rows="5"
          cols="50"
          id="notes"
          name="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          required
          placeholder="Describe your encounter in detail."
          className="sighting-input"
        />
        <button type="submit" className="new-sighting-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SightingForm;
