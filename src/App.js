import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import Landing from "./Landing";
import Sightings from "./Sightings";
import { useState, useEffect } from "react";
import axios from "axios";
import Sighting from "./Sighting";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [sightings, setSightings] = useState([]);

  // fix the call axios request so that the state is visible on the react app

  async function callData() {
    let sightingsData = await axios.get("http://localhost:3000/sightings");
    console.log(sightingsData.data);
    setSightings({
      sightings: sightingsData.data,
    });

    console.log("okay");
  }
  useEffect(() => {
    callData();
    console.log("Yes");
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <Link to="/">Home </Link>
      <Link to="/sightings">Sightings </Link>
      <button onClick={() => navigate(-1)}> Back</button>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="sightings" element={<Sightings sightings={sightings} />}>
          <Route path=":sightingIndex" element={<Sighting />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}
