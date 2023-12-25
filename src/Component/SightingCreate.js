import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../constant";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";

export default function SightingCreate() {
  const [date, setDate] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [locationDescription, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const navi = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryId = category.map((option) => option.value);

    const newData = {
      category: categoryId,
      date: date,
      locationDescription: locationDescription,
      notes: notes,
      city: city,
      country: country,
    };
    console.log(newData);
    const res = await axios.post(`${BACKEND_URL}/sightings`, newData);
    navi(`/sightingSearch/${res.data.id}`);
  };

  useEffect(() => {
    const getCategories = async () => {
      const categoriesData = await axios.get(`${BACKEND_URL}/categories`);
      const allCategoryData = categoriesData.data.map((categoryData) => {
        return { label: categoryData.name, value: categoryData.id };
      });
      setAllCategory(allCategoryData);
    };
    getCategories();
  }, []);

  return (
    <div className="App-header">
      Create Sigthing Data
      <Link to="/" className="home-button">
        <button>Go Home</button>
      </Link>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Date and Time</label>
        <input
          value={date}
          type="datetime-local"
          onChange={(e) => setDate(e.target.value)}
        />{" "}
        <label>Category</label>
        <Select
          isMulti
          options={allCategory}
          value={category}
          className="selection"
          onChange={(option) => setCategory(option)}
        />
        <label>City</label>
        <textarea
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
          className="note-input"
        />
        <label>Country</label>
        <textarea
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
          }}
          className="note-input"
        />
        <label>Location</label>
        <textarea
          value={locationDescription}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
          className="note-input"
        />
        <label>Note</label>
        <textarea
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
          }}
          className="note-input"
        />
        <input type="submit" />
      </form>
    </div>
  );
}
