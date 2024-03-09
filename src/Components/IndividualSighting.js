import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../constants";

export const IndividualSighting = ({ sightingId }) => {
  const [sightings, setSightings] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getSightings = async () => {
      try {
        const sightingsResults = await axios.get(
          `${BACKEND_URL}/sightings/${sightingId}`
        );
        const sightingComments = await axios.get(
          `${BACKEND_URL}/sightings/${sightingId}/comments`
        );
        setSightings(sightingsResults.data);
        setComments(sightingComments.data);
      } catch (error) {
        console.error(error);
      }
    };
    getSightings();
  }, [sightingId]);

  console.log(sightings);

  return (
    <div className="prose max-w-full p-12">
      <h1 className="text-center">Big Foot Sighting</h1>
      <Link to={`/`}>
        <button className="btn mb-10">Back</button>
      </Link>
      <div className="overflow-x-auto">
        {sightings && (
          <table className="table">
            <thead>
              <tr>
                <td>ID</td>
                <td>Date</td>
                <td>Location</td>
                <td>Notes</td>
                <td>Created At</td>
                <td>Updated At</td>
                <td>Categories</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{sightings.id}</td>
                <td>{sightings.date}</td>
                <td>{sightings.location}</td>
                <td>{sightings.notes}</td>
                <td>{sightings.createdAt}</td>
                <td>{sightings.updatedAt}</td>
                <td>
                  {sightings.categories.map((category) => (
                    <span key={category.id}>{category.name} </span>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <h2 className="text-center">Comments</h2>
      <Link to={`/sighting/${sightingId}/comments/new`}>
        <button className="btn mb-10">New Comment</button>
      </Link>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <td>ID</td>
              <td>Content</td>
              <td>Created At</td>
              <td>Updated At</td>
              <td>Sighting ID</td>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr key={comment.id}>
                <td>{comment.id}</td>
                <td>{comment.content}</td>
                <td>{comment.createdAt}</td>
                <td>{comment.updatedAt}</td>
                <td>{comment.sightingId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
