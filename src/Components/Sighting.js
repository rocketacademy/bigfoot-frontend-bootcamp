import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constants";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Sighting() {
  const { sightingId } = useParams();
  const navigate = useNavigate();
  const [sighting, setSighting] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${BACKEND_URL}/sightings/${sightingId}`
      );
      console.log(data);
      setSighting(data);
    };

    fetchData();
  }, [sightingId]);

  // Only for fetching the initial comments data on load
  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await axios.get(
        `${BACKEND_URL}/sightings/${sightingId}/comments`
      );
      console.log(data);

      setComments(data);
    };

    fetchComments();
  }, [sightingId]);

  const backToHomePage = () => {
    navigate("/");
  };

  let sightingRendered = [];
  for (const key in sighting) {
    sightingRendered.push(
      <div key={key}>
        {key === "categories"
          ? `${key}: ${sighting[key].map((category) => category.name)}`
          : `${key}: ${sighting[key]}`}
        <br />
        <br />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      `${BACKEND_URL}/sightings/${sightingId}/comments`,
      { content: commentInput }
    );

    console.log(data);
    // Update comments state with a new array of existing comments & the new comment object - this step triggers the state update & re-render within the component itself & makes the new comment render immediately upon submission
    setComments([...comments, data]);
    setCommentInput("");
  };

  return (
    <div>
      <Button onClick={backToHomePage}>Home</Button>
      <br />
      <br />
      {sighting && sightingRendered}
      <hr />

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Add a comment</Form.Label>
          <br />
          <Form.Control
            type="text"
            value={commentInput}
            placeholder="Enter comment"
            onChange={({ target }) => setCommentInput(target.value)}
          />
          <br />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <hr />

      <ListGroup>
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <ListGroup.Item key={comment.id}>{comment.content}</ListGroup.Item>
          ))
        ) : (
          <p>Be the first to comment</p>
        )}
      </ListGroup>
    </div>
  );
}
