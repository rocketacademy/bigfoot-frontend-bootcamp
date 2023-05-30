import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "./constants";
import axios from "axios";
import "./App.css";
import { useParams } from "react-router-dom";
import Select from "react-select";

const Sightings = () => {
  const { sightingIndex } = useParams();
  const [singleSighting, setSingleSighting] = useState(null);
  const [comments, setComments] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  useEffect(() => {
    console.log("Sighting Index: ", sightingIndex);
    const getSightingsDataAPI = async () => {
      const sightingsEvent = await axios.get(
        `${BACKEND_URL}/sightings/${sightingIndex}`
      );
      console.log("sightingsEvent: ", sightingsEvent);
      /* sightingsEvent has many keys like data, config, status etc..
         sightingsEvent.data = {
           success: true,
           data: JSON
         }
      */
      const { data } = sightingsEvent;
      console.log("data: ", data);
      setSingleSighting(data);
    };
    const getSightingsComment = async () => {
      const sightingsComments = await axios.get(
        `${BACKEND_URL}/sightings/${sightingIndex}/comments`
      );
      const commentArray = (data) => {
        const res = data.map((comment) => {
          return (
            <div>
              <div key={comment.id}>{comment.content}</div>
            </div>
          );
        });
        return res;
      };
      setComments(commentArray(sightingsComments.data));
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
            {comments}
            <h3>Categories</h3>
            {categoryDisplay}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sightings;
