import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import TempPage from "./Temp";
import YearFiltered from "./YearFiltered";
import YearSearch from "./YearSearch";
import IndexRender from "./IndexRender";

const sightingIndexes = Array.from(Array(100).keys()); // Array of values from 0 to 99
const yearList = [2000, 2016,2018];

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        {sightingIndexes.map((index) => (
          <Route
            key={index}
            path={`${index}`}
            element={<IndexRender index={index} />}
          />
        ))}
      </Route>
      <Route path="/year" element={<YearSearch />} >
        {yearList.map((year) => (
          <Route
            key={year}
            path={`${year}`}
            element={<YearFiltered year={year} />}
          />
        ))}
        
      </Route>
      <Route path="/*" element={<TempPage />} />
    </Routes>
  );
}
