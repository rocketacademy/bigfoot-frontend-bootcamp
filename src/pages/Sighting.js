import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function SightingsList() {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const [sighting, setSighting] = useState([]);
  const sightingId = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (sightingId) {
      getSightingId();
    }
  }, [sightingId]);

  const getSightingId = async () => {
    let response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/sightings/${sightingId}`
    );
    console.log(response.data);
    setSighting(response.data);
  };

  useEffect(() => {
    // Set the initial state values
    setDate(sighting.date);
    setLocation(sighting.location);
    setNotes(sighting.notes);
  }, [sighting]);

  const saveEdits = async () => {
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/sightings/${sightingId}`,
      {
        date,
        location,
        notes,
      }
    );
    getSightingId();
  };

  const cancelEdit = () => {
    setDate(sighting.date);
    setLocation(sighting.location);
    setNotes(sighting.notes);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div
      style={{
        margin: "3rem",
        fontSize: "0.8rem",
        width: "80%",
        margin: "auto",
      }}
    >
      <button onClick={handleBack}>Back to Previous Page</button>
      <br />
      <br />
      <div>
        <strong>SIGHTING #{sightingId}</strong>
      </div>
      <br />
      <div>
        <strong>Date: </strong>
        {sighting.date}
      </div>
      <div>
        <strong>Location: </strong>
        {sighting.location}
      </div>
      <div>
        <strong>Notes: </strong>
        {sighting.notes}
      </div>
      <div
        style={{
          border: "5px solid white",
          padding: "1rem 2rem 2rem",
          margin: "2rem auto",
          width: "50vw",
        }}
      >
        <h3>UPDATE SIGHTING DETAILS BELOW:</h3>
        <div>
          <strong>Date:</strong>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <strong>Location:</strong>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <strong>Notes:</strong>
          <textarea
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{
              resize: "none",
              height: "4rem",
              fontFamily: "arial",
              width: "80%",
            }}
          />
        </div>
        <button onClick={saveEdits}>Save Changes</button>
        <button onClick={cancelEdit}>Cancel</button>
      </div>
    </div>
  );
}
