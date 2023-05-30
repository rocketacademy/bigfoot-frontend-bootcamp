import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "./constants";
import axios from "axios";
import "./App.css";
import { useParams } from "react-router-dom";

const Sightings = () => {
  const { sightingIndex } = useParams();
  const [singleSighting, setSingleSighting] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [allCategories, setAllCategories] = useState([]);

  const getSightingsComment = async () => {
    const sightingsComments = await axios.get(
      `${BACKEND_URL}/sightings/${sightingIndex}/comments`
    );
    const commentArray = (data) => {
      const res = data.map((comment) => {
        return (
          <div key={comment.id} className="comment">
            {comment.content}
          </div>
        );
      });
      return res;
    };
    setComments(commentArray(sightingsComments.data));
  };

  useEffect(() => {
    const getSightingsDataAPI = async () => {
      const sightingsEvent = await axios.get(
        `${BACKEND_URL}/sightings/${sightingIndex}`
      );
      /* sightingsEvent has many keys like data, config, status etc..
         sightingsEvent.data = {
           success: true,
           data: JSON
         }
      */
      const { data } = sightingsEvent;
      setSingleSighting(data);
    };

    getSightingsDataAPI();
    getSightingsComment();
  }, []);
  useEffect(() => {
    axios.get(`${BACKEND_URL}/categories`).then((response) => {
      setAllCategories(response.data);
    });
    // Only run this effect on component mount
  }, []);

  const categoryDisplay = allCategories.map((category) => {
    return <div>{category.name}</div>;
  });

  const handleNewComment = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BACKEND_URL}/sightings/${sightingIndex}/comments`, {
        content: newComment,
      })
      .then((res) => {
        getSightingsComment();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <div className="App-header">
        {singleSighting && (
          <div>
            <h1>Sighting {sightingIndex} </h1>
            <p>Date: {singleSighting.date}</p>
            <p>Location: {singleSighting.location}</p>
            <div>Notes: </div>
            <div className="observed-text-container">
              <p className="observed-text">{singleSighting.notes} </p>
            </div>
            <h3>Comments</h3>
            <div className="comment-container">{comments}</div>
            <h3>Submit Comment</h3>
            <form onSubmit={handleCommentSubmit}>
              <div>
                <div>My Comment: </div>
                <textarea value={newComment} onChange={handleNewComment} />
              </div>
              <input type="submit" value="Submit" />
            </form>
            <h3>Categories</h3>
            {categoryDisplay}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sightings;
