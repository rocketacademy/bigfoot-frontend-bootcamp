import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewSighting = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [newSightingId, setnewSightingId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSightingData = {
      date,
      location,
      notes,
    };

    axios.post('http://localhost:3000/sightings', newSightingData)
      .then(response => {
        setnewSightingId(response.data.id);
        setDate('');
        setLocation('');
        setNotes('');
        window.alert('Sighting data successfully submitted!');
        navigate(`/sightings/${newSightingId}`);
      })
      .catch(error => {
        window.alert('Error submitting sighting data:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="notes">Notes:</label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default NewSighting;