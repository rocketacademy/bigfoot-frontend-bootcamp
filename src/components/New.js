import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { BACKEND_URL } from "../constants";
import { Button, TextField } from "@mui/material";
import React from "react";
import Select from "react-select";

import "../App.css";

export default function NewPage() {
  const [date, setDate] = useState(null);
  const [location, setLocation] = useState(null);
  const [notes, setNotes] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BACKEND_URL}/categories`).then((response) => {
      setAllCategories(response.data);
    });
    // Only run this effect on component mount
  }, []);

  const categoryOptions = allCategories.map((category) => ({
    // value is what we store
    value: category.id,
    // label is what we display
    label: category.name,
  }));

  const handleAdd = async () => {
    try {
      const selectedCategoriesIds = selectedCategories.map(
        ({ value }) => value
      );
      const sightingData = await axios
        .post(`${BACKEND_URL}/sightings/`, {
          date: date,
          location: location,
          notes: notes,
          selectedCategoryIds: selectedCategoriesIds,
        })
        .then((res) => {
          setDate("");
          setLocation("");
          setNotes("");
          setSelectedCategories("");
          console.log(res);
          navigate(`/sightings/${res.data.id}`);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectChange = (categories) => {
    setSelectedCategories(categories);
    console.log(selectedCategories);
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
          <Select
            isMulti
            options={categoryOptions}
            value={selectedCategories}
            onChange={handleSelectChange}
          />
          <Button onClick={handleAdd}>Submit</Button>
        </div>
      </header>
    </div>
  );
}
