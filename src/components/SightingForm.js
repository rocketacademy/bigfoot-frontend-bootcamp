import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

export default function SightingForm() {
  const [sightingInputs, setSightingsInput] = useState({
    date: "",
    location: "",
    notes: "",
  });

  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BACKEND_URL}/categories`).then((response) => {
      setAllCategories(response.data);
    });
  }, []);

  const categoryOptions = allCategories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const handleSightingInput = (event) => {
    setSightingsInput({
      ...sightingInputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectChange = (event) => {
    setSelectedCategories(event);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedCategoryIds = selectedCategories.map(
      (category) => category.value
    );

    axios
      .post(`${BACKEND_URL}/sightings`, {
        ...sightingInputs,
        selectedCategoryIds: selectedCategoryIds,
      })
      .then((response) => {
        console.log(response);
        navigate(`/sighting/${response.data.id}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="Sighting-Form">
      <h3>Report Your Sighting</h3>
      <form onSubmit={handleSubmit}>
        <p>
          <label>Date: </label>
          <input
            type="datetime-local"
            name="date"
            value={sightingInputs.date}
            onChange={handleSightingInput}
          />
        </p>
        <p>
          <label>Location: </label>
          <input
            type="text"
            name="location"
            value={sightingInputs.location}
            onChange={handleSightingInput}
          />
        </p>
        <p>
          <label>Notes: </label>
          <textarea
            type="text"
            name="notes"
            value={sightingInputs.notes}
            onChange={handleSightingInput}
          />
        </p>
        <Select
          isMulti
          options={categoryOptions}
          onChange={handleSelectChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
