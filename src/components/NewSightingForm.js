import React, { useEffect, useState } from "react";
import axios from "axios";
import { Backend_URL } from "../Backend_URL";
import { Card, CardContent, CardActions, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const NewSightingForm = () => {
  const [date, setDate] = useState();
  const [location, setLocation] = useState();
  const [notes, setNotes] = useState();
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  const handleUserInput = (e) => {
    switch (e.target.name) {
      case "date":
        setDate(e.target.value);
        break;
      case "location":
        setLocation(e.target.value);
        break;
      case "notes":
        setNotes(e.target.value);
        break;
      default:
    }
  };

  const handleSelectChange = (categories) => {
    setSelectedCategories(categories);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${Backend_URL}/sightings`, {
        date,
        location,
        notes,
      })
      .then((response) => {
        setDate("");
        setLocation("");
        setNotes("");
        // navigate to sighting-specific page after submitting form
        navigate(`/sightings/${response.data.id}`);
      });
  };

  useEffect(() => {
    axios.get(`${Backend_URL}/categories`).then((response) => {
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

  return (
    <Card>
      <CardContent>
        <p>
          <label htmlFor="sightingDate">Date and time: </label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={date}
            placeholder={new Date()}
            onChange={handleUserInput}
          />
        </p>
        <p>
          <label htmlFor="sightingLocation">Location: </label>
          <input
            type="text"
            id="location"
            name="location"
            required
            value={location}
            placeholder="Location"
            onChange={handleUserInput}
          />
        </p>
        <p>
          <label htmlFor="SightingNotes">Notes: </label>
          <textarea
            id="notes"
            name="notes"
            required
            placeholder="Information on Sighting"
            value={notes}
            onChange={handleUserInput}
          />
        </p>
        <Select
          isMulti
          options={categoryOptions}
          value={selectedCategories}
          onChange={handleSelectChange}
        />
      </CardContent>
      <CardActions>
        <Button onClick={handleSubmit}>Submit</Button>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </CardActions>
    </Card>
  );
};

export default NewSightingForm;
