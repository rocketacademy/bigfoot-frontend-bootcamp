import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { EditCommentModal } from "./EditCommentModal";

export const CommentTable = ({ commentsData, sightingIndex, BACKEND_URL }) => {
  const [textField, setTextField] = useState({});
  const [storedComments, setStoredComments] = useState(null);
  const [modalState, setModalState] = useState(false);
  const [commentItem, setCommentItem] = useState(null);
  const [refreshedState, setRefreshedState] = useState(false);

  // Check Database's comments (Create a listener)
  // useEffect(() => {}, []);

  useEffect(() => {
    if (commentsData.success === true) {
      console.log("initial commentsData: ", commentsData);
      setStoredComments(commentsData.data);
    }
  }, []);

  const handleTextChange = (ev) => {
    let { name, value } = ev.target;
    setTextField({
      [name]: value,
    });
  };

  // useEffect(() => {
  //   console.log("RUN");
  //   // refreshComments();
  // }, [modalState, commentItem]);

  const refreshComments = async () => {
    let updatedComments = await axios.get(
      `${BACKEND_URL}/sightings/${sightingIndex}/getAllComments`
    );

    let newComments = updatedComments.data;
    console.log("updated comments: ", newComments);
    // return newComments;
    setStoredComments(newComments.data);
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

  const handleModal = (comment) => {
    console.log(comment);
    setModalState(true);
    setCommentItem(comment);
  };

  const handleCloseModal = () => {
    setModalState(false);
    setCommentItem(null);
  };

  return (
    <>
      {modalState !== false && commentItem !== null ? (
        <>
          <div className="fixed top-[50%] left-[50%] w-[80%] lg:w-[50%] translate-x-[-50%] translate-y-[-50%] z-40 ">
            <EditCommentModal
              commentItem={commentItem}
              handleClose={handleCloseModal}
              refreshComments={refreshComments}
            />
          </div>
          <div
            className="fixed top-0 left-0 w-full h-full bg-slate-800 opacity-40 z-10"
            onClick={handleCloseModal}
          ></div>
        </>
      ) : null}
      <div className="w-full">
        {/* <button
          onClick={() => {
            console.log(modalState);
          }}
        >
          BUTT
        </button> */}

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
              className="bg-teal-400 py-2 px-3 rounded-md text-slate-900 font-extrabold shadow-md scale-100 transition-all hover:bg-teal-500 active:scale-90"
              onClick={handleAddComment}
            >
              Submit Comment
            </button>
          </form>
        </div>

        <div className="flex flex-row w-full justify-center">
          <div className="flex flex-col-reverse justify-center pb-[2em] w-[80%] lg:w-[50%] gap-2">
            {storedComments !== null && storedComments
              ? storedComments.map((item, listindex) => {
                  return (
                    <div
                      key={listindex}
                      data-index={listindex}
                      className="bg-orange-200 w-[100%] rounded-lg text-black p-[1em]"
                      onClick={() => {
                        handleModal(item);
                      }}
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
