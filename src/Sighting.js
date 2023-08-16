import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

import { BACKEND_URL } from "./Constant";

const Sighting = () => {
  const [sighting, setSighting] = useState([]);
  const [sightingIndex, setSightingIndex] = useState();
  const [comments, setComments] = useState();
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (sightingIndex) {
      const getSpecifiedSight = async () => {
        try {
          const response = await axios.get(
            `${BACKEND_URL}/sightings/${sightingIndex}`
          );
          setSighting(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getSpecifiedSight();

      const getAllcomments = async () => {
        try {
          const response = await axios.get(
            `${BACKEND_URL}/sightings/${sightingIndex}/comments`
          );
          setComments(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getAllcomments();
    }
  }, [sightingIndex]);

  // Update sighting index in state if needed to trigger data retrieval
  const params = useParams();
  if (sightingIndex !== params.sightingIndex) {
    setSightingIndex(params.sightingIndex);
  }

  // Store a new JSX element for each property in sighting details
  const sightingDetails = [];
  if (sighting) {
    for (const key in sighting) {
      // Special logic for rendering categories
      if (key === "Categories") {
        // Only show categories label if there are any
        if (sighting[key].length > 0) {
          const categoryArray = sighting[key].map((category) => category.name); // Map all the category.name into an array
          let output = categoryArray.join(", "); // Change the array into a string for pushing to jsx element
          sightingDetails.push(
            <Card.Text key={key}>{`${key}: ${output}`}</Card.Text>
          );
        }
      }
      // For rendering the other values that are not categories
      if (key !== "Categories") {
        sightingDetails.push(
          <Card.Text key={key}>{`${key}: ${sighting[key]}`}</Card.Text>
        );
      }
    }
  }

  // Store a new JSX element for each comment
  const commentElements = comments
    ? comments.map((comment) => (
        <ListGroup.Item key={comment.id}>
          {comment.createdAt} | {comment.content}
        </ListGroup.Item>
      ))
    : [];

  const handleChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    // Prevent default form redirect on submission
    event.preventDefault();

    // Send request to create new comment in backend
    try {
      await axios.post(`${BACKEND_URL}/sightings/${sightingIndex}/comments`, {
        content: newComment,
      });
      // Clear form state
      setNewComment("");

      // Refresh local comment list
      const response = await axios.get(
        `${BACKEND_URL}/sightings/${sightingIndex}/comments`
      );
      setComments(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Link to="/">Home</Link> <Link to="/new">Add Sighting</Link>{" "}
      <Link to={`/sightings/${sightingIndex}/edit`}>Edit Sighting</Link>
      <Card bg="dark">
        <Card.Body>{sightingDetails}</Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Leave a comment</Form.Label>
          <Form.Control
            // Use textarea to give user more space to type
            as="textarea"
            name="content"
            value={newComment}
            onChange={handleChange}
            placeholder="What a big bear!"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <br />
      <ListGroup>{commentElements}</ListGroup>
      <br />
    </div>
  );
};

export default Sighting;
