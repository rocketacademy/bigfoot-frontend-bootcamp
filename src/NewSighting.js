import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "./constants";
import axios from "axios";
import Select from "react-select";
import "./App.css";

const NewSighting = () => {
  const navigate = useNavigate();
  const [singleSighting, setSingleSighting] = useState(null);
  const [date, setDate] = useState("2023-05-20T12:15");
  const [location, setLocation] = useState("Default Location");
  const [notes, setNotes] = useState("Default Note");
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
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

  const handleSelectChange = (event) => {
    console.log(event);
    setSelectedCategories(event);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
    console.log(e.target.value);
  };
  const handleLocation = (e) => {
    setLocation(e.target.value);
  };
  const handleNotes = (e) => {
    setNotes(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BACKEND_URL}/sightings`, {
        date: date,
        location: location,
        notes: notes,
      })
      .then((res) => {
        console.log("sightingId: ", res.data.id);
        console.log("categories: ", selectedCategories);
        axios.post(`${BACKEND_URL}/categories/create`, {
          sightingId: res.data.id,
          categories: selectedCategories,
        });
        if (res.status === 200) {
          navigate(`../sightings/${res.data.id}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="App">
      <div className="App-header">
        <form onSubmit={handleSubmit}>
          <h1>New Sighting</h1>
          <div>
            <label>Date: </label>
            <input type="datetime-local" value={date} onChange={handleDate} />
          </div>
          <div>
            <label>Location: </label>
            <input type="text" value={location} onChange={handleLocation} />
          </div>
          <div>
            <label>Notes: </label>
            <input type="text" value={notes} onChange={handleNotes} />
          </div>
          <Select
            isMulti
            options={categoryOptions}
            value={selectedCategories}
            onChange={handleSelectChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default NewSighting;
