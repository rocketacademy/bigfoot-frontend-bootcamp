import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../constants";
import Navbar from "./Navbar";
import EditSightingForm from "./EditSightingForm";
import EditCommentForm from "./EditCommentForm";

function Sighting() {
  const [sighting, setSighting] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const getSighting = async () => {
    await axios
      .get(`${BACKEND_URL}/sightings/${id}`)
      .then((res) => {
        setSighting(res.data);
        console.log(sighting);
      })
      .catch((error) => {
        console.log("Error fetching sighting:", error);
      });
  };

  const getComments = async () => {
    await axios
      .get(`${BACKEND_URL}/sightings/${id}/comments`)
      .then((res) => {
        setComments(res.data);
        console.log(comments);
      })
      .catch((error) => {
        console.log("Error fetching comments:", error);
      });
  };

  useEffect(() => {
    getSighting();
    getComments();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
    navigate(`/sightings/${id}/edit`);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    navigate(`/sightings/${id}`);
  };

  const handleUpdateSighting = async (updatedSighting) => {
    try {
      await axios.put(`${BACKEND_URL}/sightings/${id}`, updatedSighting);
      setSighting(updatedSighting);
      setIsEditing(false);
      navigate(`/sightings/${id}`);
    } catch (error) {
      console.log("Error updating sighting:", error);
    }
  };

  const renderSighting = () => {
    return (
      <div className="sighting-body">
        <div>Date: {sighting.date}</div>
        <div>
          Location: {sighting.locationDescription}, {sighting.cityTown},{" "}
          {sighting.country}
        </div>
        <div>{sighting.notes}</div>
      </div>
    );
  };

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (newComment) {
      try {
        await axios.post(`${BACKEND_URL}/sightings/${id}/comments`, {
          content: newComment,
          sightingId: id,
        });
        setNewComment("");

        await axios
          .get(`${BACKEND_URL}/sightings/${id}/comments`)
          .then((res) => {
            setComments(res.data);
          });
      } catch (error) {
        console.log("Error adding comment:", error);
      }
    } else {
      alert("Please write a comment before submitting");
    }
  };

  // When user clicks "Edit" button, store comment's id in state
  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
  };

  // When user clicks "Save" button after editing comment, update comment's content in comments state
  // Map through comments array and find comment with matching commentId
  // Re-render comments to reflect changes
  const handleUpdateComment = (commentId, updatedContent) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, content: updatedContent };
      }
      return comment;
    });
    setComments(updatedComments);
    setEditingCommentId(null);
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(updatedComments);
  };

  const renderComments = () => {
    return comments.map((comment) => (
      <li key={comment.id}>
        <div>
          {comment.createdAt}: {comment.content}
          <button onClick={() => handleEditComment(comment)}>Edit</button>
        </div>
        {comment.id === editingCommentId && (
          <EditCommentForm
            comment={comment}
            onUpdateComment={handleUpdateComment}
            onDeleteComment={handleDeleteComment}
          />
        )}
      </li>
    ));
  };

  return (
    <div className="sighting-ctn App">
      <Navbar />
      {!isEditing ? (
        <div className="sighting-header">
          Sighting Summary <button onClick={handleEditClick}>✎</button>
        </div>
      ) : (
        <div className="sighting-header">
          <button onClick={handleCancelEdit}>←</button> Update Sighting
        </div>
      )}
      {!isEditing ? (
        renderSighting()
      ) : (
        <EditSightingForm
          sighting={sighting}
          onUpdateSighting={handleUpdateSighting}
        />
      )}
      <form onSubmit={handleAddComment}>
        <label htmlFor="newComment">Add a comment</label>
        <textarea
          rows="5"
          cols="50"
          id="newComment"
          name="newComment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Add Comment</button>
      </form>
      <h3>Comments</h3>
      <div>
        {comments.length > 0
          ? renderComments()
          : `Be the first to leave a comment!`}
      </div>
    </div>
  );
}

export default Sighting;
