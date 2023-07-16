import React from "react";
import { useNavigate, Link } from "react-router-dom";

import Button from "@mui/material/Button";

const SightingList = (props) => {
  const navigate = useNavigate();

  const sightingList =
    // render list of sighting
    props.sightings.map((sighting, ind) => {
      return (
        <li key={ind}>
          <Link
            to={`/sightings/${ind}`}
          >{`${sighting.YEAR}, ${sighting.STATE}`}</Link>
        </li>
      );
    });

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
      <ul className="sighting-list">{sightingList}</ul>
    </div>
  );
};

export default SightingList;
