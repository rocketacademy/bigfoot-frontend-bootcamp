import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../constants";
import Navbar from "./Navbar";
import EditSightingForm from "./EditSightingForm";
import EditCommentForm from "./EditCommentForm";
import moment from "moment";

function Sighting() {
  const [sighting, setSighting] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [likesCount, setLikesCount] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();

  const getSighting = async () => {
    await axios
      .get(`${BACKEND_URL}/sightings/${id}`)
      .then((res) => {
        setSighting(res.data);
        console.log(res.data);
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

  const getLikesCount = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/sightings/${id}/likes/count`
      );
      setLikesCount(response.data.count);
    } catch (error) {
      console.log("Error fetching likes count:", error);
    }
  };

  useEffect(() => {
    getSighting();
    getComments();
    getLikesCount();
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
        <div className="like-ctn">
          {likesCount}{" "}
          <button onClick={handleLikeClick} className="icon-btn">
            ❤
          </button>
        </div>

        <div className="sighting-details-ctn">
          <div className="date-location-ctn">
            <div>Date:</div>
            <div>{moment(sighting.date).format("d MMMM YYYY, h:mma")}</div>
            <div>Location:</div>
            <div>
              {sighting.locationDescription}, {sighting.cityTown},{" "}
              {sighting.country}
            </div>
            <div>Category/Intensity:</div>
            <div>
              {sighting.categories &&
                sighting.categories.map((category) => (
                  <div key={category.id} className="category-intensity">
                    <span className="category">{category.name}</span>
                    <span>{category.sighting_categories.intensity}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="notes-ctn">{sighting.notes}</div>
        </div>
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
      <li key={comment.id} className="comments-list-ctn">
        <div className="comment-ctn">
          <div className="comment-date">
            Posted on {moment(comment.createdAt).format("d MMMM YYYY, h:mma")}
          </div>
          <div className="comment-row">
            <div className="comment-content">{comment.content}</div>
            <button
              onClick={() => handleEditComment(comment)}
              className="icon-btn"
            >
              ✎
            </button>
          </div>
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

  const handleLikeClick = async () => {
    try {
      await axios.post(`${BACKEND_URL}/sightings/${id}/likes`);
      getLikesCount();
    } catch (error) {
      console.log("Error handling like:", error);
    }
  };

  return (
    <div className="sighting-ctn App">
      <Navbar />
      {!isEditing ? (
        <div className="sighting-header">
          Sighting Information{" "}
          <button onClick={handleEditClick} className="icon-btn">
            ✎
          </button>
        </div>
      ) : (
        <div className="sighting-header">
          <button onClick={handleCancelEdit} className="icon-btn">
            ←
          </button>{" "}
          Update Sighting
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
      {!isEditing && (
        <div>
          <form onSubmit={handleAddComment} className="comment-form-ctn">
            <label htmlFor="newComment" className="comment-form-header">
              Add a comment
            </label>
            <textarea
              rows="8"
              cols="100"
              id="newComment"
              name="newComment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit" className="btn">
              Add Comment
            </button>
          </form>
          <h3 className="comments-header">View Comments</h3>
          <div className="comments">
            {comments.length > 0
              ? renderComments()
              : `Be the first to leave a comment!`}
          </div>
        </div>
      )}
    </div>
  );
}

export default Sighting;
