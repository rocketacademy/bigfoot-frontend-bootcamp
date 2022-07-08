import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import Landing from "./Landing";
import Sightings from "./Sightings";
import NewSighting from "./NewSighting";
import Sighting from "./Sighting";
import { useNavigate } from "react-router-dom";
import EditSighting from "./EditSighting";

export default function App() {
  const navigate = useNavigate();

  return (
    <div>
      <Link to="/">Home </Link>
      <Link to="/sightings">Sightings </Link>
      <Link to="/new">New Sighting</Link>
      <button onClick={() => navigate(-1)}> Back</button>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/new" element={<NewSighting />} />

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
