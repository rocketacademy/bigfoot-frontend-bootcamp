import React, { useState } from "react";
import axios from "axios";

import { BACKEND_URL } from "../constants";

const EditComment = (props) => {
  const [commentInput, setCommentInput] = useState(props.preloadComment);

  const handleEditCommentSubmit = async (e) => {
    e.preventDefault();

    await axios.put(`${BACKEND_URL}/sightings/comments`, {
      content: commentInput,
      commentId: props.commentID,
    });

    setCommentInput("");
    props.setEditCommentId(0);
    props.getComments();
  };

  return (
    <form onSubmit={handleEditCommentSubmit}>
      <input
        value={commentInput}
        onChange={(e) => setCommentInput(e.target.value)}
      />
      <input type="submit" />
    </form>
  );
};

export default EditComment;
