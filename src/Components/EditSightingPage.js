import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import EditSightingForm from "./EditSightingForm";
import { BACKEND_URL } from "../constants";

const EditSightingPage = () => {
  const [data, setData] = React.useState(null);

  let { sightingId } = useParams(); // get selected sightingIndex from url params as this persist after user refreshes page

  const getSingleSightingData = async () => {
    // console.log("get data");

    // console.log(`${BACKEND_URL}/${sightingId}`);
    const data = await axios.get(`${BACKEND_URL}/${sightingId}`);

    setData({
      date: data.data.date.substring(0, 16),
      location: data.data.location,
      notes: data.data.notes,
    });
  };

  useEffect(() => {
    console.log("get data");
    getSingleSightingData();
    return;
  }, []);

  return data ? (
    <EditSightingForm data={data} sightingId={sightingId} />
  ) : (
    "Loading"
  );
};

export default EditSightingPage;
