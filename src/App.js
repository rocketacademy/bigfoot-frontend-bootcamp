import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Background from './Images/d4829c8b0612ce3fd346e36881771d12.jpg';

////////////////-----------COMPONENTS-----------////////////////
import Header from './Components/Header';
import CreateButton from './Components/CreateButton';
import CreateComment from './Components/CreateComment';
import EditButton from './Components/EditButton';

export default function App() {
  //state to store array
  const BIGFOOTAPI = process.env.REACT_APP_DATABASE_URL;
  const [sightings, setSightings] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseSighting = await axios.get(`${BIGFOOTAPI}/sightings`);
        const responseComments = await axios.get(`${BIGFOOTAPI}/comments`);
        setSightings(responseSighting.data);
        setComments(responseComments.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [BIGFOOTAPI]);

  const deleteData = async (id) => {
    try {
      const postIdToDelete = id;
      await axios.delete(`${BIGFOOTAPI}/comments/${postIdToDelete}`);
      const responseComments = await axios.get(`${BIGFOOTAPI}/comments`);
      setComments(responseComments.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="w-full" style={{ backgroundImage: `url(${Background})` }}>
      <CreateButton />
      <Header />
      {sightings.map((sighting) => (
        <>
          <div
            key={sighting.id}
            className="bg-slate-500 hover:bg-slate-300 text-gray-800 font-bold py-2 px-4 border-b-4 border-t-2 border-x-4 border-slate-700 hover:border-slate-500 rounded p-[10px] mx-[50px] mt-[50px] font-bold text-black w-50 font-slate-300"
          >
            {console.log(sighting)}
            <p>Location: {sighting.location}</p>
            <p>Date: {sighting.date.slice(0, 10)}</p>
            <p>Description: {sighting.notes}</p>
          </div>
          <CreateComment propsId={sighting.id} />
          {comments
            .filter((comment) => comment.sightingId === sighting.id)
            .map((comment) => (
              <div
                key={comment.sightingId === sighting.id}
                className="bg-slate-300 text-gray-800 font-bold py-2 px-4 border-b-4 border-t-2 border-x-4 border-slate-700 rounded p-[10px] mx-[50px] font-bold text-black w-50 font-slate-300 flex flex-row justify-between"
              >
                <div>
                  <p>{comment.content}</p>
                  <p>Date: {comment.createdAt.slice(0, 10)}</p>
                </div>
                <div className="">
                  <EditButton
                    propsId={comment.id}
                    propsContent={comment.content}
                  />
                  <button onClick={() => deleteData(comment.id)}>Delete</button>
                </div>
              </div>
            ))}
        </>
      ))}
    </div>
  );
}
