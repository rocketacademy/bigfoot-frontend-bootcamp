import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import { SightingsContext } from "../../contexts/SightingsProvider";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function SightingComposer() {
  const [formInputs, setFormInputs] = useState({
    date: "",
    location: "Your house",
    notes: "You looked into the mirror.... IT'S YOU!",
  });

  const [categoryInputs, setCategoryInputs] = useState([]);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      let response = await axios.get(`${BACKEND_URL}/categories`);
      setOptions(response.data);
    };
    fetchOptions();
  }, []);

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

  const handleCategoryChange = (e) => {
    const {
      target: { value },
    } = e;
    setCategoryInputs(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(`${BACKEND_URL}/sightings`, {
        date: formInputs.date,
        location: formInputs.location,
        notes: formInputs.notes,
        categories: categoryInputs,
      });

      console.log(response.data);

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
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="category">Category</InputLabel>
          <Select
            labelId="category"
            id="category-chooser"
            required
            multiple
            value={categoryInputs}
            onChange={handleCategoryChange}
            input={<OutlinedInput label="Category" />}
            MenuProps={MenuProps}
          >
            {options.map((option) => (
              <MenuItem key={option.name} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
      <pre>{JSON.stringify(formInputs, null, 2)}</pre>
      <pre>{JSON.stringify(categoryInputs, null, 2)}</pre>
    </form>
  );
}

export default SightingComposer;
