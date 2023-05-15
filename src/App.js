import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Sighting from "./pages/Sighting";
import { BACKEND_URL } from "./constants";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const getData = await axios.get(BACKEND_URL + "sightings");
      setData(getData.data);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home data={data} />} />
        <Route path="/sightings/:id" element={<Sighting data={data} />} />
      </Routes>
    </div>
  );
};

export default App;
