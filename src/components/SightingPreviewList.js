import axios from "axios";
import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import BACKEND_URL from "./constant";

import ComboBox from "./Form";
// import SightingPreview from "../components/SightingPreview";
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
  // const sightingPreviews = sightings.map((sighting, index) => (
  //   <Link to={`/sightings/${index}`} key={index}>
  //     <SightingPreview data={sighting} />
  //   </Link>
  // ));

  const handleButtonClick = (text) => {
    history(`/sightings/${text}`);
  };

  // Usage
  // const arrayOfObjectsWithId s = addIdsToObjectArray(sightings);

  // Establish column
  const columns = [
    { field: "id", headerName: "id", width: 50 },
    {
      field: "date",
      headerName: "Date",
      type: 'dateTime',
      width: 150,
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "location",
      headerName: "Location",
      width: 150,
    },
    {
      field: "notes",
      headerName: "Observations",
      sortable: false,
      width: 300,
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      sortable: false,
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value),
      width: 150,
    },
    {
      field: "updatedAt",
      headerName: "Updated Date",
      sortable: false,
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value),
      width: 150,
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
            rows={sightings}
            columns={columns}
            initialState={{
              sorting: {
                sortModel: [{ field: 'id', sort: 'asc' }],
              },
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
