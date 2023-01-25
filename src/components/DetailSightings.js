import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Backend_URL } from "../Backend_URL";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  List,
  ListItem,
} from "@mui/material";

const DetailSightings = () => {
  const [sighting, setSighting] = useState([]);
  const [sightingId, setSightingId] = useState();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    comment: "",
  });
  const navigate = useNavigate();
  const handleUserInput = (e) => {
    setNewComment(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${Backend_URL}/sightings/${sightingId}/comments`, {
        content: newComment,
      })
      .then((res) => {
        setNewComment("");
        return axios.get(`${Backend_URL}/sightings/${sightingId}/comments`);
      })
      .then((response) => {
        setComments(response.data);
      });
  };

  useEffect(() => {
    axios.get(`${Backend_URL}/sightings/${sightingId}`).then((response) => {
      console.log(response.data);
      setSighting(response.data);
    });
  }, [sightingId]);

  useEffect(() => {
    axios
      .get(`${Backend_URL}/sightings/${sightingId}/comments`)
      .then((response) => {
        setComments(response.data);
      });
  }, [sightingId]);

  const commentList = comments.map((comment) => {
    return comment.content;
  });

  const params = useParams();
  if (sightingId !== params.sightingId) {
    setSightingId(params.sightingId);
  }

  const sightingDetails = Object.entries(sighting).map((sightings) => (
    <div>
      <Typography>Date: {sighting.date}</Typography>
      <Typography>Location: {sighting.location}</Typography>
      <Typography>Notes: {sighting.notes}</Typography>
    </div>
  ));

  const commentForm = (
    <div>
      <p>
        <label htmlFor="sighting-comment">Add New Comment: </label>
        <input
          type="text"
          id="comment"
          name="comment"
          required
          minLength="5"
          maxLength="50"
          value={newComment.content}
          placeholder="Write your comment here"
          onChange={handleUserInput}
        />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </p>
    </div>
  );

  return (
    <Card>
      <CardContent>{sightingDetails}</CardContent>
      <CardContent>{commentForm}</CardContent>
      <List>
        <ListItem>{commentList}</ListItem>
      </List>

      <CardActions>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </CardActions>
    </Card>
  );
};

export default DetailSightings;
