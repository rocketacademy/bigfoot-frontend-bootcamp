import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";

export default function Form() {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [options, setOptions] = useState([]);
  const [userOption, setUserOption] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get(`${BACKEND_URL}/categories`);
      setOptions(
        data.map((option) => ({ value: option.name, label: option.name }))
      );
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(`${BACKEND_URL}/sightings`, {
      date: date,
      location: location,
      notes: notes,
      weather: userOption,
    });

    console.log(data);

    navigate(`/sightings/${data.id}`);
  };

  const handleOptions = () => {};

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Add your sighting here:</label>
        <br />
        <input
          type="datetime-local"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <br />
        <input
          type="text"
          value={location}
          placeholder="Location"
          onChange={({ target }) => setLocation(target.value)}
        />
        <br />
        <input
          type="text"
          value={notes}
          placeholder="Notes"
          onChange={({ target }) => setNotes(target.value)}
        />
        <br />

        <Select
          makeAnimated
          isMulti
          options={options}
          value={userOption}
          onChange={handleOptions}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
