import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BACKEND_URL from "./constant";

import ComboBox from "./Form";
import SightingPreview from "../components/SightingPreview";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

const SightingPreviewList = () => {
  const [sightings, setSightings] = useState([]);
  const history = useNavigate();

  //1. Pulling all sightings from server
  useEffect(() => {
    axios.get(`${BACKEND_URL}/sightings`).then((response) => {
      setSightings(response.data);
    });
    // Only run this effect on component mount
  }, []);

  //2. Mapping the sighting to sighting and index them via mapping; It creates custom links in a loop > each custom link (i.e. reprsented by Sighting Preview) is linked to a route that shows the full sighting
  const sightingPreviews = sightings.map((sighting, index) => (
    <Link to={`/sightings/${index}`} key={index}>
      <SightingPreview data={sighting} />
    </Link>
  ));

  const handleButtonClick = (text) => {
    history(`/sightings/${text - 1}`);
  };

  // Usage
  const arrayOfObjectsWithIds = addIdsToObjectArray(sightings);

  // Establish column
  const columns = [
    { field: "id", headerName: "id", width: 50 },
    {
      field: "YEAR",
      headerName: "Year",
      width: 100,
      type: "number",
    },
    {
      field: "SEASON",
      headerName: "Season",
      width: 150,
    },
    {
      field: "MONTH",
      headerName: "Month",
      width: 110,
    },
    {
      field: "COUNTY",
      headerName: "Full name",
      description:
        "A county is a geographic region of a country used for administrative or other purposes in some modern nations.",
      sortable: false,
      width: 160,
    },
    {
      field: "OBSERVED",
      headerName: "Observations",
      sortable: false,
      width: 300,
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <Button
          onClick={() => handleButtonClick(params.row.id)}
          // style={{ backgroundColor: "blue", color: "white" }}
        >
          Preview
        </Button>
      ),
    },
  ];

  // Function to add an "id" property to each object in the array
  function addIdsToObjectArray(array) {
    let idCounter = 1;
    return array.map((obj) => ({
      ...obj,
      id: idCounter++,
    }));
  }

  return (
    <div className="grid">
      <h1>Big Foot Sightings 👀</h1>
      <div className="content">
        <Box sx={{ height: "60vh", width: "100%" }}>
          <DataGrid
            rows={arrayOfObjectsWithIds}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 30,
                },
              },
            }}
            pageSizeOptions={[30]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
        <h2>Filter Picker</h2>
        <div className="filter-helper">
          <ComboBox optionsLabel={sightings} />
        </div>
      </div>
    </div>
  );
};

export default SightingPreviewList;
