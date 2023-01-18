import React, { useState, useEffect, startTransition } from "react";
import axios from "axios";
import { serverURL, baseServerURL } from "../ServerURL";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "antd";
import Select from "react-select";

const NewSighting = () => {
  const [newSighting, setNewSighting] = useState({
    date: "",
    location: "",
    notes: "",
  });

  const [categories, setCategories] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseServerURL}/categories`)
      .then((response) => setCategories(response.data));
  }, []);

  // console.log(categories);

  const categoryOptions = categories.map((category) => ({
    value: `${category.id}`,
    label: `${category.name}`,
  }));

  // console.log(categoryOptions);

  const handleSelectChange = (categories) => {
    setSelectedCategories(categories);
  };

  // console.log(selectedCategories);

  const handleUserInput = (e) => {
    setNewSighting({
      ...newSighting,
      [e.target.name]: e.target.value,
    });
  };

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedCategoryIds = selectedCategories.map(
      (category) => category.value,
    );

    axios
      .post(`${serverURL}`, {
        date: newSighting.date,
        location: newSighting.location,
        notes: newSighting.notes,
        selectedCategoryIds: selectedCategoryIds,
      })
      .then((response) => {
        setNewSighting({});
        setSelectedCategories([]);
        navigate(`/sightings/${response.data.id}`);
      });
  };

  return (
    <div>
      <Card
        title={`New Sighting`}
        extra={<Link to="/">Back</Link>}
        style={{
          width: 300,
          textAlign: "left",
          margin: 50,
        }}
      >
        <p>
          <label for="sighting-date">Date: </label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={newSighting.date}
            placeholder={new Date()}
            onChange={handleUserInput}
          />
        </p>
        <p>
          <label for="sighting-location">Location: </label>
          <input
            type="text"
            id="location"
            name="location"
            required
            minLength="5"
            maxLength="50"
            value={newSighting.location}
            placeholder="Where?"
            onChange={handleUserInput}
          />
        </p>
        <p>
          <label for="sighting-notes">Notes: </label>
          <textarea
            id="notes"
            name="notes"
            required
            rows="10"
            cols="28"
            placeholder="Write your notes of the sighting here ..."
            value={newSighting.notes}
            onChange={handleUserInput}
          />
        </p>
        <Select
          isMulti
          options={categoryOptions}
          value={selectedCategories}
          onChange={handleSelectChange}
        />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </Card>
    </div>
  );
};

export default NewSighting;
