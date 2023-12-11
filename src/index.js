import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SightingList from "./Component/SightingList";
import SightingSearch from "./Component/SigthingSearch";
import SightingIndex from "./Component/SightingIndex";
import SightingFilter from "./Component/SightingFilter";
import SightingSort from "./Component/SightingSort";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/sightingList" element={<SightingList />} />
      <Route path="/sightingSearch" element={<SightingSearch />}>
        <Route path=":sightingIndex" element={<SightingIndex />} />
        <Route path=":filter/:filterData" element={<SightingFilter />} />
        <Route
          path=":filter/:filterData/sort/:sort/:direction"
          element={<SightingSort />}
        />
        <Route path="*" element={<div>No Data</div>} />
      </Route>
      <Route path="/*" element={<div className="App-header">404</div>} />
    </Routes>
  </BrowserRouter>
);
