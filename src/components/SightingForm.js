import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../constants";

export default function SightingForm() {
  const [sightingInputs, setSightingsInput] = useState({
    date: "",
    location: "",
    notes: "",
  });

  const handleInput = (event) => {
    console.log(sightingInputs);
    setSightingsInput({
      ...sightingInputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`${BACKEND_URL}/sightings`, sightingInputs)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <div className="Sighting-Form">
      <h3>Report Your Sighting</h3>
      <form onSubmit={handleSubmit}>
        <p>
          <label>Date: </label>
          <input
            type="datetime-local"
            name="date"
            value={sightingInputs.date}
            onChange={handleInput}
          />
        </p>
        <p>
          <label>Location: </label>
          <input
            type="text"
            name="location"
            value={sightingInputs.location}
            onChange={handleInput}
          />
        </p>
        <p>
          <label>Notes: </label>
          <textarea
            type="text"
            name="notes"
            value={sightingInputs.notes}
            onChange={handleInput}
          />
        </p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
