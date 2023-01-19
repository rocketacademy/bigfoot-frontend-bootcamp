import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants";

export default function CommentList() {
  const { sightingID } = useParams();
  const [commentsList, setCommentsList] = useState([]);
  const [commentInputs, setCommentInput] = useState({
    content: "",
  });

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/sightings/${sightingID}/comments`)
      .then((response) => {
        setCommentsList(response.data);
      });
  }, [sightingID]);

  const handleInput = (event) => {
    setCommentInput({ content: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${BACKEND_URL}/sightings/${sightingID}/comments`, {
        content: commentInputs.content,
      })
      .then(() => {
        setCommentInput({ content: "" });
        axios
          .get(`${BACKEND_URL}/sightings/${sightingID}/comments`)
          .then((response) => {
            setCommentsList(response.data);
          });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="Comments-List">
      <h1>Comments</h1>
      <div className="Comment-Form">
        <form onSubmit={handleSubmit}>
          <p>
            <label>Comment: </label>
            <textarea
              type="text"
              placeholder="Insert new comment."
              value={commentInputs.content}
              onChange={handleInput}
            />
          </p>
          <button type="submit">Submit</button>
        </form>
      </div>
      <ul>
        {commentsList.map((comment, index) => (
          <li key={index}>
            {comment.content} ({comment.createdAt})
          </li>
        ))}
      </ul>
    </div>
  );
}
