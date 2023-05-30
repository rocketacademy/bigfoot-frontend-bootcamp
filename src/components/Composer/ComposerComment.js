import { useState } from "react";
import "./Composer.css";
import axios from "axios";
import { BACKEND_URL } from "../../constants";

const ComposerComment = ({ setCommentComposer, setComments, sightingId }) => {
  const [content, setContent] = useState("");
  const [commentor, setCommentor] = useState(null);

  const handleChange = (e) => {
    const id = e.target.id;
    if (id === "comment") {
      setContent(e.target.value);
    } else if (id === "commentor") {
      setCommentor(e.target.value);
    }
  };

  const handleClick = () => {
    setCommentComposer(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post(
      BACKEND_URL + "/sightings/" + sightingId + "/comments",
      {
        content: content,
        commentor: commentor,
      }
    );
    console.log(result);
    setComments((prevComments) => [...prevComments, result.data.comment]);
    setCommentComposer(false);
  };

  return (
    <div id="composer">
      <form id="composer-form">
        <div id="composer-form-header">
          <h3>Add a Comment!</h3>
          <button onClick={handleClick}>Cancel</button>
        </div>
        <input
          type="text"
          value={content}
          id="comment"
          onChange={handleChange}
          placeholder="Enter comment"
          autoComplete="off"
        />
        <input
          type="text"
          value={commentor}
          id="commentor"
          onChange={handleChange}
          placeholder="Enter your name"
          autoComplete="off"
        />
        <button onClick={handleSubmit} id="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ComposerComment;
