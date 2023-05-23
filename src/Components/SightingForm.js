import React, { useState } from "react";
import { BACKEND_URL } from "../constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function SightingForm() {
  const [date, setDate] = useState("");
  const [locationDescription, setLocationDescription] = useState("");
  const [country, setCountry] = useState("");
  const [cityTown, setCityTown] = useState("");
  const [notes, setNotes] = useState("");

  const navigate = useNavigate();

  const handleNewSighting = async (e) => {
    e.preventDefault();

    // Post request to create new sighting
    try {
      await axios
        .post(`${BACKEND_URL}/sightings`, {
          date,
          locationDescription,
          country,
          cityTown,
          notes,
        })
        .then((res) => {
          // Reset form
          setDate("");
          setLocationDescription("");
          setCountry("");
          setCityTown("");
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
        <label htmlFor="locationDescription">Location Description</label>
        <input
          type="text"
          id="locationDescription"
          name="locationDescription"
          value={locationDescription}
          onChange={(e) => setLocationDescription(e.target.value)}
          required
          placeholder="Describe your location"
          className="sighting-input"
        />
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          placeholder="Enter a country"
          className="sighting-input"
        />
        <label htmlFor="cityOrTown">City/Town</label>
        <input
          type="text"
          id="cityOrTown"
          name="cityOrTown"
          value={cityTown}
          onChange={(e) => setCityTown(e.target.value)}
          required
          placeholder="Enter a city or town"
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
