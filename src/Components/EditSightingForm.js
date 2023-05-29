import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../constants";
import axios from "axios";

function EditSightingForm({ sighting, onUpdateSighting }) {
  const [updatedSighting, setUpdatedSighting] = useState(sighting);
  const [categories, setCategories] = useState(sighting.categories || []);
  const [intensities, setIntensities] = useState(
    sighting.categories
      ? sighting.categories.map(
          (category) => category.sighting_categories.intensity
        )
      : []
  );

  const { id } = useParams();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/sightings/${id}`);
        setCategories(response.data.categories);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedSighting({ ...sighting, [name]: value });
  };

  const handleCategoryChange = (e, index) => {
    const updatedCategories = [...categories];
    updatedCategories[index].name = e.target.value;
    setCategories(updatedCategories);
  };

  const handleIntensityChange = (e, index) => {
    const updatedIntensities = [...intensities];
    updatedIntensities[index] = e.target.value;
    setIntensities(updatedIntensities);
  };

  const handleAddField = () => {
    const updatedCategories = [...categories, { name: "" }];
    const updatedIntensities = [...intensities, ""];
    setCategories(updatedCategories);
    setIntensities(updatedIntensities);
  };

  const handleRemoveField = (index) => {
    const updatedCategories = [...categories];
    const updatedIntensities = [...intensities];

    updatedCategories.splice(index, 1);
    updatedIntensities.splice(index, 1);

    setCategories(updatedCategories);
    setIntensities(updatedIntensities);
  };

  const renderCategoryAndIntensityFields = () => {
    return categories.map((category, index) => (
      <div key={category.id} className="sighting-form">
        <label htmlFor={`category-${index}`}>Category {index + 1}</label>
        <input
          type="text"
          id={`category-${index}`}
          name={`category-${index}`}
          value={category.name}
          onChange={(e) => handleCategoryChange(e, index)}
          className="sighting-input"
        />
        <label htmlFor={`intensity-${index}`}>Intensity {index + 1}</label>
        <input
          type="text"
          id={`intensity-${index}`}
          name={`intensity-${index}`}
          value={intensities[index]}
          onChange={(e) => handleIntensityChange(e, index)}
          className="sighting-input"
        />
        <button
          onClick={() => handleRemoveField(index)}
          className="new-sighting-btn remove-btn"
        >
          Remove
        </button>
      </div>
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedSighting = {
      ...sighting,
      categories: categories.map((category, index) => ({
        id: category.id,
        name: category.name,
        sighting_categories: { intensity: intensities[index] },
      })),
    };

    if (
      updatedSighting.date ||
      updatedSighting.locationDescription ||
      updatedSighting.country ||
      updatedSighting.cityTown ||
      updatedSighting.notes ||
      updatedSighting.categories
    ) {
      try {
        await axios.put(`${BACKEND_URL}/sightings/${id}`, updatedSighting);
        onUpdateSighting(updatedSighting);
      } catch (error) {
        console.log("Error updating sighting:", error);
      }
    } else {
      alert(
        "Please update at least one field. Otherwise, navigate back to sighting."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="sighting-form">
      <label htmlFor="date">Date</label>
      <input
        type="text"
        id="date"
        name="date"
        value={updatedSighting.date}
        onChange={handleChange}
        className="sighting-input"
      />
      <label htmlFor="locationDescription">Location Description</label>
      <input
        type="text"
        id="locationDescription"
        name="locationDescription"
        value={updatedSighting.locationDescription}
        onChange={handleChange}
        className="sighting-input"
      />
      <label htmlFor="country">Country</label>
      <input
        type="text"
        id="country"
        name="country"
        value={updatedSighting.country}
        onChange={handleChange}
        className="sighting-input"
      />
      <label htmlFor="cityTown">City/Town</label>
      <input
        type="text"
        id="cityTown"
        name="cityTown"
        value={updatedSighting.cityTown}
        onChange={handleChange}
        className="sighting-input"
      />
      <div>{renderCategoryAndIntensityFields()}</div>
      <button
        type="button"
        onClick={handleAddField}
        className="new-sighting-btn add-btn"
      >
        Add Category and Intensity
      </button>
      <label htmlFor="notes">Notes</label>
      <textarea
        rows="10"
        cols="50"
        id="notes"
        name="notes"
        value={updatedSighting.notes}
        onChange={handleChange}
        className="sighting-input"
      />
      <button type="submit" className="new-sighting-btn">
        Update
      </button>
    </form>
  );
}

export default EditSightingForm;
