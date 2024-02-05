import React from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { SightingResults } from "./Components/SightingResults";
import { IndividualSighting } from "./Components/IndividualSighting";

const SightingResultsWithParams = () => {
  let { sightingIndex } = useParams();
  console.log(sightingIndex);
  return <IndividualSighting sightingIndex={sightingIndex} />;
};

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SightingResults />} />
          <Route
            path="/sighting/:sightingIndex"
            element={<SightingResultsWithParams />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
