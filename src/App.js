import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import Landing from "./Components/Landing";
import Sightings from "./Components/Sightings";
import NewSighting from "./Components/NewSighting";
import Sighting from "./Components/Sighting";
import { useNavigate } from "react-router-dom";
import EditSighting from "./Components/EditSighting";
import NewCat from "./Components/NewCat.js";

export default function App() {
  const navigate = useNavigate();

  return (
    <div>
      <Link to="/">Home </Link>
      <Link to="/sightings">Sightings </Link>
      <Link to="/new">New Sighting</Link>
      <Link to="/newCat">New Cat</Link>

      <button onClick={() => navigate(-1)}> Back</button>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/new" element={<NewSighting />} />
        <Route path="/newCat" element={<NewCat />} />

        <Route path="/sightings" element={<Sightings />} />
        <Route path="/sightings/:sightingIndex" element={<Sighting />} />
        <Route path="/sightings/:id/edit" element={<EditSighting />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

// With the search func the single sighting is a little buggy
