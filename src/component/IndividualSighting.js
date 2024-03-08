import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../constants";

const IndividualSighting = () => {
  const [sightings, setSightings] = useState([]);
  const { sightingId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (sightingId) {
      axios.get(`${BACKEND_URL}/sightings/${sightingId}`).then((response) => {
        setSightings(response.data);
      });
    }
  }, [sightingId]);

  // const sightingInfo = [];
  // const keys = Object.keys(sightings);
  // keys.forEach((key, index) => {
  //   sightingInfo.push(`${index}: ${sightings[key]}`);
  // });

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <button
          type="submit"
          className="bg-transparent border border-blue-500 py-2 px-4 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white rounded mb-6"
          onClick={() => navigate(-1)}
        >
          Back to homepage
        </button>
      </div>

      <div className="grid grid-cols-1 text-center text-justify px-48 space-between flex flex-col space-y-4">
        <p>{`Report number: ${sightings.REPORT_NUMBER}`}</p>
        <p>{`Season: ${sightings.SEASON}`}</p>
        <p>{`State: ${sightings.STATE},  ${sightings.COUNTY}`}</p>
        <p>{`Conditions: ${sightings.TIME_AND_CONDITIONS}`}</p>
        <p>{`Observed: ${sightings.OBSERVED}`}</p>
      </div>
    </>
  );
};

export default IndividualSighting;
