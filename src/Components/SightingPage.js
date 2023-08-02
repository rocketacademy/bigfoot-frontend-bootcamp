import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import { BACKEND_URL } from "../constants";

const SightingPage = (props) => {
  const [selectedSighting, setSelectedSighting] = useState([]);
  let { sightingId } = useParams(); // get selected sightingIndex from url params as this persist after user refreshes page
  const navigate = useNavigate();

  const getSingleSightingData = async () => {
    const data = await axios.get(`${BACKEND_URL}/${sightingId}`);

    setSelectedSighting(data.data);
  };

  useEffect(() => {
    getSingleSightingData();
  });

  const selectedSightingList = (
    // render list of sighting
    <li>
      Date:
      <br />
      {selectedSighting.date}
      {/* {selectedSighting.YEAR}, {selectedSighting.STATE} */}
      {/* <br />
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
      <br /> */}
      <br />
      <br />
      Location: <br />
      {selectedSighting.location}
      <br />
      <br />
      Notes: <br />
      {selectedSighting.notes}
    </li>
  );

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/sightings");
        }}
      >
        {" "}
        Back
      </Button>{" "}
      <Button
        variant="contained"
        onClick={() => {
          navigate(`/sightings/${sightingId}/edit`);
        }}
      >
        {" "}
        Edit
      </Button>
      <ul className="sighting-list">{selectedSightingList}</ul>
    </div>
  );
};

export default SightingPage;
