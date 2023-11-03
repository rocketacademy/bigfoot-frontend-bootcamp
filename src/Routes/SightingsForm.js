import React, { useState } from "react";
import { useNavigate, createSearchParams } from 'react-router-dom';

//Tweak the logic in the frontend to show only the date and location properties of each sighting on the homepage 
//and date, location and notes properties of each sighting on sighting-specific pages

export function SightingsForm() {
  const navigate = useNavigate();
  const [formInfo, setFormInfo] = useState({
    year: '',
    month: '',
    sortBy: '',
    sortOrder: 'Ascending'
  });

  const formChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    setFormInfo((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  //handleSubmit function:
  //creates search params
  //navigates to SightingList

  const handleSubmit = (e) => {
    //e.preventDefault();
    const params = [
      ['year', formInfo.year],
      ['month', formInfo.month],
      ['sortBy', formInfo.sortBy],
      ['sortOrder', formInfo.sortOrder]
    ];
    setFormInfo({
      year: '',
      month: '',
      sortBy: '',
      sortOrder: 'Ascending'
    });
    navigate({
      pathname: '/sightings',
      search: `?${createSearchParams(params)}`
    })
  }


  return (
    <div>
      <form method='post' id='sighting-filters' className='flex flex-col bg-gray-300 border-black border-2'>
        <input
          className='border-black border-2'
          placeholder="Year"
          type="text"
          name="year"
          id="year"
          value={formInfo.year}
          onChange={(e) => {
            formChange(e);
          }}
        />
        <input
          className='border-black border-2'
          placeholder='Month'
          name="month"
          list="months"
          id="month"
          value={formInfo.month}
          onChange={(e) => {
            formChange(e);
          }}
        />
        <datalist id="months">
          <option value=''></option>
          <option value='January'></option>
          <option value='February'></option>
          <option value='March'></option>
          <option value='April'></option>
          <option value='May'></option>
          <option value='June'></option>
          <option value='July'></option>
          <option value='August'></option>
          <option value='September'></option>
          <option value='October'></option>
          <option value='November'></option>
          <option value='December'></option>
        </datalist>
        <input
          className='border-black border-2'
          placeholder="Sort by"
          type="text"
          name="sortBy"
          id="sortBy"
          value={formInfo.sortBy}
          onChange={(e) => {
            formChange(e);
          }}
        />
        <input
          className='border-black border-2'
          placeholder='Sort Order'
          name="sortOrder"
          list="sortOptions"
          id="sortOrder"
          value={formInfo.sortAsc}
          onChange={(e) => {
            formChange(e);
          }}
        />
        <datalist id="sortOptions">
          <option value='Ascending'></option>
          <option value='Descending'></option>
        </datalist>
        <button onClick={() => handleSubmit()}>Retrieve sightings</button>
      </form>

    </div>
  );
}

//onChange={(e) => { this.handleGuessChange(e) }}
//form will have filter parameters YEAR(entry), SEASON(dropdown), MONTH(dropdown)
//probably want to have a chart for year
//when we submit a form, handleSubmit function triggers setSearchParams which updates URL
//handleSubmit should also submit the filter parameters to backend through the URL of axios.get(URL)
//backend should filter the JSON based on the unpacked filter parameters