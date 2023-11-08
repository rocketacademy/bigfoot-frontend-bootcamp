import { useState } from 'react';
import axios from 'axios';
import Button from './Button';

export default function EditCommentForm({ propsId, propsContent }) {
  //State for new sightings list
  const [content, setContent] = useState(propsContent);
  const BIGFOOTAPI = process.env.REACT_APP_DATABASE_URL;

  //send data to database
  const writeData = async () => {
    const newPost = {
      content: content,
    };
    try {
      await axios.put(`${BIGFOOTAPI}/comments/${propsId}`, newPost);
      await axios.get(`${BIGFOOTAPI}/comments`);

      document.getElementById(`edit-comment-form-${propsId}`).close();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          document.getElementById(`edit-comment-form-${propsId}`).showModal();
        }}
      >
        Edit
      </button>
      <dialog id={`edit-comment-form-${propsId}`} className="modal">
        <div className="modal-box flex flex-col items-center rounded-2xl bg-white">
          <form
            method="dialog"
            className="flex w-96 flex-col items-center justify-center p-[20px] text-black"
          >
            <button
              type="button"
              className="btn btn-circle btn-ghost btn-sm absolute right-5 top-5 "
              onClick={() => {
                document.getElementById(`edit-comment-form-${propsId}`).close();
              }}
            >
              ✕
            </button>
            <label className="mb-[5px]">Comment:</label>
            <input
              className="input mb-[15px] mr-[15px] w-64 rounded-md bg-slate-300 px-2"
              type="text"
              name="content"
              value={content}
              placeholder="Insert comment here"
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            <Button label="Submit" handleClick={writeData} />
          </form>
        </div>
      </dialog>
    </div>
  );
}
