import React from "react";
import logo from "./logo.png";
import "./App.css";
import Display from "./components/Display";
import SightingPreviewList from "./components/SightingPreviewList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          {/* Route that provides base app UI */}
          {/* Route that renders all sightings */}
          <Route path="/" element={<SightingPreviewList />} />
          {/* Route that renders individual sightings */}
          <Route path="sightings/:sightingIndex" element={<Display />} />
          {/* Route that matches all other paths */}
          <Route path="*" element={"Nothing here! Go back home."} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
