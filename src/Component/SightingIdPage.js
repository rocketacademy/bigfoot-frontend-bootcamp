import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_URL } from "../constant";

export default function SightingIdPage() {
  const { sightingId } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const getOneData = async () => {
      const newData = await axios.get(`${BACKEND_URL}/sightings/${sightingId}`);
      setData(newData.data);
    };
    const getComments = async () => {
      const newComments = await axios.get(
        `${BACKEND_URL}/sightings/${sightingId}/comments`
      );
      setComments(newComments.data);
    };
    Promise.all([getOneData(), getComments()]);
  }, [sightingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = { content: input };
    await axios.post(
      `${BACKEND_URL}/sightings/${sightingId}/comments`,
      newComment
    );
    setComments((prev) => {
      return [...prev, newComment];
    });
    setInput("");
  };

  const sightingDisplay = data ? (
    <div>
      <ul>
        <li>Date: {data.date}</li>
        <li>City: {data.city}</li>
        <li>Country: {data.country}</li>
        <li>Location: {data.locationDescription}</li>
        <li>Note: {data.notes}</li>
      </ul>
    </div>
  ) : (
    "No data in this id."
  );

  const commentDisplay = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return (
    <div className="index-div">
      <ul>{sightingDisplay}</ul>
      {data && (
        <Link to={`/sightingSearch/${sightingId}/edit`}>
          <button>Edit data</button>
        </Link>
      )}
      <div>
        Comment:
        <ul>{commentDisplay}</ul>
        <form onSubmit={handleSubmit}>
          <input value={input} onChange={(e) => setInput(e.target.value)} />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}
