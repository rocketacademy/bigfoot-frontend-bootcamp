import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../constants";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

export default function CommentEditForm({ comment, setComments }) {
  const [editMode, setEditMode] = useState(false);
  const [updatedComment, setUpdatedComment] = useState({});
  const { sightingId } = useParams();

  const handleUpdateComment = async (commentId) => {
    console.log(commentId);
    const { data } = await axios.put(
      `${BACKEND_URL}/sightings/${sightingId}/comments/${commentId}`,
      {
        content: updatedComment.content,
      }
    );
    setEditMode(false);
    setComments((prev) => [...prev, data]);
  };

  const handleDeleteComment = async (commentId) => {
    await axios.delete(
      `${BACKEND_URL}/sightings/${sightingId}/comments/${commentId}`,
      {
        content: updatedComment.content,
      }
    );
    setEditMode(false);
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
  };

  return (
    <div>
      <Button onClick={() => setEditMode(!editMode)}>
        {editMode ? "Cancel" : "Edit/ Delete"}
      </Button>
      <br />
      {editMode && (
        <div>
          <textarea
            type="text"
            value={updatedComment.content || comment.content}
            onChange={({ target }) =>
              setUpdatedComment((prev) => ({ ...prev, content: target.value }))
            }
          />
          <br />
          <Button onClick={() => handleUpdateComment(comment.id)}>
            Update
          </Button>
          <Button onClick={() => handleDeleteComment(comment.id)}>
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}
