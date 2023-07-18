import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";

const sightingIndexes = Array.from(Array(100).keys()); // Array of values from 0 to 99

export default function Routing() {
  return (
    <Routes>
      <Route path="/">
        {sightingIndexes.map((index) => (
          <Route
            key={index}
            path={`${index}`}
            element={<App index={index} />}
          />
        ))}
      </Route>
    </Routes>
  );
}
