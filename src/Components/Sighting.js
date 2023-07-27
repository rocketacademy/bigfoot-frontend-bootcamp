import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constants";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CommentEditForm from "./CommentEditForm";

export default function Sighting({ sighting, setSighting }) {
  const { sightingId } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [likeCount, setLikeCount] = useState(0);

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

  // Only for fetching the initial comments data on load & when comment is edited
  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await axios.get(
        `${BACKEND_URL}/sightings/${sightingId}/comments`
      );
      console.log(data);

      setComments(data);
    };

    fetchComments();
  }, [sightingId, comments]);

  useEffect(() => {
    const fetchLikeCount = async () => {
      const { data } = await axios.get(
        `${BACKEND_URL}/sightings/${sightingId}/likes`
      );
      console.log(data);
      setLikeCount(data[0].likeCount);
    };

    fetchLikeCount();
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
          : key === "date" || key === "createdAt" || key === "updatedAt"
          ? `${key}: ${new Date(sighting[key]).toLocaleString()}`
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

  const handleLike = async () => {
    const { data } = await axios.post(
      `${BACKEND_URL}/sightings/${sightingId}/likes`
    );
    console.log(data);
    setLikeCount(data.likeCount)
  };

  return (
    <div>
      <Button onClick={backToHomePage}>Home</Button>
      <br />
      <Button onClick={handleLike} variant="dark">
        ❤️{likeCount}
      </Button>

      <br />
      <Link to={`/sightings/${sightingId}/edit`}>Edit Sighting</Link>
      <br />
      {sighting && sightingRendered}
      <hr />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Add a comment</Form.Label>
          <br />
          <Form.Control
            as="textarea"
            type="text"
            value={commentInput}
            placeholder="Enter comment"
            onChange={({ target }) => setCommentInput(target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <hr />
      <ListGroup>
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id}>
              <ListGroup.Item>{comment.content}</ListGroup.Item>
              <CommentEditForm
                comment={comment}
                comments={comments}
                setComments={setComments}
              />
            </div>
          ))
        ) : (
          <p>Be the first to comment</p>
        )}
      </ListGroup>
    </div>
  );
}
