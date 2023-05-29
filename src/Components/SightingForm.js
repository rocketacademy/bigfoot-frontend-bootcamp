import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import CreatableSelect from "react-select/creatable";

function SightingForm() {
  const [date, setDate] = useState("");
  const [locationDescription, setLocationDescription] = useState("");
  const [country, setCountry] = useState("");
  const [cityTown, setCityTown] = useState("");
  const [notes, setNotes] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [intensities, setIntensities] = useState({});

  const navigate = useNavigate();

  const getAllCategories = async () => {
    try {
      await axios.get(`${BACKEND_URL}/categories`).then((res) => {
        console.log(res.data);
        setCategories(res.data);
      });
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  console.log(categoryOptions);

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleNewSighting = async (e) => {
    e.preventDefault();

    const categoryIds = selectedCategories.map((category) => category.value);
    const categories = selectedCategories.map((category) => ({
      categoryId: category.value,
      intensity: intensities[category.value],
    }));

    // Post request to create new sighting
    try {
      await axios
        .post(`${BACKEND_URL}/sightings`, {
          date,
          locationDescription,
          country,
          cityTown,
          notes,
          categories,
        })
        .then((res) => {
          // Reset form
          setDate("");
          setLocationDescription("");
          setCountry("");
          setCityTown("");
          setNotes("");
          setSelectedCategories([]);
          setIntensities([]);

          // Navigate to new sighting page
          navigate(`/sightings/${res.data.id}`);
        });
    } catch (error) {
      console.log("Error creating new sighting: ", error);
    }
  };

  const handleSelected = (selected) => {
    setSelectedCategories(selected);
    const newIntensities = { ...intensities };
    selected.forEach((category) => {
      if (!newIntensities[category.value]) {
        newIntensities[category.value] = 1;
      }
    });
    setIntensities(newIntensities);
    console.log(selectedCategories);
    console.log(intensities);
  };

  const handleCreateOption = async (inputValue) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/categories`, {
        name: inputValue,
      });

      // Add new category to categoryOptions array
      const newCategory = {
        value: res.data.id,
        label: res.data.name,
      };
      setCategories([...categories, newCategory]);

      // Add new category to selected categories
      setSelectedCategories([...selectedCategories, newCategory]);
    } catch (error) {
      console.log("Error creating new category:", error);
    }
  };

  const handleIntensityChange = (value, categoryId) => {
    setIntensities((prevIntensities) => ({
      ...prevIntensities,
      [categoryId]: value,
    }));
  };

  return (
    <div>
      <Navbar />
      <div className="new-sighting-header">
        <h2>Report New Sighting</h2>
        <p>Have you seen Bigfoot? Tell us about your encounter.</p>
      </div>

      <form onSubmit={handleNewSighting} className="sighting-form">
        <label htmlFor="date">Date</label>
        <input
          type="datetime-local"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="sighting-input"
        />
        <CreatableSelect
          isMulti
          options={categoryOptions}
          value={selectedCategories}
          onChange={handleSelected}
          onCreateOption={(inputValue) => handleCreateOption(inputValue)}
        />
        {selectedCategories.map((category) => (
          <div key={category.value}>
            <label htmlFor={`intensity-${category.value}`}>
              Intensity of {category.label}
            </label>
            <input
              type="number"
              id={`intensity-${category.value}`}
              value={intensities[category.value] || ""}
              onChange={(e) =>
                handleIntensityChange(e.target.value, category.value)
              }
              min="1"
              max="5"
            />
          </div>
        ))}
        <label htmlFor="locationDescription">Location Description</label>
        <input
          type="text"
          id="locationDescription"
          name="locationDescription"
          value={locationDescription}
          onChange={(e) => setLocationDescription(e.target.value)}
          required
          placeholder="Describe your location"
          className="sighting-input"
        />
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          placeholder="Enter a country"
          className="sighting-input"
        />
        <label htmlFor="cityOrTown">City/Town</label>
        <input
          type="text"
          id="cityOrTown"
          name="cityOrTown"
          value={cityTown}
          onChange={(e) => setCityTown(e.target.value)}
          required
          placeholder="Enter a city or town"
          className="sighting-input"
        />
        <label htmlFor="notes">Notes</label>
        <textarea
          rows="5"
          cols="50"
          id="notes"
          name="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          required
          placeholder="Describe your encounter in detail."
          className="sighting-input"
        />
        <button type="submit" className="new-sighting-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SightingForm;
