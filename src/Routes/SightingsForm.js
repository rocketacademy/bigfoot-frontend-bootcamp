import React, {useState} from "react";
import {useNavigate, createSearchParams} from 'react-router-dom';

export function SightingsForm() {
    const navigate = useNavigate();
    const [formInfo, setFormInfo] = useState({
        year:'',
        season:'',
        month:'',
        sortBy:'',
        sortOrder:'Ascending'
    });

    const formChange = (e) => {
        const name = e.target.id;
        const value = e.target.value;
        setFormInfo((prevState) => {
          return { ...prevState, [name]: value };
        });
      };

    const handleSubmit = (e) => {
        //e.preventDefault();
        const params = [
            ['year', formInfo.year],
            ['season', formInfo.season],
            ['month', formInfo.month],
            ['sortBy', formInfo.sortBy],
            ['sortOrder', formInfo.sortOrder]
        ];
        setFormInfo({
            year: '',
            season: '',
            month: '',
            sortBy:'',
            sortOrder:'Ascending'
        });
        navigate({
            pathname: 'sightings',
            search: `?${createSearchParams(params)}`
    })
    }
    
    //handleSubmit function:
    //creates search params
    //navigates to SightingList
  return (
    <div>
    <form method='post' id='sighting-filters'>
        <input
          placeholder="Year"
          type="text"
          name="year"
          id="year"
          value = {formInfo.year}
          onChange={(e) => {
            formChange(e);
          }}
        />
        <input
          name="season"
          list="seasons"
          id="season"
          value = {formInfo.season}
          onChange={(e) => {
            formChange(e);
          }}
        />
        <datalist id="seasons">
            <option value=''></option>
            <option value='Spring'></option>
            <option value='Summer'></option>
            <option value='Fall'></option>
            <option value='Winter'></option>
        </datalist>
        <input
          name="month"
          list="months"
          id="month"
          value = {formInfo.month}
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
          placeholder="Sort by"
          type="text"
          name="sortBy"
          id="sortBy"
          value = {formInfo.sortBy}
          onChange={(e) => {
            formChange(e);
          }}
        />
        <input
          name="sortOrder"
          list="sortOptions"
          id="sortOrder"
          value = {formInfo.sortAsc}
          onChange={(e) => {
            formChange(e);
          }}
        />
        <datalist id="sortOptions">
            <option value='Ascending'></option>
            <option value='Descending'></option>
        </datalist>
        <button onClick = {()=>handleSubmit()}>Retrieve sightings</button>
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