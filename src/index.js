import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SightingList from "./Component/SightingList";
import SightingSearch from "./Component/SigthingSearch";
import SightingIdPage from "./Component/SightingIdPage";
import SightingCreate from "./Component/SightingCreate";
import SightingEdit from "./Component/SightingEdit";
// import SightingFilter from "./Component/SightingFilter";
// import SightingSort from "./Component/SightingSort";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/sightingList" element={<SightingList />} />
      <Route path="/sightingSearch" element={<SightingSearch />}>
        <Route path=":sightingId" element={<SightingIdPage />} />
        <Route path=":sightingId/edit" element={<SightingEdit />} />
        {/* <Route path=":filter/:filterData" element={<SightingFilter />} />
        <Route
          path=":filter/:filterData/sort/:sort/:direction"
          element={<SightingSort />}
        /> */}
        {/* <Route path="*" element={<div>No Data</div>} /> */}
      </Route>
      <Route path="/new" element={<SightingCreate />} />
      <Route path="/*" element={<div className="App-header">404</div>} />
      <Route path="/sightingSearch/Testing" element={<div>test</div>} />
    </Routes>
  </BrowserRouter>
);
