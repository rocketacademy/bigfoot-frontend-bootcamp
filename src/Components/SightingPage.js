import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import ListGroup from "react-bootstrap/ListGroup";

import EditComment from "./EditComment";
import { BACKEND_URL } from "../constants";

// styling
import Chip from "@mui/joy/Chip";

// heart likes
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

const SightingPage = () => {
  const [selectedSighting, setSelectedSighting] = useState({});
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [editCommentId, setEditCommentId] = useState(0);
  const [likes, setLikes] = useState(null);

  let { sightingId } = useParams(); // get selected sightingIndex from url params as this persist after user refreshes page
  const navigate = useNavigate();

  const getSingleSightingData = async () => {
    const data = await axios.get(`${BACKEND_URL}/sightings/${sightingId}`);
    console.log(data);
    setSelectedSighting(data.data);
  };

  const getComments = async () => {
    const data = await axios.get(
      `${BACKEND_URL}/sightings/${sightingId}/comments`
    );

    setComments(data.data.reverse()); // reverse order of comments to show latest first
  };

  const getLikes = async () => {
    const data = await axios.get(
      `${BACKEND_URL}/sightings/${sightingId}/likes`
    );

    setLikes(data.data.length); // reverse order of comments to show latest first
    // console.log(typeof data.data[0].createdAt);
  };

  useEffect(() => {
    getSingleSightingData();
    getComments();
    getLikes();

    return;
  }, []);

  const categoryClickColor = (category) => {
    if (category === "rain") {
      return "primary";
    } else if (category === "mountain") {
      return "warning";
    } else if (category === "sunny") {
      return "danger";
    }
  };

  // sighting details
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
      <br />
      <br />
      {selectedSighting.categories && selectedSighting.categories.length > 0 ? (
        <div>
          Category:{" "}
          {selectedSighting.categories.map((category, id) => (
            <Chip
              key={id}
              color={categoryClickColor(category.name)}
              variant="solid"
            >
              {category.name}
            </Chip>
          ))}
        </div>
      ) : null}
    </li>
  );

  const dateStrTodateFormat = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-GB", {
      hour12: true,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  };

  //Comments
  const commentList = comments.map((comment, id) => (
    <div key={id}>
      <ListGroup.Item action>
        {comment.id === editCommentId ? (
          <EditComment
            preloadComment={comment.content}
            setEditCommentId={setEditCommentId}
            sightingId={sightingId}
            commentID={editCommentId}
            getComments={getComments}
          />
        ) : (
          comment.content
        )}
        <br />
        Created: {dateStrTodateFormat(comment.createdAt)}
        <br />
        {comment.createdAt !== comment.updatedAt &&
          "Edited: " + dateStrTodateFormat(comment.updatedAt)}
      </ListGroup.Item>
      <Button variant="contained" onClick={() => setEditCommentId(comment.id)}>
        Edit
      </Button>
      <Button
        variant="contained"
        onClick={async () => {
          await axios.delete(`${BACKEND_URL}/sightings/comments`, {
            data: {
              commentId: comment.id,
            },
          });

          getComments();
        }}
      >
        Delete
      </Button>
    </div>
  ));

  const handleCommentFormSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`${BACKEND_URL}/sightings/${sightingId}/comments`, {
      content: commentInput,
    });

    getComments();
    setCommentInput("");
  };

  const handleLikeButtonClick = async (e) => {
    // e.preventDefault();
    await axios.post(`${BACKEND_URL}/sightings/${sightingId}/likes`);
    getLikes();
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          navigate(-1);
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
      {/* Sighting Details */}
      <ul className="sighting-list">{selectedSightingList}</ul>
      <br />
      Likes: {likes}{" "}
      {/* like button
       */}
      <StyledRating
        name="customized-color"
        value={1}
        max={1}
        onChange={(e, newValue) => {
          handleLikeButtonClick();
        }}
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" color="secondary" />}
      />
      <br />
      <br />
      <form onSubmit={handleCommentFormSubmit}>
        Enter comments:{" "}
        <input
          type="text"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <input type="submit" />
        <br />
        <br />
      </form>
      <ListGroup>
        <ListGroup.Item active>Comments</ListGroup.Item>
        {commentList}
      </ListGroup>
    </div>
  );
};

export default SightingPage;
