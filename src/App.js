import React, { useEffect, useState } from "react";

import "./App.css";
import axios from "axios";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import SightingsProvider from "./contexts/SightingsProvider";
import CurrentPageProvider from "./contexts/CurrentPageProvider";
import NewSighting from "./pages/NewSighting";

const App = () => {
  return (
    <div className="App">
      <SightingsProvider>
        <CurrentPageProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/">
                <Route index element={<Home />} />
                <Route path="new" element={<NewSighting />} />
                <Route path="sightings">
                  <Route index path=":sightingId" element={<Post />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </CurrentPageProvider>
      </SightingsProvider>
    </div>
  );
};

export default App;
