import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants";
import { useParams } from "react-router-dom";

export default function SightingEditForm({ sighting, setSighting }) {
  const { sightingId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [updatedSighting, setUpdatedSighting] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${BACKEND_URL}/sightings/${sightingId}`
      );
      setSighting(data);
    };

    fetchData();
  });

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
  };

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
            value={updatedSighting.date || sighting.date}
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
          <p>date: {sighting && sighting.date}</p>
          <p>location: {sighting && sighting.location}</p>
          <p>notes: {sighting && sighting.notes}</p>
        </>
      )}
    </div>
  );
}
