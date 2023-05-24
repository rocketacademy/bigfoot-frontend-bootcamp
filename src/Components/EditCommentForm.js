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
      <form onSubmit={handleEditSubmit} className="edit-comment-form">
        <textarea
          rows="8"
          cols="100"
          value={editedComment}
          onChange={(e) => setEditedComment(e.target.value)}
        />
        <div className="button-ctn">
          <button type="submit" className="btn">
            Save
          </button>
          <button type="button" onClick={handleDeleteClick} className="btn">
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCommentForm;
