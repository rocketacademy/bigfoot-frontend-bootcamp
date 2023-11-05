import React from "react";
import { useState } from "react";
import { BACKEND_URL } from "../util/constants";
import axios from "axios";

export const EditCommentModal = ({
  commentItem,
  handleClose,
  refreshComments,
}) => {
  const [textField, setTextField] = useState({});

  const handleTextChange = (ev) => {
    let { name, value } = ev.target;

    setTextField((prevTextField) => ({
      ...prevTextField,
      [name]: value,
    }));
  };

  const handleEditComment = async () => {
    console.log(textField.newCommentText);
    await axios.put(`${BACKEND_URL}/sightings/${commentItem.id}/editComment`, {
      content: textField.newCommentText,
    });

    handleClose();
    refreshComments();
  };

  return (
    <>
      <div className="bg-orange-200 w-[100%] min-h-[10em] h-auto py-[1em] px-[2em]">
        <div className="pb-10">
          <h1 className="font-extrabold text-slate-600">
            Comment Key: {commentItem.id}
          </h1>
          <p className="font-bold">Comment:</p>
          <p>{commentItem.content}</p>
        </div>
        <div>
          <textarea
            type="text"
            name="newCommentText"
            placeholder="Description of Sighting"
            onChange={handleTextChange}
            className="text-slate-800 mb-[1em] rounded-lg"
            autoComplete="off"
            style={{
              width: "80%",
              height: "6em",
              resize: "none",
              border: "none",
              outline: "none",
            }}
          />
          <br />
          <button
            onClick={handleEditComment}
            className="bg-indigo-600 py-2 px-3 rounded-md text-slate-100 font-bold shadow-md scale-100 transition-all hover:bg-indigo-700 hover:scale-105 active:scale-90"
          >
            Submit Edited Comment
          </button>
        </div>
      </div>
    </>
  );
};
