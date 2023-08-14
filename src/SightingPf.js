import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, List, ListItemText, Button, Typography } from "@mui/material";
import { FormControl, FormLabel, TextField } from "@mui/material";
import { BACKEND_URL } from "./constants.js";

const SightingPf = () => {
  const [id, setSightingId] = useState();
  const [sighting, setSighting] = useState();
  const [comments, setComments] = useState();
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    // If there is a id, retrieve the sighting data
    if (id) {
      axios.get(`${BACKEND_URL}/sightings/${id}`).then((response) => {
        setSighting(response.data);
      });
      axios.get(`${BACKEND_URL}/sightings/${id}/comments`).then((response) => {
        setComments(response.data);
      });
    }
    // Only run this effect on change to id
  }, [id]);

  // Update sighting ID in state if needed to trigger data retrieval
  const params = useParams();
  if (id !== params.id) {
    setSightingId(params.id);
  }

  // Store a new JSX element for each property in sighting details
  const sightingDetails = [];
  if (sighting) {
    for (const key in sighting) {
      sightingDetails.push(<Card key={key}>{`${key}: ${sighting[key]}`}</Card>);
    }
  }

  const handleChange = (event) => {
    setCommentContent(event.target.value);
  };

  const handleSubmit = (event) => {
    // Prevent default form redirect on submission
    event.preventDefault();

    // Send request to create new comment in backend
    axios
      .post(`${BACKEND_URL}/sightings/${id}/comments`, {
        content: commentContent,
      })
      .then((res) => {
        // Clear form state
        setCommentContent("");

        // Refresh local comment list
        return axios.get(`${BACKEND_URL}/sightings/${id}/comments`);
      })
      .then((response) => {
        setComments(response.data);
      });
  };

  // Store a new JSX element for each comment
  const commentElements = comments
    ? comments.map((comment) => (
        <ListItemText key={comment.id}>
          {comment.createdAt} | {comment.content}
        </ListItemText>
      ))
    : [];

  return (
    <div>
      <Link to="/">Home</Link>
      <Card bg="dark">
        <Typography gutterBottom variant="h2">
          {sightingDetails}
        </Typography>
      </Card>

      <br />
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Leave a comment</FormLabel>
          <TextField
            name="content"
            value={commentContent}
            onChange={handleChange}
            placeholder="What a big bear!"
          />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </FormControl>
      </form>
      <br />
      <List>{commentElements}</List>
      <br />
    </div>
  );
};

export default SightingPf;
