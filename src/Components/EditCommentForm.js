import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants";

function EditCommentForm({ comment, onUpdateComment, onDeleteComment }) {
  const [editedComment, setEditedComment] = useState(comment.content);

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (editedComment) {
      try {
        await axios.put(
          `${BACKEND_URL}/sightings/${comment.sightingId}/comments/${comment.id}`,
          { content: editedComment }
        );
        onUpdateComment(comment.id, editedComment);
      } catch (error) {
        console.log("Error updating comment:", error);
      }
    } else {
      alert("Please write a comment before submitting");
    }
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(
        `${BACKEND_URL}/sightings/${comment.sightingId}/comments/${comment.id}`
      );
      onDeleteComment(comment.id);
    } catch (error) {
      console.log("Error deleting comment:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleEditSubmit}>
        <textarea
          rows="5"
          cols="50"
          value={editedComment}
          onChange={(e) => setEditedComment(e.target.value)}
        />
        <button type="submit">Save</button>
        <button type="button" onClick={handleDeleteClick}>
          Delete
        </button>
      </form>
    </div>
  );
}

export default EditCommentForm;
