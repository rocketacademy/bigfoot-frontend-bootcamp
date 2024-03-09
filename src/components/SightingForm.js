import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SightingForm({ displaySightings }) {
  const [sighting, setSighting] = useState({
    location: "",
    notes: "",
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/sightings/1/categories"
        );
        setCategoryOptions(
          response.data.map((category) => ({
            value: category.id,
            label: category.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (event) => {
    switch (event.target.name) {
      case "date":
        setDate(event.target.value);
        break;
      case "location":
        setLocation(event.target.value);
        break;
      case "notes":
        setNotes(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedCategoryIds = selectedCategories[0].value;

    axios
      .post(`http://localhost:3000/sightings/`, {
        date,
        location,
        selectedCategoryIds,
        notes,
      })
      .then((res) => {
        // Clear form state
        setDate("");
        setLocation("");
        setSelectedCategories([]);
        setNotes("");

        // Navigate to sighting-specific page after submitting form
        navigate(`/sightings/${res.data.id}`);
      });
  };

  const selectFieldStyles = {
    option: (provided) => ({
      ...provided,
      color: "black",
    }),
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Date: </Form.Label>
        <Form.Control
          // datetime-local input type allows user to input both date and time
          type="datetime-local"
          name="date"
          value={date}
          onChange={handleChange}
        />
        <Form.Label>Location: </Form.Label>
        <Form.Control
          type="text"
          name="location"
          size="lg"
          value={location}
          onChange={handleChange}
          placeholder="Yishun, Singapore"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Categories </Form.Label>
        <Select
          isMulti
          styles={selectFieldStyles}
          options={categoryOptions}
          value={selectedCategories}
          onChange={handleSelectChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Text className="text-muted">
          Please describe this sighting.
        </Form.Text>
        <Form.Control
          as="textarea"
          name="notes"
          value={notes}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
