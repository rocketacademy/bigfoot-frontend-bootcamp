import React from "react";
import logo from "./logo.png";
import "./App.css";
import Display from "./components/Display";
import Entry from "./components/Entry";
import Edit from "./components/Edit";
import SightingPreviewList from "./components/SightingPreviewList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";

class App extends React.Component {
  render() {
    return (
      <div className="full-height">
        <BrowserRouter>
          <Routes>
            {/* Route that provides base app UI */}
            {/* Route that renders all sightings */}
            <Route path="/" element={<SightingPreviewList />} />
            {/* Route that renders individual sightings */}
            <Route path="sightings/:sightingIndex" element={<Display />} />
            {/* Form Entry */}
            <Route path="/new" element={<Entry />} />
            {/* Route that matches all other paths */}
            <Route path="sightings/:sightingIndex/edit" element={<Edit />} />
            {/* Form Entry */}
            <Route path="*" element={"Nothing here! Go back home."} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
