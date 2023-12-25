import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_URL } from "../constant";

export default function SightingIdPage() {
  const { sightingId } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");
  const [editComment, setEditComment] = useState(false);
  const [editCommentId, setEditCommentId] = useState(0);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const getOneData = async () => {
      const newData = await axios.get(`${BACKEND_URL}/sightings/${sightingId}`);
      setData(newData.data);
      setLikes(newData.data.likes.length);
      setComments(newData.data.comments);
    };
    getOneData();
  }, [sightingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = { content: input };
    const resComment = await axios.post(
      `${BACKEND_URL}/sightings/${sightingId}/comments`,
      newComment
    );
    setComments((prev) => {
      return [...prev, resComment.data];
    });
    setInput("");
  };

  const handleDelete = async (e) => {
    const commentId = e.target.value;
    await axios.delete(
      `${BACKEND_URL}/sightings/${sightingId}/comments/${commentId}`
    );
    const getComments = async () => {
      const newComments = await axios.get(
        `${BACKEND_URL}/sightings/${sightingId}/comments`
      );
      setComments(newComments.data);
    };
    getComments();
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    await axios.put(
      `${BACKEND_URL}/sightings/${sightingId}/comments/${editCommentId}`,
      { content: input }
    );
    const getComments = async () => {
      const newComments = await axios.get(
        `${BACKEND_URL}/sightings/${sightingId}/comments`
      );
      setComments(newComments.data);
    };
    getComments();
    setInput("");
    setEditComment(false);
  };

  const handleLike = async (e) => {
    await axios.post(`${BACKEND_URL}/sightings/${sightingId}/like`);
    const getLikes = async () => {
      const newLikes = await axios.get(
        `${BACKEND_URL}/sightings/${sightingId}/likes`
      );
      setLikes(newLikes.data.count);
    };
    getLikes();
  };

  const sightingDisplay = data ? (
    <div>
      <ul>
        <li>Date: {data.date}</li>
        <li>City: {data.city}</li>
        <li>Country: {data.country}</li>
        <li>Location: {data.locationDescription}</li>
        <li>Note: {data.notes}</li>
      </ul>
    </div>
  ) : (
    "No data in this id."
  );

  const commentDisplay = comments.map((comment) => {
    return (
      <li key={comment.id}>
        {comment.content}
        <button value={comment.id} onClick={handleDelete}>
          Delete
        </button>
        <button
          onClick={() => {
            setEditCommentId(comment.id);
            setInput(comment.content);
            setEditComment(true);
          }}
        >
          Edit
        </button>
      </li>
    );
  });
  return (
    <div className="index-div">
      <ul>{sightingDisplay}</ul>
      <button onClick={handleLike}>{likes}♡</button>
      {data && (
        <Link to={`/sightingSearch/${sightingId}/edit`}>
          <button>Edit data</button>
        </Link>
      )}

      <div style={{ border: "3px solid white" }}>
        Comment:
        {!editComment ? (
          <div>
            <ul>{commentDisplay}</ul>
            <form onSubmit={handleSubmit}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Leave comment"
              />
              <input type="submit" />
            </form>
          </div>
        ) : (
          <form onSubmit={handleEdit}>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <input type="submit" />
          </form>
        )}
      </div>
    </div>
  );
}
