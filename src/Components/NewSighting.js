import axios from "axios";
import { useState, useEffect } from "react";
import Select from "react-select";

export default function NewSighting() {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");
  const [weather, setWeather] = useState([]);
  const [selectedWeather, setSelectedWeather] = useState("");

  const callForCategories = async () => {
    const weatherCats = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/categories/`
    );
    console.log(weatherCats);
    const names = weatherCats.data.map((cat) => {
      return { value: cat.id, label: cat.name };
    });
    console.log(names);
    setWeather(names);
  };
  useEffect(() => {
    callForCategories();
  }, []);

  return (
    <div>
      <h1>Create New Sighting below!</h1>

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          let response = await axios.post(
            `${process.env.REACT_APP_API_SERVER}/sightings/`,
            {
              date,
              location,
              note,
              weather: selectedWeather,
            }
          );
          console.log(response.data);
        }}
      >
        <label>Weather</label>
        <br />
        <Select
          options={weather}
          onChange={(e) => {
            console.log(e);
            setSelectedWeather(e.value);
          }}
        />
        <br />
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
