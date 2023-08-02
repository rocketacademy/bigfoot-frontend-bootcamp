import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function SightingsList() {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const [sighting, setSighting] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const sightingId = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (sightingId) {
      getSightingId();
      getComments();
    }
  }, [sightingId, comments]);

  const getSightingId = async () => {
    let response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/sightings/${sightingId}`
    );
    // console.log(response.data);
    setSighting(response.data);
  };

  const getComments = async () => {
    let response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/sightings/${sightingId}/comments`
    );
    setComments(response.data);
  };

  const addComment = async (e) => {
    e.preventDefault();

    if (newComment !== "") {
      let response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sightings/${sightingId}/comments`,
        {
          content: newComment,
          sightingId: sightingId,
        }
      );
      console.log(response.data);
      setNewComment("");
    } else {
      alert("Please write your comment in the box below!");
    }
  };

  useEffect(() => {
    // Set the initial state values
    setDate(sighting.date);
    setLocation(sighting.location);
    setNotes(sighting.notes);
  }, [sighting]);

  const saveEdits = async () => {
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/sightings/${sightingId}`,
      {
        date,
        location,
        notes,
      }
    );
    getSightingId();
  };

  const cancelEdit = () => {
    setDate(sighting.date);
    setLocation(sighting.location);
    setNotes(sighting.notes);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div
      style={{
        margin: "3rem",
        fontSize: "0.8rem",
        width: "80%",
        margin: "auto",
      }}
    >
      <button onClick={handleBack}>Back to Previous Page</button>
      <br />
      <br />
      <div>
        <strong>SIGHTING #{sightingId}</strong>
      </div>
      <br />
      <div>
        <strong>Date: </strong>
        {sighting.date}
      </div>
      <div>
        <strong>Location: </strong>
        {sighting.location}
      </div>
      <div>
        <strong>Notes: </strong>
        {sighting.notes}
      </div>
      <div>
        <strong>Category: </strong>
        {sighting.categories && sighting.categories.length > 0
          ? sighting.categories[0].name
          : "N/A"}
      </div>

      <h3>COMMENTS</h3>
      {comments
        ? comments.map((comment) => (
            <div key={comment.id}>
              {comment.createdAt} - {comment.content}
            </div>
          ))
        : ""}

      <div
        style={{
          border: "5px solid white",
          padding: "1rem 2rem 2rem",
          margin: "2rem auto",
          width: "50vw",
        }}
      >
        <h3>ADD A NEW COMMENT:</h3>
        <div>
          <strong>Comment:</strong>
          <textarea
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            style={{
              resize: "none",
              height: "4rem",
              fontFamily: "arial",
              width: "80%",
            }}
          />
        </div>
        <button onClick={addComment}>Add Comment</button>
      </div>

      <div
        style={{
          border: "5px solid white",
          padding: "1rem 2rem 2rem",
          margin: "2rem auto",
          width: "50vw",
        }}
      >
        <h3>UPDATE SIGHTING DETAILS BELOW:</h3>
        <div>
          <strong>Date:</strong>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <strong>Location:</strong>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <strong>Notes:</strong>
          <textarea
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{
              resize: "none",
              height: "4rem",
              fontFamily: "arial",
              width: "80%",
            }}
          />
        </div>
        <button onClick={saveEdits}>Save Changes</button>
        <button onClick={cancelEdit}>Cancel</button>
      </div>
    </div>
  );
}
