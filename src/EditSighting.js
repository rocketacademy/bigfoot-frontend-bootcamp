import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "./Constant";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const EditSighting = () => {
  const navigate = useNavigate();
  const [sighting, setSighting] = useState([]);
  const [sightingIndex, setSightingIndex] = useState();
  const [form, setForm] = useState({
    date: sighting.date,
    location: sighting.location,
    news: sighting.notes,
  });

  useEffect(() => {
    if (sightingIndex) {
      const getSpecifiedSight = async () => {
        try {
          const response = await axios.get(
            `${BACKEND_URL}/sightings/${sightingIndex}`
          );
          const res = response.data;
          setSighting({
            id: res.id,
            date: res.date.toString().substring(0, 16),
            location: res.location,
            notes: res.notes,
          });
        } catch (error) {
          console.log(error);
        }
      };
      getSpecifiedSight();
    }
  }, [sightingIndex]);

  // Update sighting index in state if needed to trigger data retrieval
  const params = useParams();
  if (sightingIndex !== params.sightingIndex) {
    setSightingIndex(params.sightingIndex);
  }

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(form);
      await axios.put(`${BACKEND_URL}/sightings/${sightingIndex}`, form);
    } catch (error) {
      console.log(error);
    } finally {
      navigate(`/sightings/${sighting.id}`, { replace: true });
    }
  };

  return (
    <div>
      <Link to="/">Home</Link>{" "}
      <Link to={`/sightings/${sighting.id}`}>Back</Link>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="datetime-local"
            name="date"
            onChange={handleChange}
            defaultValue={sighting.date}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            onChange={handleChange}
            defaultValue={sighting.location}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="notes"
            onChange={handleChange}
            defaultValue={sighting.notes}
          />
        </Form.Group>
        <Button type="submit">Update</Button>
      </Form>
    </div>
  );
};

export default EditSighting;
