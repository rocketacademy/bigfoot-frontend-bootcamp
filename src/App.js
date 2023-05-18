import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "./constants";
import axios from "axios";
import "./App.css";

const App = () => {
  const [sightings, setSightings] = useState(null);
  useEffect(() => {
    const getSightingsDataAPI = async () => {
      const sightingsData = await axios.get(`${BACKEND_URL}/sightings`);
      setSightings(sightingsArray(sightingsData.data));
    };
    getSightingsDataAPI();
  }, []);
  const sightingsArray = (data) => {
    const res = data.map((sighting) => {
      return <div>{sighting.REPORT_NUMBER}</div>;
    });
    return res;
  };
  return (
    <div className="App">
      <div className="App-header">
        <p>Hello!</p>
        {sightings}
      </div>
    </div>
  );
};

export default App;
