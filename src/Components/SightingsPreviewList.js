import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import SightingPreview from './SightingPreview';
import { BACKEND_URL } from '../constants.js';
import { Divider, Paper, TextField } from '@mui/material';
import { Button } from 'react-bootstrap';

const SightingPreviewList = () => {
  const [sightings, setSightings] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (inputValue === '')
      axios.get(`${BACKEND_URL}/sightings`).then((response) => {
        setSightings(response.data);
        console.log(response.data[0].MONTH);
      });
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    setSightings([]);
    const filteredResults = sightings.filter(
      (sighting) => sighting.YEAR === inputValue,
    );

    setSightings(filteredResults);
  };

  const handleSortAscending = () => {
    const sortedData = [...sightings].sort(function (a, b) {
      try {
        const regex = /\b\d{4}/;
        const inputYearA = a.YEAR.match(regex)[0];
        const inputYearB = b.YEAR.match(regex)[0];
        return inputYearA - inputYearB;
      } catch (err) {}
    });
    setSightings(sortedData);
  };

  const handleSortDescending = () => {
    const sortedData = [...sightings].sort((a, b) => b.YEAR - a.YEAR);

    setSightings(sortedData);
  };

  const sightingPreviews = sightings.map((sighting, index) => (
    <Link to={`/sightings/${index}`} key={index}>
      <SightingPreview data={sighting} />
      <Divider />
    </Link>
  ));

  return (
    <div>
      <Button onClick={handleSortAscending}>Sort by ascending year</Button>
      <Button onClick={handleSortDescending}>Sort by descending year</Button>

      <TextField
        label="filter"
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
      />

      <Button onClick={handleButtonClick}>Filter</Button>
      {sightingPreviews}
      {/* {!filteredState ? sightingPreviews : null} */}
    </div>
  );
};

export default SightingPreviewList;
