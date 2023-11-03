import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, useLoaderData} from 'react-router-dom';
import {BACKEND_URL} from '../constants.js';


export function RegisterSighting() {
  const navigate = useNavigate();
  const postData = useLoaderData(); // if this doesn't work try useParams
  const [formInfo, setFormInfo] = useState({
    //initialize with values from post;
    date: postData ? postData.data.date.toLocaleString().slice(0,-1) : null, // YYYY-MM-DDTHH:mm:ss.sssZ is stored but input box only accepts YYYY-MM-DDTHH:mm:ss.sss
    location: postData ? postData.data.location : null,
    notes: postData ? postData.data.notes : null,
  });
  console.log(postData.data.date.toLocaleString().slice(0,-1))
  //useEffect to load post info... or loader?

  const formChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    setFormInfo((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = null;
    if (!postData) {
     response = await axios.post(`${BACKEND_URL}/sightings/`,formInfo)
} else {
     response = await axios.put(`${BACKEND_URL}/sightings/${postData.data.id}`, formInfo)
}
    console.log(response)
    const newID = response.data.sighting.id;
    
      setFormInfo({
          date: '',
          location: '',
          notes: '',
      });
      navigate(`../sightings/${newID}`)
  }


  return (
    <div>
    {postData ? `Edit Sighting ID:${postData.data.id}` : 'Create Sighting'}
      <form id='new-sighting' className='flex flex-col bg-gray-300 border-black border-2'>
        <input
          className='border-black border-2'
          placeholder="Date"
          type="datetime-local"
          name="date"
          id="date"
          value={formInfo.date}
          onChange={(e) => {
            formChange(e);
          }}
        />
        <input
          className='border-black border-2'
          placeholder="Location"
          type="text"
          name="location"
          id="location"
          value={formInfo.location}
          onChange={(e) => {
            formChange(e);
          }}
        />
        <input
          className='border-black border-2'
          placeholder='Notes'
          name="notes"
          type='text'
          id="notes"
          value={formInfo.notes}
          onChange={(e) => {
            formChange(e);
          }}
        />
        <button onClick={(e) => handleSubmit(e)}>{postData ? `Edit Sighting` : 'Post Sighting'}</button>
      </form>
    </div>
  );
}