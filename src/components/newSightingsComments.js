import React, { useState } from "react";
import { BACKEND_URL } from "../constants";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

const NewSightingsComments = ({ addNewComment, sightingsID }) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    content: "",
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
    console.log(state);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission actions
    axios
      .post(`${BACKEND_URL}/sightings/${sightingsID}/comments`, {
        content: state.content,
      })
      .then((res) => {
        setState({ content: "" });

        const newComment = {
          id: res.data.id,
          content: res.data.content,
          createdAt: res.data.createdAt,
          updatedAt: res.data.updatedAt,
        };

        addNewComment(newComment);

        navigate(`/sightings/${sightingsID}`);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("content:", state.content);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          id="content"
          value={state.content}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default NewSightingsComments;
