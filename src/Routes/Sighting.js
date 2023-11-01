import React, { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";
import {Link} from 'react-router-dom';
import { Routes, Route, useParams } from 'react-router-dom';
import {BACKEND_URL} from '../constants.js';

//retrieve individual sighting 
// sighting structure: [
//   {
//     "YEAR": "Early 1990's",
//     "SEASON": "Fall",
//     "STATE": "Alaska",
//     "COUNTY": "Valdez-Chitina-Whittier County",
//     "LOCATION_DETAILS": "East side of Prince William Sound",
//     "OBSERVED": "Ed L. was salmon fishing with a companion in Prince William Sound. After anchoring off shore, his companion took a small boat up a river to check on the state of the salmon run. As the day wore on toward evening and he didn't come back at the expected time, Ed scanned upriver and across the adjacent land with binoculars. There he saw a sasquatch walking across the tundra, with long, smooth steps and with dark hair flowing from its shoulders, bouncing behind \"like a cape\" at every step. The sasquatch paid no attention to the boat (distance about 1,000').",
//     "OTHER_WITNESSES": "On a commercial fishing boat at anchor at the mouth of one of the rivers discharging into the bay.",
//     "TIME_AND_CONDITIONS": "Early Fall, in the early 1990's.",
//     "REPORT_NUMBER": "1261",
//     "REPORT_CLASS": "Class A"
//   },]


export function Sighting() {
    const {sightingIndex} = useParams()
    const [sightingInfo, setSightingInfo] = useState({})

    useEffect(() => { //async returns a promise -- I should convert this to a loader function
        const getSightings = async () => {
          //query the backend(axios.get) and setSightings
          if (sightingIndex) {
          const response = await axios.get(`${BACKEND_URL}/sightings/${sightingIndex}`)
          setSightingInfo(response.data)
        }}
        getSightings()
      }, [])
    
      //render basic sighting info
      const sightingData = sightingInfo ? Object.keys(sightingInfo).map((key) =>
        <tr key={`${sightingIndex}-${key}`} className='text-black bg-green-300'>
          <td>{key}</td>
          {console.log(key)}
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
   </div>
  );
}
