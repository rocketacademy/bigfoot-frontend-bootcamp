import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { BACKEND_URL } from "../Constants";

export default function AddCategory() {
  const [newCategory, setCategory] = useState({
    category: "",
  });
  const navigate = useNavigate();

  function sendPostRequest() {
    const url = `${BACKEND_URL}/categories`;

    if (!newCategory.category) { 
        // Go back the previous page if no new category is inputted/added
        navigate(`/new`);
    } else {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      })
        .then((response) => response.json())
        .then((data) => {
          setCategory({
            category: "",
          });

          navigate(`/new`);
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
      <h3>Add category:</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={newCategory.category}
          onChange={(e) =>
            setCategory({ ...newCategory, category: e.target.value })
          }
          placeholder="Add category"
          rows={1} // You can adjust this value to fit the desired number of lines
          style={{ width: "70%", resize: "vertical" }} // Optional styling for width and vertical resizing
        />
        <br />
      
          <button type="submit">Submit/Back</button>
       
      </form>
    </div>
  );
}
