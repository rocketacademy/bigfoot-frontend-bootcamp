import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import AllSightings from "./components/AllSightings";
import SightingDetails from "./components/SightingDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <Routes>
              <Route path="/" element={<AllSightings />}>
                <Route
                  path="/sightings/:reportNumber"
                  element={<SightingDetails />}
                />
              </Route>{" "}
              /
            </Routes>
          </header>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
