import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../App.css";
import { BACKEND_URL } from "../Constants";

export default function NewComment(props) {
  const [comment, setComment] = useState({
    content: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const { index } = props;
  function sendPostRequest() {
    const url = `${BACKEND_URL}/sightings/${index}/comments`;
    if (!comment.content) {
      alert("Comment cannot be empty");
    } else {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("Response Data:", data);
          setComment({
            content: "",
          });
          setSuccessMessage("Successfully submitted the sighting!");
          // After successful submission, navigate to the SightingDetails page with the newly created sighting ID
          navigate(`/${index}/comments`);
        })

        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendPostRequest();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <br />
        <h3>Please enter comment:</h3>
        <input
          type="text"
          value={comment.content}
          onChange={(e) => setComment({ ...comment, content: e.target.value })}
          placeholder="Comment Here"
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <br />
      <Link to={`/${index}/comments`} style={{ textDecoration: "none" }}>
        <button>Back</button>
      </Link>
      
    </div>
  );
}
