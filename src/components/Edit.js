import React, { useEffect,useState } from 'react';
import { TextField, Button, Container, Grid, Paper } from '@mui/material';
import axios from 'axios';
import BACKEND_URL from './constant';
import { useNavigate , useParams} from "react-router-dom";


function Edit() {
  const [name, setName] = useState('');
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [sightingIndex, setSightingIndex] = useState();
  const [sighting, setSighting] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    // If there is a sightingIndex, retrieve the sighting data
    axios.get(`${BACKEND_URL}/sightings/${sightingIndex}/edit`).then((response) => {
      console.log(`SightingIndex: ${JSON.stringify(sightingIndex)}`);
      console.log(`Response: ${JSON.stringify(response)}`);
      console.log(`Data: ${JSON.stringify(response.data)}`);
      setSighting(response.data);
      setDate(formatDate(response.data.date));
      setLocation(response.data.location);
      setNotes(response.data.notes);
      setCity(response.data.city);
      setCountry(response.data.country);
    });

    // Only run this effect on change to sightingIndex
  },[sightingIndex]);

  // Update sighting index in state if needed to trigger data retrieval
  const params = useParams();
  if (sightingIndex !== params.sightingIndex) {
    setSightingIndex(params.sightingIndex);
    console.log(`SightingIndex: ${params.sightingIndex}`)
  }

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setNotes(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };
  
  const handleCountryChange = (event) => {
    setCountry(event.target.value);
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
      .put(`${BACKEND_URL}/sightings/${sightingIndex}/edit`, {
        date,
        location,
        notes,
        city,
        country,
      })
      .then((res) => {
        // Clear form state
        setDate("");
        setLocation("");
        setNotes("");
        setCity("");
        setCountry("");

        // Navigate to sighting-specific page after submitting form
        navigate(`/sightings/${sightingIndex}`);
      });
  };


  return (
    <div className="entry-form">
    <Container >
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <h1>Bigfoot Edit Sightings Form</h1>
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
                    placeholder={sighting && `${sighting.location}`}
                    onChange={handleLocationChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="City"
                    fullWidth
                    multiline
                    value={city}
                    placeholder={sighting && `${sighting.city}`}
                    onChange={handleCityChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Country"
                    fullWidth
                    multiline
                    value={country}
                    placeholder={sighting && `${sighting.country}`}
                    onChange={handleCountryChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    value={notes}
                    placeholder={sighting && `${sighting.notes}`}
                    onChange={handleDescriptionChange}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    label="Select a Date"
                    type="datetime-local"
                    fullWidth
                    value={date}
                    onChange={handleDateChange}
                    placeholder={sighting && `${sighting.date}`}
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

export default Edit;
