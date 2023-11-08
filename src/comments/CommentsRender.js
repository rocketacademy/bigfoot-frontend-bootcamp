import { BACKEND_URL } from "../Constants";
import React, { useState, useEffect } from "react";

export default function CommentRender(props) {
  
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const url = `${BACKEND_URL}/sightings/${props.index}/comments`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [props.index]);
  
  if (comments.length === 0) {
    return <p>No comments currently</p>;
  }

  return (
    <div>
      {comments.map((comment, index) => (
        <div key={index}>
          <p>Comment #{index + 1}: {comment.content}</p>
        </div>
      ))}
    </div>)
}
