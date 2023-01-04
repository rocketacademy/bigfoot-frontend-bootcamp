import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "./constants";

export default function SightingInfo() {
  const { sightingID } = useParams();
  const [selectedSighting, setSelectedSighting] = useState({});
  console.log(sightingID);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/sightings/${sightingID}`).then((response) => {
      setSelectedSighting(response.data);
      console.log(response.data);
    });
  }, [sightingID]);

  const {
    YEAR,
    TIME_AND_CONDITIONS,
    STATE,
    SEASON,
    REPORT_NUMBER,
    REPORT_CLASS,
    OTHER_WITNESSES,
    OTHER_STORIES,
    OBSERVED,
    NEAREST_TOWN,
    NEAREST_ROAD,
    MONTH,
    LOCATION_DETAILS,
    ENVIRONMENT,
    DATE,
    COUNTY,
    ALSO_NOTICED,
  } = selectedSighting;

  return (
    <div className="Sighting-details">
      <h1>Sighting Details</h1>
      <p>
        <h3>Class:</h3> {REPORT_CLASS}
      </p>
      <p>
        <h3>Report Number:</h3>
        {REPORT_NUMBER}
      </p>

      <p>
        <h3>Date Sighted:</h3> {DATE} {MONTH} {YEAR}, {SEASON}
      </p>
      <p>
        <h3>Location:</h3> {COUNTY}, {STATE}
      </p>
      <p>
        <h3>Location Details:</h3>
        {LOCATION_DETAILS}
      </p>
      <p>
        <h3>Time and Conditions:</h3> {TIME_AND_CONDITIONS}
      </p>
      <p>
        <h3>Environment:</h3> {ENVIRONMENT}
      </p>
      <p>
        <h3>Witness Account:</h3> {OBSERVED}
      </p>
      <p>
        <h3>Other Witness:</h3> {OTHER_WITNESSES}
      </p>
      <p>
        <h3>Other Witness Account:</h3> {OTHER_STORIES}
      </p>
    </div>
  );
}
