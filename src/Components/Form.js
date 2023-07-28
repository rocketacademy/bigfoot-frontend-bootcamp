import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants";
import { useNavigate } from "react-router-dom";
// import Select from "react-select";
import makeAnimated from "react-select/animated";
import Button from "react-bootstrap/Button";
import Creatable from "react-select/creatable";

export default function Form() {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [locationDescription, setLocationDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [options, setOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [intensity, setIntensity] = useState([]);

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

  useEffect(() => {
    console.log(intensity);
  }, [intensity]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(`${BACKEND_URL}/sightings`, {
      date,
      locationDescription,
      notes,
      categoryIds: userOptions.map((option) => option.value),
      city,
      country,
      intensityIds: intensity.map((i) => i),
    });

    console.log(data);

    navigate(`/sightings/${data.id}`);
  };

  const backToHomePage = () => {
    navigate("/");
  };

  const createOption = (label) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ""),
  });

  const handleCreate = (inputValue) => {
    setIsLoading(true);
    setTimeout(async () => {
      const newOption = createOption(inputValue);
      const { data } = await axios.post(`${BACKEND_URL}/categories`, {
        name: newOption.value,
      });
      setIsLoading(false);
      setOptions((prev) => [
        ...prev,
        { label: newOption.label, value: data.id },
      ]);
      setUserOptions((prev) => [
        ...prev,
        { label: newOption.label, value: data.id },
      ]);
    }, 1000);
  };

  return (
    <div>
      <Button onClick={backToHomePage}>Home</Button>
      <form onSubmit={handleSubmit}>
        <label>Add your sighting here:</label>
        <br />
        <input
          type="datetime-local"
          value={date}
          onChange={({ target }) => setDate(target.value)}
          required
        />
        <br />
        <input
          type="text"
          value={locationDescription}
          placeholder="Location Description"
          onChange={({ target }) => setLocationDescription(target.value)}
          required
        />
        <br />
        <input
          type="text"
          value={city}
          placeholder="City"
          onChange={({ target }) => setCity(target.value)}
          required
        />
        <br />
        <input
          type="text"
          value={country}
          placeholder="Country"
          onChange={({ target }) => setCountry(target.value)}
          required
        />
        <br />
        <textarea
          type="text"
          value={notes}
          placeholder="Notes"
          onChange={({ target }) => setNotes(target.value)}
          required
        />
        <br />

        <label>Weather & Intensity (1 - sparse; 2 - light; 3- heavy)</label>
        <Creatable
          components={makeAnimated()}
          isMulti
          options={options}
          value={userOptions}
          // The react-select component has its own onChange prop, but it behaves differently from the vanilla HTML select element's onChange. In react-select, the onChange prop takes a function as its value and is triggered whenever the user selects or deselects an option, either for single or multi-select. The onChange function receives the selected option(s) or value(s) directly as its first argument.
          // onChange={(selectedOptions) => setUserOptions(selectedOptions)}
          // Option property is for styling, ...defaultStyles is to retain any other default styles from the Select component
          styles={{
            option: (defaultStyles) => ({
              ...defaultStyles,
              color: "black",
            }),
          }}
          isClearable
          isDisabled={isLoading}
          isLoading={isLoading}
          onChange={(newValue) => setUserOptions(newValue)}
          onCreateOption={handleCreate}
          required
        />

        {userOptions.map((userOption, index) => (
          <div key={userOption.value}>
            <label>{userOption.label}'s intensity</label>
            <input
              type="number"
              value={intensity[index]}
              onChange={({ target }) => {
                const updatedIntensity = [...intensity];
                updatedIntensity[index] = target.value;
                setIntensity(updatedIntensity);
              }}
              min={1}
              max={3}
              required
            />
          </div>
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
