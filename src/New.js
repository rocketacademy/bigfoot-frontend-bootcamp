import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "./Constant";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from "react-select";

const New = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ date: "", location: "", news: "" });
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

  const handleSelectChange = (selectedOption) => {
    setSelectedCategories(selectedOption);
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Extract the selected category IDs from the selectedCategories array
      const selectedCategoryIds = selectedCategories.map(
        (category) => category.value
      );

      // Update the form object to include the selected category IDs
      const updatedForm = { ...form, selectedCategoryIds };

      const response = await axios.post(
        `${BACKEND_URL}/sightings/new`,
        updatedForm
      );

      navigate(`/sightings/${response.data.id}`, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="datetime-local"
            name="date"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" name="location" onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="notes"
            onChange={handleChange}
          />
        </Form.Group>
        <Select
          isMulti
          options={categoryOptions}
          value={selectedCategories}
          onChange={handleSelectChange}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default New;
