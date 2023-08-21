import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";

import { BACKEND_URL } from "../constants";

const SightingList = () => {
  const navigate = useNavigate();
  const [yearFilterInput, setYearFilterInput] = useState(0);
  const [monthFilterInput, setMonthFilterInput] = useState(0);
  const [seasonFilterInput, setSeasonFilterInput] = useState(0);
  const [yearSortInput, setYearSortInput] = useState(false);
  const [stateSortInput, setStateSortInput] = useState(false);
  const [sightings, setSightings] = useState([]);

  const getSightingData = async () => {
    const data = await axios.get(`${BACKEND_URL}/sightings`);

    setSightings(data.data);
  };

  useEffect(() => {
    getSightingData();
    return;
  }, [
    yearFilterInput,
    monthFilterInput,
    seasonFilterInput,
    yearSortInput,
    stateSortInput,
  ]);

  const sightingList =
    // render list of sighting in cards
    sightings.map((sighting, ind) => {
      return (
        <li key={ind}>
          <Card sx={{ minWidth: "40vw", margin: "3px" }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {/* {sighting.YEAR}, {sighting.MONTH} */}
                {sighting.date}
              </Typography>
              <Typography variant="h5" component="div">
                {/* {sighting.STATE} */}
              </Typography>
              <Typography variant="h6">{sighting.SEASON}</Typography>
              <Typography variant="body2">
                {/* {sighting.LOCATION_DETAILS
                  ? sighting.LOCATION_DETAILS.substring(0, 20) + "..."
                  : null} */}
                {sighting.location
                  ? sighting.location.substring(0, 20) + "..."
                  : null}
              </Typography>
            </CardContent>

            <CardActions>
              <Button
                size="small"
                onClick={() => navigate(`/sightings/${sighting.id}`)}
              >
                Learn more
              </Button>
            </CardActions>
          </Card>
        </li>
      );
    });

  const filterInput = (state, setStateFunc, FilterName) => {
    return (
      <div>
        {FilterName} :{" "}
        <input
          className="review-input"
          type="text"
          value={state === 0 ? "" : state}
          onChange={(e) => {
            setStateFunc(e.target.value);
          }}
        />
      </div>
    );
  };

  const sortInput = (state, setStateFunc, SortName) => {
    return (
      <FormControlLabel
        control={
          <Switch
            checked={state}
            onChange={(e) => {
              setStateFunc(!state);
            }}
          />
        }
        label={SortName}
      />
    );
  };

  return (
    <div>
      Filter
      {filterInput(yearFilterInput, setYearFilterInput, "Year")}
      {filterInput(monthFilterInput, setMonthFilterInput, "Month")}
      {filterInput(seasonFilterInput, setSeasonFilterInput, "Season")}
      <FormControl component="fieldset" variant="standard">
        <br />
        Sort {sortInput(yearSortInput, setYearSortInput, "Year")}
        {sortInput(stateSortInput, setStateSortInput, "State")}
      </FormControl>
      <br />
      <br />
      <Button
        variant="contained"
        onClick={() => {
          navigate("/");
        }}
      >
        Back
      </Button>
      <br />
      <br />
      <Button
        type="submit"
        variant="outlined"
        onClick={() => {
          setYearFilterInput(0);
          setMonthFilterInput(0);
          setSeasonFilterInput(0);
          setYearSortInput(false);
          setStateSortInput(false);
        }}
      >
        Reset Filter/Sort
      </Button>
      <ul className="sighting-list">{sightingList}</ul>
    </div>
  );
};

export default SightingList;
