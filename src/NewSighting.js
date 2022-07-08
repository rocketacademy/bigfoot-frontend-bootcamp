import axios from "axios";
import { useState } from "react";

export default function NewSighting() {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");

  return (
    <div>
      <h1>Create New Sighting below!</h1>

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          let response = await axios.post(
            `${process.env.REACT_APP_API_SERVER}/sighting/`,
            {
              date,
              location,
              note,
            }
          );
          console.log(response.data);
        }}
      >
        <label>Date:</label>
        <br />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <br />

        <label>Location:</label>
        <br />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Where did you see it!"
        />
        <br />

        <label>Note:</label>
        <br />
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Describe your encounter"
        />
        <br />

        <input type="submit" value="submit" />
      </form>
    </div>
  );
}
