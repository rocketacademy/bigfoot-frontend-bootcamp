import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import EditSightingForm from "./EditSightingForm";
import Button from "@mui/material/Button";

import { BACKEND_URL } from "../constants";

const EditSightingPage = () => {
  const [data, setData] = React.useState(null);
  const navigate = useNavigate();

  let { sightingId } = useParams(); // get selected sightingIndex from url params as this persist after user refreshes page

  const getSingleSightingData = async () => {
    // console.log("get data");

    // console.log(`${BACKEND_URL}/${sightingId}`);
    const data = await axios.get(`${BACKEND_URL}/${sightingId}`);

    setData({
      date: data.data.date.substring(0, 16),
      location: data.data.location_discription,
      notes: data.data.notes,
      city: data.data.city,
      country: data.data.country,
    });
  };

  useEffect(() => {
    console.log("get data");
    getSingleSightingData();
    return;
  }, []);

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
      {data ? (
        <EditSightingForm data={data} sightingId={sightingId} />
      ) : (
        "Loading"
      )}
    </div>
  );
};

export default EditSightingPage;
