import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constants";

const EditSightingForm = () => {
  const { sightingId } = useParams();
  const navigate = useNavigate();

  const [sighting, setSighting] = useState({
    date: "",
    location: "",
    notes: "",
  });

  useEffect(() => {
    // Fetch the existing sighting data from the backend and populate the form fields
    axios
      .get(`${BACKEND_URL}/sightings/${sightingId}`)
      .then((res) => {
        setSighting({
          date: new Date(res.data.date).toISOString().slice(0, 16),
          location: res.data.location,
          notes: res.data.notes,
        });
      })
      .catch((err) => {
        console.error("Error fetching sighting data:", err);
      });
  }, [sightingId]);

  const handleChange = (event) => {
    setSighting({
      ...sighting,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    // Prevent default form redirect on submission
    event.preventDefault();

    // Send request to update sighting in the backend
    axios
      .put(`${BACKEND_URL}/sightings/${sightingId}`, {
        date: sighting.date,
        location: sighting.location,
        notes: sighting.notes,
      })
      .then(() => {
        // Navigate to the sighting-specific page after updating the form
        navigate(`/sightings/${sightingId}`);
      })
      .catch((err) => {
        console.error("Error updating sighting data:", err);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Date and Time</Form.Label>
        <Form.Control
          // datetime-local input type allows the user to input both date and time
          type="datetime-local"
          name="date"
          value={sighting.date}
          onChange={handleChange}
        />
        <Form.Text className="text-muted">
          When did this sighting happen?
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          name="location"
          value={sighting.location}
          onChange={handleChange}
          placeholder="Yishun, Singapore"
        />
        <Form.Text className="text-muted">
          Where did this sighting happen?
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>Notes</Form.Label>
        <Form.Control
          // Use textarea to give the user more space to type
          as="textarea"
          name="notes"
          value={sighting.notes}
          onChange={handleChange}
          placeholder="Big bear, bigger than human, walking around the park at night. Very scary."
        />
        <Form.Text className="text-muted">
          Please describe this sighting.
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit">
        Save Changes
      </Button>
    </Form>
  );
};

export default EditSightingForm;
