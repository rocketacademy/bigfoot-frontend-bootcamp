import React, { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";
import {Link, useSearchParams} from 'react-router-dom';
import {BACKEND_URL} from '../constants.js';

export function SightingList() {
  const [sightings, setSightings] = useState([])
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => { //async returns a promise
    const getSightings = async () => {
      //query the backend(axios.get) and setSightings
      const response = await axios.get(`${BACKEND_URL}/sightings`)
      setSightings(response.data)
    }
    getSightings()
  }, [])

  //render basic sighting info
  const sightingsRows = sightings.map((ele, index) =>
    <tr key={`sighting ${index}`} className='text-black bg-green-300'>
      <td>{index}</td>
      {console.log(ele)}
      <td>{ele.YEAR ? ele.YEAR : '-'}</td>
      <td>{ele.SEASON ? ele.SEASON : '-'}</td>
      <td>{ele.MONTH ? ele.MONTH : '-'}</td>
      <td><Link to={`sightings/${index}`}> Link </Link></td>
    </tr>
  )
  return (
    <table>
      <tbody>
        <tr className='bg-blue-300'>
          <th>Index</th>
          <th>Year</th>
          <th>Season</th>
          <th>Month</th>
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