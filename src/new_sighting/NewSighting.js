import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import "../App.css";
import { BACKEND_URL } from "../Constants";

export default function NewSighting() {
  const [sighting, setSighting] = useState({
    date: "",
    location: "",
    notes: "No details provided.",
  });
  const [selectedCategories, setSelectedCategories] = useState([]); // For selected categories
  const [allCategories, setAllCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  function sendPostRequest() {
    const url = `${BACKEND_URL}/sightings`;
    if (!sighting.location) {
      alert("Location cannot be empty");
    } else if (!sighting.date) {
      alert("Date cannot be empty");
    } else {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sighting),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("Response Data:", data);
          setSighting({
            date: "",
            location: "",
            notes: "No details provided.",
          });
          setSuccessMessage("Successfully submitted the sighting!");
          // After successful submission, navigate to the SightingDetails page with the newly created sighting ID
          navigate(`/${data.id}`);
        })

        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendPostRequest();
  }

  const curr_date = getCurrentDateTime();

  useEffect(() => {
    axios.get(`${BACKEND_URL}/categories`).then((response) => {
      setAllCategories(response.data);
      console.log(response.data);
    });
  }, []);

  const categoryOptions = allCategories.map((category) => ({
    // value is what we store
    value: category.id,
    // label is what we display
    label: category.category_name,
  }));

  function handleSelectChange(selectedOptions) {
    setSelectedCategories(selectedOptions);
  }

  const selectFieldStyles = {
    option: (provided) => ({
      ...provided,
      color: "black",
    }),
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="sighting-time">
          <h3>Please input sighting date:</h3>
        </label>
        <input
          type="datetime-local"
          id="sighting-time"
          name="sighting-time"
          value={sighting.date}
          min="1900-01-01T00:00"
          max={curr_date}
          onChange={(e) => setSighting({ ...sighting, date: e.target.value })}
        />
        <h3>Please input sighting location:</h3>
        <input
          type="text"
          value={sighting.location}
          onChange={(e) =>
            setSighting({ ...sighting, location: e.target.value })
          }
          placeholder="Location Here"
        />

        <br />
        <h3>Please insert notes of sighting details:</h3>
        <input
          type="text"
          value={sighting.notes}
          onChange={(e) => setSighting({ ...sighting, notes: e.target.value })}
          placeholder="Notes Here"
        />
        <br />
        <h3>Please select all applicable categories:</h3>
        <Select
          isMulti
          styles={selectFieldStyles}
          options={categoryOptions}
          value={selectedCategories}
          onChange={handleSelectChange}
        />
        <button type="submit">Submit</button>
      </form>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <br />
      <Link to="/" style={{ textDecoration: "none" }}>
        <button>Home</button>
      </Link>
    </div>
  );
}
