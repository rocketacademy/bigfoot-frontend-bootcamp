import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../constants";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const SightingList = () => {
  const navigate = useNavigate();
  const [yearFilterInput, setYearFilterInput] = useState(0);
  const [monthFilterInput, setMonthFilterInput] = useState(0);
  const [seasonFilterInput, setSeasonFilterInput] = useState(0);
  const [yearSortInput, setYearSortInput] = useState(false);
  const [stateSortInput, setStateSortInput] = useState(false);

  const [sightings, setSightings] = useState([]);

  const getSightingData = async () => {
    const data = await axios.get(
      `${BACKEND_URL}/sightings/filter/${yearFilterInput}/${monthFilterInput}/${seasonFilterInput}/sort/${
        yearSortInput ? 1 : 0
      }/${stateSortInput ? 1 : 0}`
    );

    setSightings(data.data);
  };

  useEffect(() => {
    getSightingData();
    return;
  }, []);

  const sightingList =
    // render list of sighting
    sightings.map((sighting, ind) => {
      return (
        <li key={ind}>
          <Link
            to={`/sightings/${ind}`}
          >{`${sighting.YEAR}, ${sighting.MONTH}, ${sighting.SEASON}, ${sighting.STATE}`}</Link>
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
          // placeholder="Year"
        />{" "}
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
      {console.log(sightings)}
      [Filter]
      {filterInput(yearFilterInput, setYearFilterInput, "Year")}
      {filterInput(monthFilterInput, setMonthFilterInput, "Month")}
      {filterInput(seasonFilterInput, setSeasonFilterInput, "Season")}
      <FormControl component="fieldset" variant="standard">
        <br />
        [Sort] {sortInput(yearSortInput, setYearSortInput, "Year")}
        {sortInput(stateSortInput, setStateSortInput, "State")}
      </FormControl>
      <br />
      <Button
        type="submit"
        variant="contained"
        onClick={() => {
          getSightingData();
          // setYearFilterInput(0);
          // setMonthFilterInput(0);
          // setSeasonFilterInput(0);
        }}
      >
        Get Data
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
      <ul className="sighting-list">{sightingList}</ul>
    </div>
  );
};

export default SightingList;
