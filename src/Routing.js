import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import TempPage from "./Temp";
import YearFiltered from "./YearFiltered";
import YearSearch, { YEARLIST } from "./YearSearch";
import IndexRender from "./IndexRender";
import NewSighting from "./new_sighting/NewSighting";
import CommentRender from "./comments/CommentsRender";
import NewComment from "./comments/NewComment";
import AddCategory from "./category/NewCategory";

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
        >
          <Route path="comments" element={<CommentRender index={index}/>} />
            <Route path="comments/add" element={<NewComment index={index}/>} />
            
        </Route>
      ))}
      {/* Year Search Route */}
      <Route path="/year/*" element={<YearSearch />} >
        
        </Route>{" "}
      {/* Updated path with "*" */}
      {YEARLIST.map((year) => (
        <Route
          key={year}
          path={`/year/${year}`}
          element={<YearFiltered year={year} />}
        />
      ))}
      <Route path="/new" element={<NewSighting />} />
      <Route path="/addCategory" element={<AddCategory />} />
      {/* Temp Page Route */}
      <Route path="/*" element={<TempPage />} />
    </Routes>
  );
}
