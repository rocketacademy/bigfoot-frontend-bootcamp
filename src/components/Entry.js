import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Paper } from '@mui/material';
import axios from 'axios';
import BACKEND_URL from './constant';
import { useNavigate } from "react-router-dom";

function Entry() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSubmit = async (e) => {
    // Prevent default form redirect on submission
    e.preventDefault();
    // console.log('Name:', name);
    // console.log('Location:', location);
    // console.log('Description:', description);
    // console.log('Selected Date:', selectedDate);
    // console.log('Submitted Date:',getCurrentDateTime())
    // Send request to create new sighting in backend
    axios
      .post(`${BACKEND_URL}/sightings`, {
        selectedDate,
        location,
        description,
        timestamp: getCurrentDateTime(),
      })
      .then((res) => {
        // Clear form state
        setSelectedDate("");
        setLocation("");
        setDescription("");

        // Navigate to sighting-specific page after submitting form
        navigate(`/sightings/${res.data.id}`);
      });
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <div className="entry-form">
    <Container >
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <h1>Bigfoot Sightings Form</h1>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    fullWidth
                    value={name}
                    onChange={handleNameChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Location"
                    fullWidth
                    value={location}
                    onChange={handleLocationChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Select a Date"
                    type="datetime-local"
                    fullWidth
                    value={selectedDate}
                    onChange={handleDateChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
    </div>
  );
}

export default Entry;
