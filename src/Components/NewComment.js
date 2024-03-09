import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../constants";
import { Link } from "react-router-dom";

export const NewComment = ({ sightingId }) => {
  const [commentValue, setCommentValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${BACKEND_URL}/sightings/${sightingId}/comments`, {
          content: commentValue,
        })
        .then((res) => {
          setCommentValue("");
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="prose max-w-full p-12">
        <h1 className="text-center">Submit Sighting</h1>
        <Link to={`/sighting/${sightingId}`}>
          <button className="btn mb-10">Back</button>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="pb-8 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-8"
        >
          <div className="sm:col-start-2 sm:col-span-6">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">{"Notes"}</span>
              </div>
              <input
                placeholder="Type here"
                className="input input-bordered w-full"
                value={commentValue}
                onChange={(e) => {
                  setCommentValue(e.target.value);
                }}
                required
              />
            </label>
          </div>
          <button
            className="btn btn-primary sm:col-start-4 sm:col-span-2"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
