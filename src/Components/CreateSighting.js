import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Select from "react-select";

import { BACKEND_URL } from "../constants";

const CreateSightingPage = () => {
  const [dateInput, setDateInput] = useState(
    new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16)
  );
  const [locationInput, setLocationInput] = useState("");
  const [notesInput, setNotesInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [countryInput, setCountryInput] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategoriesData();
    return;
  }, []);

  const getCategoriesData = async () => {
    const res = await axios.get(`${BACKEND_URL}/categories`);
    setAllCategories(res.data);
  };

  const categoryOptions = allCategories.map((category) => ({
    // value is what we store
    value: category.id,
    // label is what we display
    label: category.name,
  }));

  // Make text black in Select field
  const selectFieldStyles = {
    option: (provided) => ({
      ...provided,
      color: "black",
    }),
  };

  const handleSightingSubmit = async (e) => {
    e.preventDefault();

    // Extract only category IDs to send to backend
    const selectedCategoryIds = selectedCategories.map(({ value }) => value);

    const res = await axios.post(`${BACKEND_URL}/sightings/new`, {
      dateInput,
      locationInput,
      notesInput,
      cityInput,
      countryInput,
      selectedCategoryIds,
    });

    const sightingId = res.data;

    setDateInput("");
    setLocationInput("");
    setNotesInput("");
    setSelectedCategories([]);

    navigate(`/sightings/${sightingId}`);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/");
        }}
      >
        Back
      </Button>
      <br />
      <br />
      <form onSubmit={handleSightingSubmit}>
        Date:{" "}
        <input
          type="datetime-local"
          name="meeting-time"
          value={dateInput}
          min="1900-06-07T00:00"
          // max="2023-07-01T00:00"
          onChange={(e) => setDateInput(e.target.value)}
        />
        <br />
        Location:{" "}
        <input
          type="text"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
        />
        <br />
        Notes:{" "}
        <input
          type="text"
          value={notesInput}
          onChange={(e) => setNotesInput(e.target.value)}
        />
        <br />
        City:{" "}
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <br />
        Country:{" "}
        <input
          type="text"
          value={countryInput}
          onChange={(e) => setCountryInput(e.target.value)}
        />
        <br />
        Categories:{" "}
        <Select
          isMulti
          styles={selectFieldStyles}
          options={categoryOptions}
          value={selectedCategories}
          onChange={(categories) => {
            setSelectedCategories(categories);
          }}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <br />
      <br />
    </div>
  );
};

export default CreateSightingPage;
