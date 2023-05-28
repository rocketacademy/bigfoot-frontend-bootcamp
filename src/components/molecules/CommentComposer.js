import { Send } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { BACKEND_URL } from "../../constants";

function CommentComposer({ sightingId, setUpdate }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = await axios.post(
        `${BACKEND_URL}/sightings/${sightingId}/comments`,
        {
          content,
        }
      );

      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      setContent("");
      setUpdate((prevUpdate) => !prevUpdate);
    }
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        required
        fullWidth
        autoComplete="off"
        value={content}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSubmit}>
                <Send color="primary" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextField>
    </form>
  );
}

export default CommentComposer;
