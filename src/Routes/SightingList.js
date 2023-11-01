import React, { useEffect, useState } from "react";
import axios from 'axios';
import {Link, useSearchParams, useLoaderData} from 'react-router-dom';
import {BACKEND_URL} from '../constants.js';

export async function loader({ request }) {
  const queryString = request.url.split('?')[1];
  console.log(`${BACKEND_URL}/sightings`+queryString)
  //actually consider parsing the url and using that value to query backend
  //console.log(url.searchParams)
  //const sightingsFilter = url.searchParams.get("somestuff"); // need some edits here

  const sightings = []
  //const sightings = await axios.get(`${BACKEND_URL}/sightings`) // need to setup the backend and adjust this later
  return { sightings };
}

export function SightingList() {
  //const { sightings } = useLoaderData();
  const [sightings, setSightings] = useState([])
  let [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams.toString())
  // for (const [key, value] of searchParams.entries()) {
  //   console.log(`${key}, ${value}`);
  // }
  useEffect(() => { //async returns a promise
    const searchString= searchParams.toString()
    const getSightings = async () => {
      //query the backend(axios.get) and setSightings
      const response = await axios.get(`${BACKEND_URL}/sightings?`+searchString)
      setSightings(response.data)
    }
    getSightings()
  }, [])

  //render basic sighting info
  const sightingsRows = sightings.map((ele, index) =>
    <tr key={`sighting ${index}`} className='text-black bg-green-300'>
      <td>{index}</td>
      <td>{ele.YEAR ? ele.YEAR : '-'}</td>
      <td>{ele.SEASON ? ele.SEASON : '-'}</td>
      <td>{ele.MONTH ? ele.MONTH : '-'}</td>
      <td><Link to={`/sightings/${index}`}> Link </Link></td>
    </tr>
  )
  return (
    <table>
    {console.log(sightings)}
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