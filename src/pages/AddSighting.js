import { useState } from "react";
import axios from "axios";

export default function AddSighting() {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const addSighting = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sightings`,
        {
          date,
          location,
          notes,
        }
      );
      alert("Added successfully!");
      console.log(response);
      setDate("");
      setLocation("");
      setNotes("");
    } catch (error) {
      console.error("Error adding sighting", error);
    }
  };

  return (
    <div>
      <div
        style={{
          background: "#fcd5ce",
          width: "50vw",
          margin: "3rem auto 0 auto",
          borderRadius: "15px",
          padding: "2rem",
        }}
      >
        <h3>REPORT NEW SIGHTING</h3>
        <div>
          <label>
            <strong>Date </strong>
          </label>
          <input
            type="text"
            value={date}
            placeholder="YYYY-MM-DD"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>
            <strong>Location </strong>
          </label>
          <input
            type="text"
            value={location}
            placeholder="e.g. Germany"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "0.8rem" }}>
          <label>
            <strong>Notes </strong>
          </label>
          <textarea
            type="text"
            value={notes}
            placeholder="e.g. I was chased by a bigfoot..."
            onChange={(e) => setNotes(e.target.value)}
            style={{ resize: "none", height: "4rem", fontFamily: "arial" }}
          />
        </div>
        <button className="buttons" onClick={addSighting}>
          Submit
        </button>
      </div>
    </div>
  );
}
