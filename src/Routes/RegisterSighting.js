import React, { useState, useEffect } from "react";
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';
import { useNavigate, useLoaderData} from 'react-router-dom';
import {BACKEND_URL} from '../constants.js';


export function RegisterSighting() {
  const navigate = useNavigate();
  const postData = useLoaderData(); // need to edit the loader data to get categories as well
  const [allCategories, setAllCategories] = useState([])
  const [formInfo, setFormInfo] = useState({
    //initialize with values from post;
    date: postData ? postData.data.date.toLocaleString().slice(0,-1) : null, // YYYY-MM-DDTHH:mm:ss.sssZ is stored but input box only accepts YYYY-MM-DDTHH:mm:ss.sss
    locationDescription: postData ? postData.data.locationDescription : null,
    notes: postData ? postData.data.notes : null,
    city: postData ? postData.data.city : null,
    country: postData ? postData.data.country : null,
    selectedCategories: [], //accommodate edit functionality later 
  });

  useEffect(() => {
    axios.get(`${BACKEND_URL}/categories`).then((response) => {
      setAllCategories(response.data);
    });
    // Only run this effect on component mount
  }, []);
  
  const categoryOptions = allCategories.map((category) => ({
    // value is what we store
    value: category.id,
    // label is what we display
    label: category.name,
  }));

  const formChange = (e) => {
    const name = e.target.id;
    const value = e.target.value; 
    setFormInfo((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSelectChange = (e) => {
    setFormInfo((prevState) => {
      return { ...prevState, selectedCategories: e };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = null;
    let formInfoWithCategoriesAsId = formInfo;
    formInfoWithCategoriesAsId.selectedCategoryIds = formInfo.selectedCategories.map((category)=>category.value)
    delete formInfoWithCategoriesAsId.selectedCategories;
    if (!postData) {
     response = await axios.post(`${BACKEND_URL}/sightings/`,formInfoWithCategoriesAsId)
} else {
     response = await axios.put(`${BACKEND_URL}/sightings/${postData.data.id}`, formInfoWithCategoriesAsId)
}
    console.log(response)
    const newID = response.data.sighting.id;
    
      setFormInfo({
          date: '',
          locationDescription: '',
          notes: '',
          city: '',
          country: '',
          selectedCategories: []
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
          placeholder="City"
          type="text"
          name="city"
          id="city"
          value={formInfo.city}
          onChange={(e) => {
            formChange(e);
          }}
        />
        <input
          className='border-black border-2'
          placeholder="Country"
          type="text"
          name="country"
          id="country"
          value={formInfo.country}
          onChange={(e) => {
            formChange(e);
          }}
        />
        <input
          className='border-black border-2'
          placeholder="Location"
          type="text"
          name="location"
          id="locationDescription"
          value={formInfo.locationDescription}
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
        {console.log(formInfo.selectedCategories)}
        <Select
          isMulti
          options={categoryOptions}
          value={formInfo.selectedCategories}
          onChange={(e)=>handleSelectChange(e)}
        />
        <button onClick={(e) => handleSubmit(e)}>{postData ? `Edit Sighting` : 'Post Sighting'}</button>
      </form>
    </div>
  );
}