import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "./constants";
import axios from "axios";
import "./App.css";

const NewSighting = () => {
  const [singleSighting, setSingleSighting] = useState(null);
  useEffect(() => {}, []);
  return (
    <div className="App">
      <div className="App-header">
        <div>
          <h1>New Sighting</h1>
          <p>Date: </p>
          <p>Location: </p>
          <div>Notes: </div>
        </div>
      </div>
    </div>
  );
};

export default NewSighting;
