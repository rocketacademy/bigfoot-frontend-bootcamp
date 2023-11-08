import { useState } from 'react';
import axios from 'axios';

export default function CommentForm({ propsId }) {
  //State for new sightings list
  const [content, setContent] = useState('');
  const [sightingId, setSightingId] = useState('');
  const BIGFOOTAPI = process.env.REACT_APP_DATABASE_URL;

  //send data to database
  const writeData = async () => {
    const newPost = {
      content: content,
      sightingId: propsId,
    };
    try {
      await axios.post(`${BIGFOOTAPI}/comments/create`, newPost);
      setContent('');
      setSightingId('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-slate-300 text-gray-800 font-bold py-2 px-4 border-b-4 border-t-2 border-x-4 border-slate-700 rounded p-[10px] mx-[50px] font-bold text-black w-50 font-slate-300 flex-row flex">
      <input
        className="w-full p-[5px] mr-5 bg-slate-300 text-gray-800"
        type="text"
        name="content"
        value={content}
        placeholder="Insert Comments Here"
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="" onClick={writeData}>
        Submit
      </button>
    </div>
  );
}
