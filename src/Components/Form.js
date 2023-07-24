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
  const [userOptions, setUserOptions] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get(`${BACKEND_URL}/categories`);
      console.log(data);
      setOptions(
        data.map((option) => ({ value: option.id, label: option.name }))
      );
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    console.log(userOptions);
  }, [userOptions]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(`${BACKEND_URL}/sightings`, {
      date: date,
      location: location,
      notes: notes,
      categoryId: userOptions.map((option) => option.value),
    });

    console.log(data);

    navigate(`/sightings/${data.id}`);
  };

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
        <textarea
          type="text"
          value={notes}
          placeholder="Notes"
          onChange={({ target }) => setNotes(target.value)}
        />
        <br />

        <Select
          components={makeAnimated()}
          isMulti
          options={options}
          value={userOptions}
          // The react-select component has its own onChange prop, but it behaves differently from the vanilla HTML select element's onChange. In react-select, the onChange prop takes a function as its value and is triggered whenever the user selects or deselects an option, either for single or multi-select. The onChange function receives the selected option(s) or value(s) directly as its first argument.
          onChange={(selectedOptions) => setUserOptions(selectedOptions)}
          // Option property is for styling, ...defaultStyles is to retain any other default styles from the Select component
          styles={{
            option: (defaultStyles) => ({
              ...defaultStyles,
              color: "black",
            }),
          }}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
