import React, { useState, useEffect } from "react";
import Creatable from "react-select/creatable";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddSighting() {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/categories`
      );
      // console.log("response", response.data);
      setAllCategories(response.data);
    } catch (error) {
      console.error("Error retrieving categories", error);
    }
  };
  // react-select library uses 'value' and 'label' to represent the selected option and its display label, respectively.
  const categoryOptions = allCategories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleSelectChange = (categories) => {
    setSelectedCategories(categories);
  };

  const handleAddCategory = async (input) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/categories`,
        {
          name: input,
        }
      );
      console.log(response.data);
      const newCategory = {
        value: response.data.id,
        label: response.data.name,
      };
      setAllCategories([...allCategories, newCategory]);
      setSelectedCategories([...selectedCategories, newCategory]);
    } catch (error) {
      console.error("Error adding new category", error);
    }
  };

  const addSighting = async (e) => {
    e.preventDefault();

    // Extract category ids to send to backend
    const categoryIds = selectedCategories.map((category) => category.value);
    // console.log("selected category ids!!", categoryIds);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sightings`,
        {
          date,
          location,
          notes,
          categoryIds,
        }
      );
      alert("Added successfully!");
      // console.log(response.data);
      setDate("");
      setLocation("");
      setNotes("");
      setSelectedCategories([]);
      navigate(`/sightings/${response.data.id}`);
    } catch (error) {
      console.error("Error adding sighting", error);
    }
  };

  return (
    <div>
      <div
        style={{
          background: "#fcd5ce",
          width: "50vw",
          margin: "3rem auto 0 auto",
          borderRadius: "15px",
          padding: "2rem",
        }}
      >
        <h3>REPORT NEW SIGHTING</h3>
        <div>
          <label>
            <strong>Date </strong>
          </label>
          <input
            type="text"
            value={date}
            placeholder="YYYY-MM-DD"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>
            <strong>Location </strong>
          </label>
          <input
            type="text"
            value={location}
            placeholder="e.g. Germany"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label>
            <strong>Notes </strong>
          </label>
          <textarea
            type="text"
            value={notes}
            placeholder="e.g. I was chased by a bigfoot..."
            onChange={(e) => setNotes(e.target.value)}
            style={{ resize: "none", height: "4rem", fontFamily: "arial" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "0.3rem",
            marginBottom: "0.8rem",
          }}
        >
          <div>
            <label>
              <strong>Select a Category: </strong>
            </label>
          </div>
          <div style={{ width: "70%" }}>
            <Creatable
              isMulti
              options={categoryOptions}
              value={selectedCategories}
              onChange={handleSelectChange}
              onCreateOption={(input) => handleAddCategory(input)}
            />
          </div>
        </div>
        <button className="buttons" onClick={addSighting}>
          Submit
        </button>
      </div>
    </div>
  );
}
