import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import ListGroup from "react-bootstrap/ListGroup";

import { BACKEND_URL } from "../constants";

const SightingPage = (props) => {
  const [selectedSighting, setSelectedSighting] = useState({});
  const [comments, setComments] = useState([]);
  let { sightingId } = useParams(); // get selected sightingIndex from url params as this persist after user refreshes page
  const navigate = useNavigate();

  const getSingleSightingData = async () => {
    const data = await axios.get(`${BACKEND_URL}/${sightingId}`);

    setSelectedSighting(data.data);
  };

  const getComments = async () => {
    const data = await axios.get(`${BACKEND_URL}/${sightingId}/comments`);

    setComments(data.data);
    // console.log(typeof data.data[0].createdAt);
  };

  useEffect(() => {
    getSingleSightingData();
    getComments();
    return;
  }, []);

  const selectedSightingList = (
    // render list of sighting after selectedSighting is retrieved
    <li>
      Date:
      <br />
      {selectedSighting.date}
      <br />
      <br />
      Location Discription: <br />
      {selectedSighting.location_discription}
      <br />
      <br />
      Notes: <br />
      {selectedSighting.notes}
      <br />
      <br />
      City: <br />
      {selectedSighting.city}
      <br />
      <br />
      Country: <br />
      {selectedSighting.country}
    </li>
  );

  const dateStrTodateFormat = (dateStr) => {
    const date = new Date(dateStr);
    const iso = date.toLocaleString();
    return iso;
  };

  const commentList = comments.map((comment, id) => (
    <ListGroup.Item action key={id}>
      {comment.content} - {dateStrTodateFormat(comment.createdAt)}
    </ListGroup.Item>
  ));

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/sightings");
        }}
      >
        {" "}
        Back
      </Button>{" "}
      <Button
        variant="contained"
        onClick={() => {
          navigate(`/sightings/${sightingId}/edit`);
        }}
      >
        {" "}
        Edit
      </Button>
      <ul className="sighting-list">{selectedSightingList}</ul>
      <ListGroup>
        <ListGroup.Item active>Comments</ListGroup.Item>
        {commentList}
      </ListGroup>
    </div>
  );
};

export default SightingPage;
