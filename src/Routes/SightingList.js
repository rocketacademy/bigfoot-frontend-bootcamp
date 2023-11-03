import React, { useEffect, useState } from "react";
import axios from 'axios';
import {Link, useSearchParams} from 'react-router-dom';
import {BACKEND_URL} from '../constants.js';

//Tweak the logic in the frontend to show only the date and location properties of each sighting on the homepage 
//and date, location and notes properties of each sighting on sighting-specific pages

export function SightingList() {
  const [sightings, setSightings] = useState([])
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => { //async returns a promise
    const searchString= searchParams.toString()
    const getSightings = async () => {
      //query the backend(axios.get) and setSightings
      const response = await axios.get(`${BACKEND_URL}/sightings?`
      //+searchString
      )
      setSightings(response.data)
    }
    getSightings()
  }, [])

  //render basic sighting info
  const sightingsRows = sightings.map((ele) =>
    <tr key={`sighting ${ele.id}`} className='text-black bg-green-300'>
      <td>{ele.id ? ele.id : ''}</td>
      <td>{ele.year ? ele.year : '-'}</td>
      <td>{ele.month ? ele.month : '-'}</td>
      <td>{ele.location ? ele.location : '-'}</td>
      <td><Link to={`/sightings/${ele.id}`}> Link </Link></td>
    </tr>
  )
  return (
    <table>
    {console.log(sightings)}
      <tbody>
        <tr className='bg-blue-300'>
          <th>Index</th>
          <th>Year</th>
          <th>Month</th>
          <th>Location</th>
          <th>Details</th>
        </tr>
        {sightingsRows}
      </tbody>
    </table>
  );
}

//form will have filter parameters YEAR(entry), SEASON(dropdown), MONTH(dropdown)
//probably want to have a chart for year
//when we submit a form, handleSubmit function triggers setSearchParams which updates URL
//handleSubmit should also submit the filter parameters to backend through the URL of axios.get(URL)
//backend should filter the JSON based on the unpacked filter parameters