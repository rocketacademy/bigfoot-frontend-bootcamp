import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../constants";
import axios from "axios";

function EditSightingForm({ sighting, onUpdateSighting }) {
  const [updatedSighting, setUpdatedSighting] = useState(sighting);

  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedSighting({ ...sighting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      updatedSighting.date ||
      updatedSighting.location ||
      updatedSighting.notes
    ) {
      try {
        await axios.put(`${BACKEND_URL}/sightings/${id}`, updatedSighting);
        onUpdateSighting(updatedSighting);
      } catch (error) {
        console.log("Error updating sighting:", error);
      }
    } else {
      alert(
        "Please update at least one field. Otherwise, navigate back to sighting."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="sighting-form">
      <label htmlFor="date">Date</label>
      <input
        type="text"
        id="date"
        name="date"
        value={updatedSighting.date}
        onChange={handleChange}
        className="sighting-input"
      />
      <label htmlFor="location">Location</label>
      <input
        type="text"
        id="location"
        name="location"
        value={updatedSighting.location}
        onChange={handleChange}
        className="sighting-input"
      />
      <label htmlFor="notes">Notes</label>
      <textarea
        rows="10"
        cols="50"
        id="notes"
        name="notes"
        value={updatedSighting.notes}
        onChange={handleChange}
        className="sighting-input"
      />
      <button type="submit" className="new-sighting-btn">
        Update
      </button>
    </form>
  );
}

export default EditSightingForm;
