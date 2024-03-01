import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { BACKEND_URL } from "../constants";
import { Button, TextField } from "@mui/material";

import "../App.css";

export default function NewPage() {
  const [date, setDate] = useState(null);
  const [location, setLocation] = useState(null);
  const [notes, setNotes] = useState(null);
  const navigate = useNavigate();

  const handleAdd = async () => {
    try {
      const sightingData = await axios
        .post(`${BACKEND_URL}/sightings/`, {
          date: date,
          location: location,
          notes: notes,
        })
        .then((res) => {
          setDate("");
          setLocation("");
          setNotes("");
          console.log(res);
          navigate(`/sightings/${res.data.id}`);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h3>New</h3>
        </div>
        <div>
          <TextField
            value={date}
            type="datetime-local"
            color="warning"
            onChange={(e) => setDate(e.target.value)}
            label="Date"
          ></TextField>
          <TextField
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            label="Location"
          ></TextField>
          <TextField
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            label="Notes"
          ></TextField>
          <Button onClick={handleAdd}>Submit</Button>
        </div>
      </header>
    </div>
  );
}
