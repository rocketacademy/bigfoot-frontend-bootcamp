import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export const CommentTable = ({ commentsData, sightingIndex, BACKEND_URL }) => {
  const [textField, setTextField] = useState({});
  const [storedComments, setStoredComments] = useState(null);
  const [databaseComments, setDatabaseComments] = useState(null);
  const [changedState, setChangedState] = useState(false);

  // Check Database's comments (Create a listener)
  // useEffect(() => {}, []);

  useEffect(() => {
    if (commentsData.success === true) {
      setStoredComments(commentsData.data);
    }
  }, []);

  useEffect(() => {
    console.log("triggered");
  }, [storedComments]);

  const handleTextChange = (ev) => {
    let { name, value } = ev.target;
    setTextField({
      [name]: value,
    });
  };

  const handleAddComment = async () => {
    if (textField) {
      console.log("adding comment");
      let addedComment = await axios.post(
        `${BACKEND_URL}/sightings/${sightingIndex}/addComments`,
        {
          content: textField.newComment,
          sighting_id: sightingIndex,
        }
      );

      console.log("added comment: ", addedComment.data);
      // need to add the comment to the state!
      setStoredComments([...storedComments, addedComment.data.data]);
    } else {
      alert("please type in a message!");
    }
  };

  const handleDeleteComment = async (ev) => {
    ev.preventDefault();
    console.log("deleting post of id: ", ev.target.id);
    await axios.delete(
      `${BACKEND_URL}/sightings/${ev.target.id}/deleteComment`
    );

    // Need to update the state somehow.
    let removeIndex = ev.target.parentNode.getAttribute("data-index");
    let newArray = [...storedComments];
    newArray.splice(removeIndex, 1);
    setStoredComments(newArray);
  };

  const getAllComments = async (ev) => {
    await axios.get(`${BACKEND_URL}/sightings/${ev.target.id}/deleteComment`);
  };

  return (
    <>
      <div className="w-full">
        <button
          onClick={() => {
            console.log(storedComments);
          }}
        >
          BUTT
        </button>

        {/* Add Comment */}
        <div className="pb-[1em]">
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
            }}
          >
            <input
              type="text"
              name="newComment"
              placeholder="Comment here"
              onChange={handleTextChange}
              autoComplete="off"
              className="text-slate-800 mb-[1em] rounded-lg lg:w-[60%] w-[100%] min-h-[5rem] align-top"
            />
            <br />
            <button
              className="bg-slate-400 py-2 px-3 rounded-md text-slate-900 font-extrabold shadow-md scale-100 transition-all hover:bg-slate-500 active:scale-90"
              onClick={handleAddComment}
            >
              Submit Comment
            </button>
          </form>
        </div>

        <div className="flex flex-row w-full justify-center">
          <div className="flex flex-col-reverse justify-center pb-[2em] w-[80%] lg:w-[50%] gap-2">
            {storedComments !== null
              ? storedComments.map((item, listindex) => {
                  return (
                    <div
                      data-index={listindex}
                      className="bg-orange-200 w-[100%] rounded-lg text-black p-[1em]"
                    >
                      <p className="pb-2">{item.content}</p>
                      <p className="text-sm text-slate-700 pb-[1em]">
                        Commented At:
                        <br /> {item.createdAt}
                      </p>

                      <button
                        key={listindex}
                        id={item.id}
                        onClick={handleDeleteComment}
                        className="bg-red-400 px-[1em] rounded-lg"
                      >
                        Delete
                      </button>
                      {/* <p className="text-sm text-slate-500">{item.updatedAt}</p> */}
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </>
  );
};
