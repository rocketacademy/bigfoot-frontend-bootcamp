import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";

const SightingPage = (props) => {
  const [selectedSighting, setSelectedSighting] = useState([]);
  let { sightingIndex } = useParams(); // get selected sightingIndex from url params as this persist after user refreshes page
  const navigate = useNavigate();

  const getSingleSightingData = async () => {
    const data = await axios.get(
      `http://localhost:3000/sightings/${sightingIndex}`
    );

    setSelectedSighting(data.data);
  };

  useEffect(() => {
    getSingleSightingData();
    return;
  }, []);

  const selectedSightingList = (
    // render list of sighting
    <li>
      {selectedSighting.YEAR}, {selectedSighting.STATE}
      <br />
      <br />
      Season: {selectedSighting.SEASON}
      <br />
      County: {selectedSighting.COUNTY}
      <br />
      Location Details: {selectedSighting.LOCATION_DETAILS}
      <br />
      Other Witnesses: {selectedSighting.OTHER_WITNESSES}
      <br />
      Time and Conditions: {selectedSighting.TIME_AND_CONDITIONS}
      <br />
      Report Number: {selectedSighting.REPORT_NUMBER}
      <br />
      Report Class: {selectedSighting.REPORT_CLASS}
      <br />
    </li>
  );

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          navigate(-1);
        }}
      >
        {" "}
        Back
      </Button>
      <ul className="sighting-list">{selectedSightingList}</ul>
    </div>
  );
};

export default SightingPage;
