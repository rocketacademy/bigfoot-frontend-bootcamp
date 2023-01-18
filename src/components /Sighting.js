import React, { useState, useEffect, startTransition } from "react";
import axios from "axios";
import { serverURL } from "../ServerURL";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card } from "antd";
import { Divider, List, Typography } from "antd";

const Sighting = () => {
  const [sightings, setSightings] = useState([]);
  const [sightingID, setSightingID] = useState(0);
  const [comments, setComments] = useState([]);
  const params = useParams();
  const [newComment, setNewComment] = useState({
    comment: "",
  });

  const handleUserInput = (e) => {
    setNewComment({
      ...newComment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${serverURL}/${sightingID}/comments`, {
        content: newComment.comment,
      })
      .then((response) => {
        setNewComment({});
        return axios.get(`${serverURL}/${response.data.sightingId}/comments`);
      })
      .then((response) => {
        setComments(response.data);
      });
  };

  useEffect(() => {
    axios
      .get(`${serverURL}/${sightingID}`)
      .then((response) => setSightings(response.data));
  }, [sightingID]);

  if (sightingID != params.sightingID) setSightingID(params.sightingID);

  console.log(sightings);

  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${serverURL}/${sightingID}/comments`)
      .then((response) => setComments(response.data));
  }, [sightingID]);

  const commentList = comments.map((comment) => {
    return comment.content;
  });

  const commentForm = (
    <div>
      <p>
        <label for="sighting-comment">Add New Comment: </label>
        <input
          type="text"
          id="comment"
          name="comment"
          required
          minLength="5"
          maxLength="50"
          value={newComment.content}
          placeholder="Write your comment here!"
          onChange={handleUserInput}
        />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </p>
    </div>
  );

  let categoryList;

  if (sightings.categories) {
    categoryList = sightings.categories.map((category) => (
      <p>{category.name}</p>
    ));
  }

  return (
    <div>
      <Card
        title={`Sighting No.: ${sightingID}`}
        extra={<Link to="/">Back</Link>}
        style={{
          width: 300,
          textAlign: "left",
          margin: 50,
        }}
      >
        <p>Category: {categoryList}</p>
        <p>Date: {sightings.date}</p>
        <p>Location: {sightings.location}</p>
        <p>Notes: {sightings.notes}</p>
        <button
          type="button"
          onClick={() => {
            navigate(`/sightings/${sightingID}/edit`);
          }}
        >
          Edit this sighting
        </button>
        <Divider orientation="left">Comments: </Divider>
        {commentForm}
        <List
          bordered
          dataSource={commentList}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </Card>
    </div>
  );
};

export default Sighting;
