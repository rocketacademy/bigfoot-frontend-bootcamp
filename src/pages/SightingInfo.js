import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../constants";
import "../App.css";

const SightingInfo = () => {
  const [specificSightings, setSpecificSightings] = useState({});
  const [comments, setComments] = useState([]);
  const [commentsDisplay, setCommentsDisplay] = useState(<></>);
  const [newCommentField, setNewCommentField] = useState("");
  const { int } = useParams();

  const fetchComments = async () => {
    const fetchedComments = await fetch(BACKEND_URL + "/comments/" + int, {
      method: "get",
    });
    const fetchedCommentsJson = await fetchedComments.json();
    setComments([...fetchedCommentsJson]);
  };

  const getSpecificSightings = async () => {
    const freshSightings = await fetch(BACKEND_URL + "/sightings/" + int, {
      method: "get",
    });
    const sightingsJson = await freshSightings.json();
    setSpecificSightings(sightingsJson);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    getSpecificSightings();
  }, []);

  useEffect(() => {
    setCommentsDisplay(
      comments.map((commentObj) => (
        <p className="border-bottom" key={commentObj.id}>
          {commentObj.content}
        </p>
      ))
    );
  }, [comments]);

  const handleChange = (e) => {
    setNewCommentField(e.target.value);
  };

  const handleSubmit = () => {
    const addNewComment = async () => {
      await fetch(BACKEND_URL + "/comments/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newCommentField, sighting_id: int }),
      });
      //update comments display
      await fetchComments();
    };
    addNewComment();
    //reset input fields
    setNewCommentField("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/" className="top-left">
          Back
        </Link>
        <h1>Report ID: {specificSightings.id}</h1>
        <h3>Date: {specificSightings.date}</h3>
        <h3>Location Details: {specificSightings.location}</h3>
        <h2>Notes:</h2>
        <p>{specificSightings.notes}</p>
        <div className="comments-container">
          <h2 className="comments-header border-bottom-thick">Comments:</h2>
          <input
            type="text"
            value={newCommentField}
            onChange={(e) => handleChange(e)}
            placeholder="Write your comment here"
          ></input>
          <button onClick={handleSubmit}>Submit</button>
          {commentsDisplay}
        </div>
      </header>
    </div>
  );
};

export default SightingInfo;
