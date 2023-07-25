import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../constants";
import { useNavigate } from "react-router-dom";

export default function SightingEditForm({ sighting, setSighting }) {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [updatedSighting, setUpdatedSighting] = useState({});

  const handleUpdate = async (id) => {
    const { data } = await axios.put(`${BACKEND_URL}/sightings/${id}`, {
      date: updatedSighting.date || sighting.date,
      location: updatedSighting.location || sighting.location,
      notes: updatedSighting.notes || sighting.notes,
    });
    setSighting((prev) => ({
      ...prev,
      date: data.date || sighting.date,
      location: data.location || sighting.location,
      notes: data.notes || sighting.notes,
    }));
    setEditMode(false);
    navigate(`/sightings/${id}`);
  };

  function getHTML5DateTimeStringFromDate(d) {
    if (!(d instanceof Date)) {
      d = new Date(d); // Try converting to Date object if it's not already
    }

    if (isNaN(d.getTime())) {
      return ""; // Return an empty string for invalid dates
    }

    const dateString =
      d.getFullYear().toString().padStart(4, "0") +
      "-" +
      (d.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      d.getDate().toString().padStart(2, "0");

    const timeString =
      d.getHours().toString().padStart(2, "0") +
      ":" +
      d.getMinutes().toString().padStart(2, "0");

    // Combine the date and time strings with "T" in between
    return `${dateString}T${timeString}`;
  }

  return (
    <div>
      <button onClick={() => setEditMode(!editMode)}>
        {editMode ? "Cancel" : "Edit"}
      </button>
      <br />

      {editMode ? (
        <div>
          <input
            type="datetime-local"
            value={getHTML5DateTimeStringFromDate(
              updatedSighting.date || new Date(sighting.date)
            )}
            onChange={({ target }) =>
              setUpdatedSighting((prev) => ({ ...prev, date: target.value }))
            }
          />
          <br />
          <input
            type="text"
            value={updatedSighting.location || sighting.location}
            onChange={({ target }) =>
              setUpdatedSighting((prev) => ({
                ...prev,
                location: target.value,
              }))
            }
          />
          <br />
          <textarea
            type="text"
            value={updatedSighting.notes || sighting.notes}
            onChange={({ target }) =>
              setUpdatedSighting((prev) => ({ ...prev, notes: target.value }))
            }
          />
          <br />
          <button onClick={() => handleUpdate(sighting.id)}>Update</button>
        </div>
      ) : (
        <>
          <p>id: {sighting && sighting.id}</p>
          <p>date: {sighting && new Date(sighting.date).toLocaleString()}</p>
          <p>location: {sighting && sighting.location}</p>
          <p>notes: {sighting && sighting.notes}</p>
        </>
      )}
    </div>
  );
}
