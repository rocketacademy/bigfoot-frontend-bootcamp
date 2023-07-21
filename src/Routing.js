import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import TempPage from "./Temp";
import YearFiltered from "./YearFiltered";
import YearSearch, { YEARLIST } from "./YearSearch";
import IndexRender from "./IndexRender";

const sightingIndexes = Array.from(Array(100).keys()); // Array of values from 0 to 99

export default function Routing() {
  return (
    <Routes>
      <Route path="/" key="home" element={<App />} />
      {/* Sighting Indexes Routes */}
      {sightingIndexes.map((index) => (
        <Route
          key={index}
          path={`/${index}`}
          element={<IndexRender index={index} />}
        />
      ))}
      {/* Year Search Route */}
      <Route path="/year/*" element={<YearSearch />} />{" "}
      {/* Updated path with "*" */}
      {YEARLIST.map((year) => (
        <Route
          key={year}
          path={`/year/${year}`}
          element={<YearFiltered year={year} />}
        />
      ))}
      {/* Temp Page Route */}
      <Route path="/*" element={<TempPage />} />
    </Routes>
  );
}
