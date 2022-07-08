import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function EditSighting() {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");
  const [id, setId] = useState("");
  const params = useParams();

  const getData = async () => {
    let data = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/sighting/${params.id}`
    );

    setDate(
      new Date(data.data.date)
        .toLocaleDateString("en-GB")
        .split("/")
        .reverse()
        .join("-")
    );
    setLocation(data.data.location);
    setNote(data.data.notes);
    setId(data.data.id);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Edit Sighting below!</h1>

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          let data = {
            date,
            location,
            notes: note,
          };
          console.log(data);

          let response = await axios.put(
            `${process.env.REACT_APP_API_SERVER}/sighting/${id}`,
            data
          );
          console.log(response.data);
        }}
      >
        <label>Date:</label>
        <br />
        <input
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
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
