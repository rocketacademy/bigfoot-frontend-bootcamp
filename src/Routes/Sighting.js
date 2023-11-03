import React, { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";
import {Link} from 'react-router-dom';
import { Routes, Route, useParams } from 'react-router-dom';
import {BACKEND_URL} from '../constants.js';

// {
//   "id": 1,
//   "date": "1990-09-30T16:00:00.000Z",
//   "location": "East side of Prince William Sound, Alaska, USA",
//   "notes": "Ed L. was salmon fishing with a companion in Prince William Sound. After anchoring off shore, his companion took a small boat up a river to check on the state of the salmon run. As the day wore on toward evening and he didn't come back at the expected time, Ed scanned upriver and across the adjacent land with binoculars. There he saw a sasquatch walking across the tundra, with long, smooth steps and with dark hair flowing from its shoulders, bouncing behind \"like a cape\" at every step. The sasquatch paid no attention to the boat (distance about 1,000').",
//   "createdAt": "2023-10-30T07:56:44.706Z",
//   "updatedAt": "2023-10-30T07:56:44.706Z"
// }

export function Sighting() {
    const {id} = useParams()
    const [sightingInfo, setSightingInfo] = useState({})

    useEffect(() => { //async returns a promise -- I should convert this to a loader function
        const getSightings = async () => {
          //query the backend(axios.get) and setSightings
          if (id) {
          const response = await axios.get(`${BACKEND_URL}/sightings/${id}`)
          setSightingInfo(response.data)
        }}
        getSightings()
      }, [])
    
      //render basic sighting info
      const sightingData = sightingInfo ? Object.keys(sightingInfo).map((key) =>
        <tr key={`sighting${id}-${key}`} className='text-black bg-green-300'>
          <td>{key}</td>
          <td>{sightingInfo[key]}</td>
        </tr>
      ) : null

  return (
   <div>
    <Link to={`/`}> Home </Link>
    <table>
    <tbody>
        <tr className='bg-blue-300'>
          <th>Circumstance</th>
          <th>Details</th>
        </tr>
        {sightingData}
      </tbody>
    </table>
    <Link to={`edit`}> Edit </Link>
   </div>
  );
}
