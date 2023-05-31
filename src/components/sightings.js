import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../constants";
import NewSightingsComments from "./newSightingsComments";

const Sightings = () => {
  const [sightingsData, setSightingsData] = useState();
  const [sightingsID, setSightingsID] = useState();
  const [comments, setComments] = useState();

  const params = useParams().id;
  if (sightingsID !== params) {
    setSightingsID(params);
  }

  // call backend here
  useEffect(() => {
    if (sightingsID) {
      const getSightingsData = async () => {
        const data = await axios.get(`${BACKEND_URL}/sightings/${sightingsID}`);
        setSightingsData(data.data);
      };
      getSightingsData();
    }

    if (sightingsID) {
      const getAllComments = async () => {
        const commentData = await axios.get(
          `${BACKEND_URL}/sightings/${sightingsID}/comments`
        );
        console.log(commentData);
        setComments(commentData.data);
      };
      getAllComments();
    }
  }, []);

  const addNewComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  console.log(sightingsData);
  console.log(comments);
  if (sightingsData == null) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Sighting Details</h2>
      <p>Date: {sightingsData.date}</p>
      <p>Location: {sightingsData.location}</p>
      <p>Notes: {sightingsData.notes}</p>
      <p>
        Category:{" "}
        {sightingsData.categories.length > 0 &&
          sightingsData.categories.map((category) => (
            <div key={category.id}>
              <p>{category.name}</p>
            </div>
          ))}
      </p>
      <br />
      <div>
        Add comments here:
        <NewSightingsComments
          addNewComment={addNewComment}
          sightingsID={sightingsID}
        />
      </div>
      <h3>Comments:</h3>
      {comments ? (
        comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.content}</p>
            <h6>Created at: {comment.createdAt}</h6>
            <h6>Updated at: {comment.updatedAt}</h6>
          </div>
        ))
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default Sightings;
