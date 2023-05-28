import { Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { BACKEND_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import { SightingsContext } from "../../contexts/SightingsProvider";

function SightingComposer() {
  const [formInputs, setFormInputs] = useState({
    date: "",
    location: "Your house",
    notes: "You looked into the mirror.... IT'S YOU!",
  });

  const navigate = useNavigate();
  const sightingsContext = useContext(SightingsContext);

  const handleChange = (e) => {
    setFormInputs((prevInputs) => {
      return {
        ...prevInputs,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(`${BACKEND_URL}/sightings`, {
        date: formInputs.date,
        location: formInputs.location,
        notes: formInputs.notes,
      });

      console.log(response);

      navigate(`/sightings/${response.data?.sighting?.id}`);
      sightingsContext.updateSightingsContext();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} py={2} alignItems={"flex-start"}>
        <TextField
          required
          name="location"
          label="Location"
          variant="outlined"
          size="small"
          value={formInputs.location}
          onChange={handleChange}
          helperText="Where did you see the Bigfoot?"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          required
          name="date"
          label="Date"
          type="datetime-local"
          variant="outlined"
          size="small"
          value={formInputs.date}
          onChange={handleChange}
          helperText="When did you see the Bigfoot?"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          required
          name="notes"
          label="Notes"
          variant="outlined"
          size="small"
          value={formInputs.notes}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          helperText="Tell us about the Bigfoot encounter!"
          InputLabelProps={{ shrink: true }}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
    </form>
  );
}

export default SightingComposer;
