// CommentForm.js
import React, { useState } from "react";
import axios from "axios";

export default function CommentForm({ sightingId, refreshComments }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send a POST request to the API
    await axios.post(`http://localhost:3000/sightings/${sightingId}/comments`, {
      content,
    });

    // Clear the form
    setContent("");

    // Refresh the comment list
    refreshComments();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        New comment:
        <input
          type="text"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
