import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";

import { BACKEND_URL } from "./Constant";

const SightingList = () => {
  const [sightings, setSightings] = useState([]);

  const getSightings = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/sightings`);
      setSightings(response.data);
      //console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSightings();
    // Only run this effect on component mount
  }, []);

  const renderCategories = (categories) => {
    if (categories.length > 0) {
      return <Card.Text>Categories: {categories.join(", ")}</Card.Text>;
    }
    return null;
  };

  const listOfSightings = sightings.map((sighting) => (
    <Link key={sighting.id} to={`sightings/${sighting.id}`}>
      <Card bg="dark">
        <Card.Body>
          <Card.Title>{`${new Date(sighting.date).toDateString()} | ${
            sighting.location
          }`}</Card.Title>
          {renderCategories(
            sighting.Categories.map((category) => category.name)
          )}
        </Card.Body>
      </Card>
    </Link>
  ));

  return (
    <div>
      <h1>Home</h1>
      <Link to="/new">Add Sighting</Link>
      <br />
      {listOfSightings}
    </div>
  );
};

export default SightingList;
