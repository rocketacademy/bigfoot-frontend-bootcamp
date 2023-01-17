import React from "react";
import { Link } from "react-router-dom";
import AllSightings from "./AllSightings";

const Home = () => {
  return (
    <div>
      <Link to="/new">Record New Sighting</Link>
      <br />
      <AllSightings />
    </div>
  );
};

export default Home;
