import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants";

export default function CommentsList() {
  const { sightingID } = useParams();
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/sightings/${sightingID}/comments`)
      .then((response) => {
        setCommentsList(response.data);
        console.log(response.data);
      });
  }, [sightingID]);

  const handleCommentSubmit = (event) => {
    console.log(event);
  };

  return (
    <div className="Comments-List">
      <h1>Comments</h1>
      <form onSubmit={handleCommentSubmit}>
        <input placeholder="New Comment"></input>
      </form>
      <ul>
        {commentsList.map((comment, index) => (
          <li>
            {comment.content} ({comment.createdAt})
          </li>
        ))}
      </ul>
    </div>
  );
}
