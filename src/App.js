import React from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { SightingResults } from "./Components/SightingResults";
import { IndividualSighting } from "./Components/IndividualSighting";
import { NewSighting } from "./Components/NewSighting";
import { NewComment } from "./Components/NewComment";

const SightingResultsWithParams = () => {
  let { sightingId } = useParams();
  console.log(sightingId);
  return <IndividualSighting sightingId={sightingId} />;
};

const CommentsWithParams = () => {
  let { sightingId } = useParams();
  return <NewComment sightingId={sightingId} />;
};

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SightingResults />} />
          <Route path="/new" element={<NewSighting />} />
          <Route
            path="/sighting/:sightingId"
            element={<SightingResultsWithParams />}
          />
          <Route
            path="/sighting/:sightingId/comments/new"
            element={<CommentsWithParams />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
