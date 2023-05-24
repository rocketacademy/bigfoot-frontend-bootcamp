import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../constants";
import Navbar from "./Navbar";
import EditSightingForm from "./EditSightingForm";

function Sighting() {
  const [sighting, setSighting] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const getSighting = async () => {
    await axios
      .get(`${BACKEND_URL}/sightings/${id}`)
      .then((res) => {
        setSighting(res.data);
        console.log(sighting);
      })
      .catch((error) => {
        console.log("Error fetching sighting:", error);
      });
  };

  const getComments = async () => {
    await axios
      .get(`${BACKEND_URL}/sightings/${id}/comments`)
      .then((res) => {
        setComments(res.data);
        console.log(comments);
      })
      .catch((error) => {
        console.log("Error fetching comments:", error);
      });
  };

  useEffect(() => {
    getSighting();
    getComments();
  }, [id]);

  // useEffect(() => {
  //   getComments();
  // }, [newComment]);

  // useEffect(() => {
  //   axios
  //     .get(`${BACKEND_URL}/sightings/${id}`)
  //     .then((res) => {
  //       setSighting(res.data);
  //       console.log(sighting);
  //     })
  //     .catch((error) => {
  //       console.log("Error fetching sighting:", error);
  //     });

  //   axios
  //     .get(`${BACKEND_URL}/sightings/${id}/comments`)
  //     .then((res) => {
  //       setComments(res.data);
  //       console.log(comments);
  //     })
  //     .catch((error) => {
  //       console.log("Error fetching comments:", error);
  //     });
  // }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
    navigate(`/sightings/${id}/edit`);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    navigate(`/sightings/${id}`);
  };

  const handleUpdateSighting = async (updatedSighting) => {
    try {
      await axios.put(`${BACKEND_URL}/sightings/${id}`, updatedSighting);
      setSighting(updatedSighting);
      setIsEditing(false);
      navigate(`/sightings/${id}`);
    } catch (error) {
      console.log("Error updating sighting:", error);
    }
  };

  const renderSighting = () => {
    return (
      <div className="sighting-body">
        <div>Date: {sighting.date}</div>
        <div>
          Location: {sighting.locationDescription}, {sighting.cityTown},{" "}
          {sighting.country}
        </div>
        <div>{sighting.notes}</div>
      </div>
    );
  };

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (newComment) {
      try {
        await axios.post(`${BACKEND_URL}/sightings/${id}/comments`, {
          content: newComment,
          sightingId: id,
        });
        setNewComment("");

        await axios
          .get(`${BACKEND_URL}/sightings/${id}/comments`)
          .then((res) => {
            setComments(res.data);
          });
      } catch (error) {
        console.log("Error adding comment:", error);
      }
    } else {
      alert("Please write a comment before submitting");
    }
  };

  const renderComments = () => {
    return comments.map((comment) => (
      <li key={comment.id}>
        <div>
          {comment.createdAt}: {comment.content}
        </div>
      </li>
    ));
  };

  return (
    <div className="sighting-ctn App">
      <Navbar />
      {!isEditing ? (
        <div className="sighting-header">
          Sighting Summary <button onClick={handleEditClick}>✎</button>
        </div>
      ) : (
        <div className="sighting-header">
          <button onClick={handleCancelEdit}>←</button> Update Sighting
        </div>
      )}
      {!isEditing ? (
        renderSighting()
      ) : (
        <EditSightingForm
          sighting={sighting}
          onUpdateSighting={handleUpdateSighting}
        />
      )}
      <form onSubmit={handleAddComment}>
        <label htmlFor="newComment">Add a comment</label>
        <textarea
          rows="5"
          cols="50"
          id="newComment"
          name="newComment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Add Comment</button>
      </form>
      <h3>Comments</h3>
      <div>
        {comments.length > 0
          ? renderComments()
          : `Be the first to leave a comment!`}
      </div>
    </div>
  );
}

export default Sighting;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { BACKEND_URL } from "../constants";
// import Navbar from "./Navbar";

// function Sighting() {
//   const [sighting, setSighting] = useState();
//   const [sightingIndex, setSightingIndex] = useState();

//   const params = useParams();

//   useEffect(() => {
//     if (sightingIndex) {
//       axios.get(`${BACKEND_URL}/sightings/${sightingIndex}`).then((res) => {
//         setSighting(res.data);
//       });
//     }
//   }, [sightingIndex]);

//   if (sightingIndex !== params.sightingIndex) {
//     setSightingIndex(params.sightingIndex);
//   }

//   const sightingInfo = [];
//   if (sighting) {
//     for (const key in sighting) {
//       sightingInfo.push(<div key={key}>{`${key}: ${sighting[key]}`}</div>);
//     }
//   }

//   return (
//     <div className="sighting-ctn App">
//       <Navbar />
//       <div className="sighting-header">
//         {sighting && `${sighting.YEAR} ${sighting.SEASON} ${sighting.MONTH}`}
//       </div>
//       <div className="sighting-body">{sightingInfo}</div>
//     </div>
//   );
// }

// export default Sighting;
